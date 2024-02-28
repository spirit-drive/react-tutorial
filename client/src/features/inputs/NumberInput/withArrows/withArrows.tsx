import React, { memo, NamedExoticComponent, useCallback, KeyboardEvent, useMemo } from 'react';
import { Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import cn from 'clsx';
import { NumberInputProps } from '../types';
import { useCreateUpDown } from './helpers';
import s from './withArrows.sass';

export const withArrows = (Component: React.ElementType<NumberInputProps>): NamedExoticComponent<NumberInputProps> =>
  memo(({ value, onChange, max, onKeyDown, min, disabled, className, ...props }) => {
    const createUpDown = useCreateUpDown(value, onChange, { max, min });

    const { down, fastDown, fastUp, up } = useMemo(
      () => ({
        down: createUpDown(-1),
        up: createUpDown(1),
        fastDown: createUpDown(-10),
        fastUp: createUpDown(10),
      }),
      [createUpDown]
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'ArrowDown') {
          e.preventDefault();
          if (e.shiftKey) {
            fastDown();
          } else {
            down();
          }
        }
        if (e.code === 'ArrowUp') {
          e.preventDefault();
          if (e.shiftKey) {
            fastUp();
          } else {
            up();
          }
        }
        onKeyDown?.(e);
      },
      [down, fastDown, fastUp, onKeyDown, up]
    );

    return (
      <div className={s.root}>
        <Button data-testid="down" disabled={disabled} className={s.button} onClick={down}>
          <DownOutlined />
        </Button>
        <Component
          {...props}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className={cn(s.input, className)}
          max={max}
          value={value}
          onChange={onChange}
        />
        <Button data-testid="up" disabled={disabled} className={s.button} onClick={up}>
          <UpOutlined />
        </Button>
      </div>
    );
  });
