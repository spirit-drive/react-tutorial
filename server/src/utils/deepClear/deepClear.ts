import * as deepEqual from 'fast-deep-equal';

/* eslint-disable @typescript-eslint/ban-types */
const getClean = (
  arrayOfEmpties: unknown[],
  target: unknown,
  clear: (target: unknown | unknown[]) => unknown | unknown[]
): unknown =>
  Object.keys(target || {}).reduce((acc, key) => {
    const value = target[key as keyof typeof target];
    if (!arrayOfEmpties.includes(value)) return Object.assign(acc, { [key]: clear(value) });
    return acc;
  }, {});

export const createDeepClear = (arrayOfEmpties: unknown[]): (<T extends unknown | unknown[]>(target: T) => T) => {
  const clear = <T extends unknown | unknown[]>(target: T): T => {
    if (Array.isArray(target)) {
      if (!target.length) return null;
      return target.map(clear).filter((i) => !arrayOfEmpties.includes(i)) as T;
    }
    if (arrayOfEmpties.includes(target)) return null;
    if (typeof target !== 'object') return target;

    const clean = getClean(arrayOfEmpties, target, clear);

    if (!Object.keys(clean).length) return null;

    if (deepEqual(target, clean)) return clean as T;

    return clear(clean) as T;
  };

  return clear;
};

export const deepClear = createDeepClear([null, '', undefined]);
export const lightDeepClear = createDeepClear(['', undefined]);
