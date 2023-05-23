import React, { FC } from 'react';
import cn from 'clsx';
import { Logo } from '../Logo';
import s from './Header.sass';

export type HeaderProps = {
  className?: string;
};

export const Header: FC<HeaderProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <Logo />
  </div>
);
