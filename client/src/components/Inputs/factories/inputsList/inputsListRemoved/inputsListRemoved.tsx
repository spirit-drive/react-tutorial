import React, {
  createRef,
  memo,
  MutableRefObject,
  NamedExoticComponent,
  useCallback,
  useImperativeHandle,
} from 'react';
import cn from 'clsx';
import { inputsListOnlyList } from 'src/components/Inputs/factories';
import { ComponentProps, ListParams, Manager, Props } from '../types';
import { RemoveButton } from '../../../../RemoveButton';
import s from './inputsListRemoved.sass';

const defaultIsNotEmptyData = (d: unknown): boolean => !!d;

export const inputsListRemoved = <T, Extra = Record<string, unknown>>(
  Component: React.ComponentType<ComponentProps<T, Extra> & { canRemoveAll?: boolean }>,
  params?: ListParams<T>
): NamedExoticComponent<Props<T, Extra>> => {
  const { isNotEmptyData = defaultIsNotEmptyData } = params || {};
  const manager = createRef<Manager>();

  const List = inputsListOnlyList<T>(({ id, single, disabled, canRemoveAll, value, ...props }) => {
    const remove = useCallback(() => manager.current.remove(id), [id]);
    return (
      <div className={s.container}>
        <div className={s.item}>
          {(canRemoveAll || !single) && (
            <RemoveButton
              disabled={disabled as boolean}
              className={s.delete}
              onRemove={remove}
              confirmed={isNotEmptyData(value)}
            />
          )}
          <Component {...(props as ComponentProps<T, Extra>)} disabled={disabled} value={value} />
        </div>
      </div>
    );
  });

  return memo(({ className, onChange, value, manager: outsideManager, ...props }) => {
    useImperativeHandle(outsideManager, () => manager.current);

    return (
      <List
        {...props}
        className={cn(s.root, className)}
        manager={manager as MutableRefObject<Manager>}
        value={value}
        onChange={onChange}
      />
    );
  });
};
