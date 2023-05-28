import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import s from './Indicator.sass';

const drawArc = (context: CanvasRenderingContext2D, size: number, radius: number, start: number, end: number) => {
  context.clearRect(0, 0, size, size);
  context.beginPath();
  context.arc(radius, radius, radius - 2, start, end);
  context.stroke();
  context.closePath();
};

const canvasInterval = 30;
const rotationStep = Math.PI / 50;
const colorIndicator = '#fff';

export type IndicatorProps = {
  interval: number;
  isPause: boolean;
};

const size = window.devicePixelRatio * 32;

export const Indicator = forwardRef<HTMLCanvasElement, IndicatorProps>(({ interval, isPause }, ref) => {
  const arcStep = ((2 * Math.PI) / (interval - canvasInterval * 3)) * canvasInterval;

  const intervalId = useRef<number>();
  const count = useRef(0);
  const ctx = useRef<CanvasRenderingContext2D>(null);
  const canvas = useRef<HTMLCanvasElement>();

  useImperativeHandle(ref, () => canvas.current, []);

  useEffect(() => {
    ctx.current = canvas.current.getContext('2d');
    ctx.current.strokeStyle = colorIndicator;
    ctx.current.lineWidth = 4;
  }, []);

  useEffect(() => {
    if (!isPause) {
      const start = Math.random() * Math.PI * 2;
      intervalId.current = window.setInterval(() => {
        const angleStart = rotationStep * count.current + start;
        const angleEnd = arcStep * count.current;
        drawArc(ctx.current, size, size / 2, angleStart, angleEnd + angleStart);
        ++count.current;
        if (angleEnd > 2 * Math.PI) {
          clearInterval(intervalId.current);
        }
      }, canvasInterval);
    }
    return () => {
      count.current = 0;
      clearInterval(intervalId.current);
      ctx.current.clearRect(0, 0, size, size);
    };
  }, [isPause, arcStep]);

  return <canvas ref={canvas} className={s.root} width={size} height={size} />;
});
