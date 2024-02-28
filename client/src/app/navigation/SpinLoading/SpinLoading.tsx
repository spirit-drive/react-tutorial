import React, { FC } from 'react';
import cn from 'clsx';
import { Spin } from 'antd';
import s from './SpinLoading.sass';

export type UniversalLoadingProps = {
  className?: string;
};

export const SpinLoading: FC<UniversalLoadingProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <Spin />
  </div>
);
