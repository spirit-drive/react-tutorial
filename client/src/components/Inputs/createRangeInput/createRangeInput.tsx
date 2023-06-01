import React, { memo, NamedExoticComponent, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'clsx';
import { Title } from '../../Title';
import s from './createRangeInput.sass';

export type InputComponentProps<T> = {
  value: T;
  onChange: (value: T) => void;
};

export type RangeInputValue<T> = {
  from?: T;
  to?: T;
};

export type RangeInputProps<T> = {
  className?: string;
  value: RangeInputValue<T>;
  onChange: (value: RangeInputValue<T>) => void;
};

export const createRangeInput = <T, P = Record<string, unknown>>(
  InputComponent: React.ComponentType<InputComponentProps<T>>
): NamedExoticComponent<RangeInputProps<T> & P> =>
  memo(({ className, value, onChange, ...props }) => {
    const { t } = useTranslation();

    const valueCopy = useRef(value);
    valueCopy.current = value;

    const { onChangeFrom, onChangeTo } = useMemo(
      () => ({
        onChangeFrom: (from: T): void => onChange({ ...(valueCopy.current || ({} as RangeInputValue<T>)), from }),
        onChangeTo: (to: T): void => onChange({ ...(valueCopy.current || ({} as RangeInputValue<T>)), to }),
      }),
      [onChange]
    );

    return (
      <div className={cn(s.root, className)}>
        <div className={s.item}>
          <Title>{t`components.RangeInputs.from`}</Title>
          <InputComponent {...props} value={value?.from} onChange={onChangeFrom} />
        </div>
        <div className={s.item}>
          <Title>{t`components.RangeInputs.to`}</Title>
          <InputComponent {...props} value={value?.to} onChange={onChangeTo} />
        </div>
      </div>
    );
  });
