import React, { FC } from 'react';
import cn from 'clsx';
import { Helmet } from 'react-helmet';
import { Frame } from '../Frame';
import s from './Page.sass';

export type PageProps = {
  className?: string;
  title: React.ReactNode;
  children: React.ReactNode;
};

export const Page: FC<PageProps> = ({ className, title, children }) => (
  <Frame className={cn(s.root, className)}>
    {typeof title === 'string' && (
      <Helmet>
        <title>{title}</title>
      </Helmet>
    )}
    <h1 className={s.title}>{title}</h1>
    <div className={s.page}>{children}</div>
  </Frame>
);
