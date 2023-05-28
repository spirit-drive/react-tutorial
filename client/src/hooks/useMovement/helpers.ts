import { Coordinate, getTransformElement } from 'src/hooks/helpers';
import { Outside, OutsideX, OutsideY } from './types';

export const INITIAL_TRANSFORM = { x: 0, y: 0 };

export const getCoordinateWithLimits = (value: number, edge1: number, edge2: number): number => {
  if (edge1 > edge2) throw new Error(`edge2 must be more edge1. edge2: ${edge2}; edge1: ${edge1}`);
  if (value < edge1) return edge1;
  if (value > edge2) return edge2;
  return value;
};

export const getOutsideOfElement = (element: HTMLElement): Outside => {
  const rect = element.getBoundingClientRect();
  const outside: Outside = { x: null, y: null };
  if (rect.x < 0) outside.x = OutsideX.LEFT;
  if (rect.y < 0) outside.y = OutsideY.TOP;
  if (rect.x + rect.width > window.innerWidth) outside.x = OutsideX.RIGHT;
  if (rect.y + rect.height > window.innerHeight) outside.y = OutsideY.BOTTOM;
  return outside;
};

export const getShiftX = (element: HTMLElement, coordinates: Coordinate, outside: Outside): number => {
  const rect = element.getBoundingClientRect();
  if (outside.x === OutsideX.LEFT) return coordinates.x - rect.x;
  if (outside.x === OutsideX.RIGHT) {
    const rightEdge = rect.x + rect.width;
    const outsideRight = rightEdge - window.innerWidth;
    return coordinates.x - outsideRight;
  }
  return coordinates.x;
};

export const getShiftY = (element: HTMLElement, coordinates: Coordinate, outside: Outside): number => {
  const rect = element.getBoundingClientRect();
  if (outside.y === OutsideY.TOP) return coordinates.y - rect.y;
  if (outside.y === OutsideY.BOTTOM) {
    const bottomEdge = rect.y + rect.height;
    const outsideBottom = bottomEdge - window.innerHeight;
    return coordinates.y - outsideBottom;
  }
  return coordinates.y;
};

export const getCoordinatesForOutside = (element: HTMLElement): Coordinate => {
  const { transform } = getTransformElement(element);
  const outside = getOutsideOfElement(element);
  if (outside.x === null && outside.y === null) return transform;
  return {
    x: getShiftX(element, transform, outside),
    y: getShiftY(element, transform, outside),
  };
};
