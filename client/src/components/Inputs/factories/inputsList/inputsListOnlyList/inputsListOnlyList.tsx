import React, { memo, NamedExoticComponent, useCallback } from 'react';
import cn from 'clsx';
import { useFeedDependsState, useDefaultGetOnChange, useDefaultManagerBuilding } from '../hooks';
import { ComponentProps, Props } from '../types';
import { complianceSets } from './helpers';
import s from './inputsListOnlyList.sass';

/* В данном компоненте присутствуют оптимизации и при добавлении нового элемента списка не будут пересозданы все остальные элементы списка
 * однако нет никакой возможности использовать пропсы основанные на индексе элемента, для таких компонентов есть другая фабрика */
export const inputsListOnlyList = <T, Extra = Record<string, unknown>>(
  Component: React.ComponentType<ComponentProps<T, Extra>>
): NamedExoticComponent<Props<T, Extra>> =>
  memo(({ className, onChange, value, manager, canRemoveAll, ...props }) => {
    const prepareValue = useCallback((v: T[]) => complianceSets(v, canRemoveAll), [canRemoveAll]);
    const { data, setData } = useFeedDependsState({
      value,
      onChange,
      prepareValue,
    });

    const getOnChange = useDefaultGetOnChange<T>(data, setData);

    useDefaultManagerBuilding({ manager, setData, canRemoveAll });

    return (
      <div className={cn(s.root, className)}>
        {data.map((i, index, arr) => (
          <Component
            {...(props as ComponentProps<T, Extra>)}
            key={i.id}
            value={i.data}
            id={i.id}
            canRemoveAll={canRemoveAll}
            single={arr.length === 1}
            onChange={getOnChange(i.id)}
          />
        ))}
      </div>
    );
  });
