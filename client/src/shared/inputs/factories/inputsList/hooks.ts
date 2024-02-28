import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Manager } from './types';
import { getEmpty } from './inputsListOnlyList/helpers';
import { Enhanced } from './inputsListOnlyList/types';

export const useOnChangeByItemId = <T>(
  data: Enhanced<T>[],
  onChange: (id: string) => (v: T) => void
): ((id: string) => (v: T) => void) => {
  // можно передать функцию и она будет сохранена, оптимизация под капотом
  const createOnChange = useCallback(onChange, []); // eslint-disable-line react-hooks/exhaustive-deps

  const map = useRef<Record<string, (v: T) => void>>({});
  useEffect(() => {
    const copy = { ...map.current };
    map.current = {};
    data.forEach((item) => {
      map.current[item.id] = copy[item.id] || createOnChange(item.id);
    });
  }, [createOnChange, data]);

  return (id: string): ((v: T) => void) => {
    if (!map.current[id]) map.current[id] = createOnChange(id); // Вынужденный хак
    return map.current[id];
  };
};

export const useDefaultGetOnChange = <T>(
  data: Enhanced<T>[],
  setData: Dispatch<SetStateAction<Enhanced<T>[]>>
): ((id: string) => (v: T) => void) =>
  useOnChangeByItemId<T>(data, (id) => (v): void => {
    setData((prev) => {
      const index = prev.findIndex((i) => i.id === id);
      if (index === -1) return prev;
      const newSets = [...prev];
      newSets[index].data = v;
      return newSets;
    });
  });

export const useFeedDependsState = <T>({
  value,
  onChange,
  prepareValue,
}: {
  value: T[];
  onChange: (value: T[]) => void;
  prepareValue: (value: T[]) => Enhanced<T>[];
}): {
  data: Enhanced<T>[];
  setData: Dispatch<SetStateAction<Enhanced<T>[]>>;
} => {
  const [data, setData] = useState<Enhanced<T>[]>(prepareValue(value));

  const wasChanged = useRef(true);
  useEffect(() => {
    if (wasChanged.current) {
      wasChanged.current = false;
    } else {
      setData(prepareValue(value));
    }
  }, [prepareValue, value]);

  const change = useRef(onChange);
  change.current = onChange;

  useEffect(() => {
    wasChanged.current = true;
    change.current(data.map((i) => i.data));
  }, [data]);

  return { data, setData };
};

export const useDefaultManagerBuilding = <T>({
  manager,
  setData,
  canRemoveAll,
}: {
  manager: MutableRefObject<Manager>;
  canRemoveAll: boolean;
  setData: Dispatch<SetStateAction<Enhanced<T>[]>>;
}): void => {
  useImperativeHandle<Manager, Manager>(
    manager,
    () => ({
      add: (): void => setData((v) => [...v, getEmpty()]),
      remove: (id: string): void => {
        if (canRemoveAll) {
          return setData((v) => v.filter((i) => i.id !== id));
        }
        return setData((v) => {
          const newValue = v.filter((i) => i.id !== id);
          if (newValue.length) return newValue;
          /* Не допускаем полного удаления */
          return [getEmpty()];
        });
      },
    }),
    [setData, canRemoveAll]
  );
};
