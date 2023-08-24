import React, { FC } from 'react';
import cn from 'clsx';
import s from './RestApiExample.sass';

export type BabelExampleProps = {
  className?: string;
};

export const RestApiExample: FC<BabelExampleProps> = ({ className }) => {
  console.log('1');
  return <div className={cn(s.root, className)}>{/* пусто */}</div>;
};
