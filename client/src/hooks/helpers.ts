/* global Node */

import { getLimitSize } from 'src/hooks/useResize/helpers';

export const deepCheckOnHavingChild = (node: Node, target: EventTarget): boolean => {
  if (node === target) {
    return true;
  }
  if (node && Node && node instanceof Node && node.hasChildNodes()) {
    return Array.from(node.childNodes).some((child) => deepCheckOnHavingChild(child, target));
  }
  return false;
};

export const deepCheckNodesOnHavingChild = (nodes: Node[], target: EventTarget): boolean => {
  for (let i = 0; i < nodes.length; i++) {
    if (deepCheckOnHavingChild(nodes[i], target)) {
      return true;
    }
  }
  return false;
};

const transformRegexp =
  /(matrix\(-?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, )(-?\d+(\.\d+)?), (-?\d+(\.\d+)?)\)/;

export type Coordinate = { x: number; y: number };
export const getTransform = (value: string): Coordinate => {
  const data = value.match(transformRegexp);
  if (!data) return { x: 0, y: 0 };
  return {
    x: parseInt(data[6], 10),
    y: parseInt(data[8], 10),
  };
};

export const getTransformElementStyle = (element: HTMLElement): string => getComputedStyle(element)?.transform;

export const getTransformElement = (element: HTMLElement): { transform: Coordinate; transition: string } => {
  const { transform, transition } = getComputedStyle(element);
  return {
    transform: getTransform(transform),
    transition,
  };
};

export const getPercent = (value: number, percent: number): number => {
  if (!value) return 0;
  return Math.round((value / 100) * percent);
};

export const setTransform = (transform: string, x: number, y: number): string =>
  transform.replace(transformRegexp, (_, base) => `${base + x}, ${y})`);

export const setDirectlyCurrentSize = (element: HTMLElement): void => {
  const { width, height } = element.getBoundingClientRect();
  if (!Number.isNaN(width) && !Number.isNaN(height)) {
    // eslint-disable-next-line no-param-reassign
    element.style.width = `${getLimitSize(width, {
      min: 48,
      max: getPercent(window?.innerWidth, 90),
    })}px`;
    // eslint-disable-next-line no-param-reassign
    element.style.height = `${getLimitSize(height, {
      min: 48,
      max: getPercent(window?.innerHeight, 90),
    })}px`;
  }
};
