import React, { FC } from 'react';
import cn from 'clsx';
import { Helmet } from 'react-helmet';
import { Frame } from '../Frame';
import s from './Page.sass';

export type PageProps = {
  className?: string;
  title: string;
  children: React.ReactNode;
};

export const Page: FC<PageProps> = ({ className, title, children }) => {
  console.log();
  return (
    <Frame className={cn(s.root, className)}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h1 className={s.title}>{title}</h1>
      <div className={s.page}>{children}</div>
    </Frame>
  );
};
