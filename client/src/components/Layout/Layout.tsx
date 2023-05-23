import React, { FC } from 'react';
import cn from 'clsx';
import { Header } from '../Header';
import s from './Layout.sass';

export type LayoutProps = {
  className?: string;
};

export const Layout: FC<LayoutProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <Header />
    Layout
  </div>
);
