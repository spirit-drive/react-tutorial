import React, { useMemo, useState, useReducer, useEffect, useRef, FC } from 'react';
import cn from 'clsx';
import { Navigation } from './Navigation';
import s from './WaveSlider.sass';

export type SliderProps = {
  children: React.ReactElement[];
  className?: string;
  classNameNav?: string;
  interval?: number;
};

export type WaveSliderActionNext = {
  type: 'next';
};

export type WaveSliderActionBack = {
  type: 'back';
};

export type WaveSliderActionTo = {
  type: 'to';
  payload: number;
};

export type WaveSliderAction = WaveSliderActionNext | WaveSliderActionBack | WaveSliderActionTo;

export const WaveSlider: FC<SliderProps> = ({ className, classNameNav, children, interval = 3000 }) => {
  const [isPause, setPause] = useState(false);
  const quantity = React.Children.count(children);

  const reducer = (state: number, action: WaveSliderAction) => {
    const { type } = action;
    switch (type) {
      case 'next':
        if (state + 1 === quantity) return 0;
        return state + 1;

      case 'back':
        if (state === 0) return quantity - 1;
        return state - 1;

      case 'to':
        return action.payload;

      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const unhandled: never = type;
        throw new Error(`unhandled type: ${type}`);
      }
    }
  };

  const [slide, setSlide] = useReducer(reducer, 0);

  const zIndex = useRef(0);
  const intervalId = useRef(-1);
  const slides = useRef(children.map(() => React.createRef<HTMLDivElement>()));
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
    slides.current[slide].current.classList.add(s.play);
    slides.current[slide].current.style.zIndex = `${++zIndex.current}`;
  }, [slide]);

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
      slides.current.forEach((item) => {
        (item.current.children[0] as HTMLElement).style.width = width;
      });
    };

    setWidthForSlides();
    const observer = new ResizeObserver(setWidthForSlides);

    observer.observe(slider.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div role="presentation" className={cn(s.root, className)} ref={slider} onMouseOver={stop} onMouseOut={play}>
      <div className={s.wrapper}>
        {children.map((item, i) => (
          <div
            onAnimationEnd={(e) => (e.target as HTMLDivElement).classList.remove(s.play)}
            ref={slides.current[i]}
            key={i}
            className={s.slide}
          >
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
