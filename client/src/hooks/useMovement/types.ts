import { CSSProperties, MouseEventHandler, TouchEventHandler } from 'react';

export type UseMovementReturn = {
  style: CSSProperties;
  onMouseDown: MouseEventHandler<HTMLElement>;
  onTouchStart: TouchEventHandler<HTMLElement>;
  moveFromOutside: () => void;
};

export enum OutsideY {
  TOP,
  BOTTOM,
}

export enum OutsideX {
  LEFT,
  RIGHT,
}

export type Outside = {
  y: OutsideY;
  x: OutsideX;
};
