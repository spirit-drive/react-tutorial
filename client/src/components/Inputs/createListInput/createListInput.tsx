import React, {
  useState,
  useLayoutEffect,
  useMemo,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useImperativeHandle,
} from 'react';
import cn from 'clsx';
import { useDidUpdate } from 'src/hooks/useDidUpdate';
import { getRandomId } from '../../../utils/random';
import { ItemInputProps, ListInputProps, State, ListInputRef } from './type';
import s from './createListInput.sass';

export const createListInput = <T, P = unknown>(
  ItemInput: React.ComponentType<ItemInputProps<T, P>>,
  addedEmptyValue: T = null
): ForwardRefExoticComponent<PropsWithoutRef<ListInputProps<T, P>> & RefAttributes<ListInputRef>> =>
  forwardRef<ListInputRef, ListInputProps<T, P>>(({ value, onChange, className, ...props }, ref) => {
    const [state, setState] = useState<State<T>>([]);

    useLayoutEffect(() => {
      setState((v) => {
        if (v?.map((i) => JSON.stringify(i.value)).join('_') === value?.map((i) => JSON.stringify(i)).join('_')) {
          return v;
        }
        return value?.map((i) => {
          const found = v?.find((j) => j.value === i);
          if (!found) return { id: getRandomId(), value: i };
          return found;
        });
      });
    }, [value]);

    useDidUpdate(() => {
      onChange(state?.map((i) => i.value));
    }, [state, onChange]);

    const { add, createRemove, createOnChange } = useMemo(() => {
      const cache: Record<string, { remove: () => void; onChange: (value: T) => void }> = {};
      return {
        add: () => setState((v) => [...(v || []), { id: getRandomId(), value: addedEmptyValue }]),
        createRemove: (id: string) => {
          if (cache[id]?.remove) return cache[id].remove;

          Object.assign(cache, {
            [id]: {
              ...(cache[id] || {}),
              remove: () => setState((v) => v.filter((i) => i.id !== id)),
            },
          });

          return cache[id].remove;
        },
        createOnChange: (id: string) => {
          if (cache[id]?.onChange) return cache[id].onChange;

          Object.assign(cache, {
            [id]: {
              ...(cache[id] || {}),
              onChange: (_value: T) => setState((v) => v.map((i) => (i.id === id ? { ...i, value: _value } : i))),
            },
          });

          return cache[id].onChange;
        },
      };
    }, []);

    useImperativeHandle(ref, () => ({ add }));

    return (
      <div className={cn(s.root, className)}>
        {state?.map((item, i) => (
          <ItemInput
            index={i}
            key={item.id}
            value={item.value}
            onChange={createOnChange(item.id)}
            onRemove={createRemove(item.id)}
            {...(props as P)}
          />
        ))}
      </div>
    );
  });
