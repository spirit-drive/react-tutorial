import React, { FC } from 'react';
import { Header } from 'src/components/Header';
import s from './Layout.sass';

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={s.root}>
      <Header />
      {children}
    </div>
  );
};
