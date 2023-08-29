import React, { FC } from 'react';
import cn from 'clsx';
import s from './WebWorkersExample.sass';

export type WebWorkersExampleProps = {
  className?: string;
};

export const WebWorkersExample: FC<WebWorkersExampleProps> = ({ className }) => {
  console.log(WebWorkersExample);
  return <div className={cn(s.root, className)}>WebWorkersExample</div>;
};
