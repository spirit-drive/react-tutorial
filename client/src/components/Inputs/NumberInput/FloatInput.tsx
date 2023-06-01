import React, { FC } from 'react';
import { InputNumber, InputNumberProps } from 'antd';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { DEFAULT_MAX_VALUE } from './config';
import s from './NumberInput.sass';

const parser = (v: string): number => parseFloat(v.replace(',', '.'));

export const FloatInput: FC<InputNumberProps<number>> = ({ className, ...props }) => {
  const { t } = useTranslation();

  return (
    <InputNumber<number>
      max={DEFAULT_MAX_VALUE}
      parser={parser}
      placeholder={t`components.NumberInput.float.placeholder`}
      className={cn(s.root, className)}
      {...props}
    />
  );
};
