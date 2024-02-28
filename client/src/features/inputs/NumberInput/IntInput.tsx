import React, { memo } from 'react';
import { InputNumber } from 'antd';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { NumberInputProps } from './types';
import { DEFAULT_MAX_VALUE } from './config';
import { withArrows } from './withArrows';
import s from './NumberInput.sass';

export const parser = (v: string): number => {
  const value = parseInt(v?.replace(/[^\d-]/g, ''), 10);
  if (Number.isNaN(value)) return 0;
  return value;
};

export type Props = NumberInputProps;

export const IntInput = memo<Props>(({ className, ...props }) => {
  const { t } = useTranslation();

  return (
    <InputNumber
      max={DEFAULT_MAX_VALUE}
      className={cn(s.root, className)}
      placeholder={t`components.NumberInput.integer.placeholder`}
      {...props}
      parser={parser}
    />
  );
});

export const IntInputWithArrows = withArrows(IntInput);
