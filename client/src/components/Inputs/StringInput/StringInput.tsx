import React, { ChangeEvent, memo, useCallback } from 'react';
import { Input } from 'antd';
import cn from 'clsx';
import { InputProps } from 'antd/es/input';
import { useTranslation } from 'react-i18next';
import s from './StringInput.module.sass';

export type Props = Omit<InputProps, 'value' | 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
};

export const StringInput = memo<Props>(({ className, value, onChange, ...props }) => {
  const { t } = useTranslation();
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value), [onChange]);

  return (
    <Input
      placeholder={t`fields.string.placeholder`}
      {...props}
      className={cn(s.root, className)}
      onChange={changeHandler}
      value={value}
    />
  );
});

StringInput.displayName = 'StringInput';
