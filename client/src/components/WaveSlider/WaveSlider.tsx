import React, { useMemo, useState, useReducer, useEffect, useRef, FC } from 'react';
import cn from 'classnames';
import { Navigation } from './Navigation';
import s from './WaveSlider.sass';

export type SliderProps = {
  children: React.ReactElement[];
  className?: string;
  classNameNav?: string;
  interval?: number;
  transitionDuration?: number;
  transitionTimingFunction?: string;
};

export const WaveSlider: FC<SliderProps> = ({
  className,
  classNameNav,
  transitionDuration = 800,
  transitionTimingFunction = 'ease',
  children,
  interval = 3000,
}) => {
  const [isPause, setPause] = useState(false);
  const quantity = React.Children.count(children);

  const reducer = (state: number, action) => {
    console.log(action);
    switch (action.type) {
      case 'next':
        if (state + 1 === quantity) return 0;
        return state + 1;

      case 'back':
        if (state === 0) return quantity - 1;
        return state - 1;

      case 'to':
        return action.payload;

      default:
        throw new Error(`invalid type: ${action.type}`);
    }
  };

  const [slide, setSlide] = useReducer(reducer, 0);

  const zIndex = useRef(0);
  const intervalId = useRef(-1);
  const prevSlide = useRef(-1);
  const slides = useRef(children.map(() => React.createRef()));
  const slider = useRef(null);

  const { play, clear, stop, start } = useMemo(
    () => ({
      start: () => {
        intervalId.current = window.setInterval(() => setSlide({ type: 'next' }), interval);
      },
      clear: () => clearInterval(intervalId.current),
      play: () => setPause(false),
      stop: () => setPause(true),
    }),
    [interval]
  );

  const toSlide = (payload: number) => {
    clear();
    setSlide({ type: 'to', payload });
    if (!isPause) start();
  };

  useEffect(() => {
    if (isPause) {
      clear();
    } else {
      start();
    }
  }, [clear, isPause, start]);

  useEffect(() => {
    const {
      style,
      children: [child],
    } = slides.current[slide].current;

    style.transition = 'none';
    style.width = '0%';
    if (prevSlide.current > slide) {
      style.left = 'auto';
      child.style.float = 'right';
    } else {
      style.left = 0;
      child.style.float = 'none';
    }
    prevSlide.current = slide;
    style.zIndex = ++zIndex.current;
    setTimeout(() => {
      style.transition = `width ${transitionDuration}ms ${transitionTimingFunction}`;
      style.width = '100%';
    });
  }, [slide, transitionDuration, transitionTimingFunction]);

  useEffect(() => {
    play();
    window.addEventListener('focus', play);
    window.addEventListener('blur', stop);

    return () => {
      clear();
      window.removeEventListener('focus', play);
      window.removeEventListener('blur', stop);
    };
  }, [play, clear, stop]);

  useEffect(() => {
    const setWidthForSlides = () => {
      const { width } = getComputedStyle(slider.current);
      slides.current.forEach((item) => (item.current.children[0].style.width = width)); // eslint-disable-line no-param-reassign, no-return-assign
    };

    setWidthForSlides();
    window.addEventListener('resize', setWidthForSlides);

    return () => {
      window.removeEventListener('resize', setWidthForSlides);
    };
  }, []);

  return (
    <div className={cn(s.root, className)} ref={slider} onMouseOver={stop} onMouseOut={play}>
      <div className={s.wrapper}>
        {children.map((item, i) => (
          <div ref={slides.current[i]} key={i} className={s.slide}>
            {item}
          </div>
        ))}
      </div>
      <Navigation
        slide={slide}
        quantity={quantity}
        toSlide={toSlide}
        interval={interval}
        isPause={isPause}
        className={classNameNav}
      />
    </div>
  );
};
