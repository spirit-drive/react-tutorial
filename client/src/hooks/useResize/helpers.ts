import { Limits } from './types';

export const getLimitSize = (value: number, { min, max }: Limits): number => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};
