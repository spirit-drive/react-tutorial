import React, { memo, NamedExoticComponent, useCallback } from 'react';
import cn from 'clsx';
import { useFeedDependsState, useDefaultGetOnChange, useDefaultManagerBuilding } from '../hooks';
import { ComponentProps, Props } from '../types';
import { complianceSets } from './helpers';
import s from './inputsListOnlyList.sass';

export type ArrayItemProps<T, Extra> = ComponentProps<T, Extra> & {
  index: number;
};

export const inputsListOnlyArray = <T, Extra = Record<string, unknown>>(
  Component: React.ComponentType<ArrayItemProps<T, Extra>>
): NamedExoticComponent<Props<T, Extra>> =>
  memo(({ className, onChange, value, canRemoveAll, manager, ...props }) => {
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
            index={index}
            canRemoveAll={canRemoveAll}
            single={arr.length === 1}
            onChange={getOnChange(i.id)}
          />
        ))}
      </div>
    );
  });
