import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useDidUpdate = (effect: EffectCallback, deps?: DependencyList): void => {
  const init = useRef(false);
  useEffect(() => {
    if (!init.current) {
      init.current = true;
    } else {
      return effect();
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};
