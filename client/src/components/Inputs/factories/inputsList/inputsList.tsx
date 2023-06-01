import React, { createRef, memo, NamedExoticComponent, MutableRefObject } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { inputsListRemoved } from 'src/components/Inputs/factories';
import { ListParams, Manager, Props as CommonProps, ComponentProps as CommonComponentProps } from './types';
import s from './inputsList.sass';

export type Props<T, Extra> = Omit<CommonProps<T, Extra>, 'manager'> & { title: string };

export type ComponentProps<T, Extra> = Omit<CommonComponentProps<T, Extra>, 'id' | 'single'>;

export const inputsList = <T, Extra = Record<string, unknown>>(
  Component: React.ComponentType<ComponentProps<T, Extra>>,
  params?: ListParams<T>
): NamedExoticComponent<Props<T, Extra>> => {
  const manager = createRef<Manager>();
  const List = inputsListRemoved<T>(
    ({ id, single, ...props }) => <Component {...(props as ComponentProps<T, Extra>)} />,
    params
  );

  return memo(({ className, title, onChange, value, ...props }) => (
    <div className={cn(s.root, className)}>
      <div className={s.title}>
        {title}
        <Button size="small" onClick={(): void => manager.current?.add()}>
          <PlusOutlined />
        </Button>
      </div>
      <List {...props} manager={manager as MutableRefObject<Manager>} value={value} onChange={onChange} />
    </div>
  ));
};
