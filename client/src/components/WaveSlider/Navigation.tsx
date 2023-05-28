import React, { FC, useRef, useEffect } from 'react';
import cn from 'clsx';
import { Indicator } from './Indicator';
import s from './Navigation.sass';

export type NavigationProps = {
  quantity: number;
  slide: number;
  toSlide: (slide: number) => void;
  isPause: boolean;
  interval: number;
  className?: string;
};

export const Navigation: FC<NavigationProps> = ({ quantity, toSlide, slide, interval, className, isPause }) => {
  const nav = useRef<HTMLDivElement>();
  const root = useRef<HTMLDivElement>();
  const point = useRef<HTMLDivElement>();
  const canvas = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const activeBtn = nav.current.querySelector(`button[data-key="${slide}"]`);
    if (activeBtn) {
      const rootRect = root.current.getBoundingClientRect();
      const activeBtnRect = activeBtn.getBoundingClientRect();
      const x = activeBtnRect.x - rootRect.x;
      const y = activeBtnRect.y - rootRect.y;
      canvas.current.style.transform = point.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [slide]);

  return (
    <div ref={root} className={cn(s.root, className)}>
      <Indicator key={slide} ref={canvas} isPause={isPause} interval={interval} />
      <div ref={point} className={s.point} />
      <div ref={nav} className={s.nav}>
        {Array(quantity)
          .fill('')
          .map((_, i) => (
            <button
              data-key={i}
              key={i}
              className={cn(s.item, i === slide && s.active)}
              type="button"
              onClick={() => toSlide(i)}
            >
              <span className={s.mark} />
            </button>
          ))}
      </div>
    </div>
  );
};
