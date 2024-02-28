import { random } from 'src/utils/random';
import { Enhanced } from './types';

export const getEmpty = <T>(): Enhanced<T> => ({ id: random.uuid4(), data: null });
export const complianceSets = <T>(v: T[], canRemoveAll: boolean): Enhanced<T>[] => {
  if (canRemoveAll) {
    return (v || []).map((i) => ({ id: random.uuid4(), data: i }));
  }

  if (!v?.length) return [getEmpty<T>()];
  return v.map((i) => ({ id: random.uuid4(), data: i }));
};
