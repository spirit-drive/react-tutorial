import React, { FC } from 'react';
import cn from 'clsx';
import s from './ProgressIndicator.sass';

export type Props = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * от 0 до 100
   * */
  progress: number;
};

export const ProgressIndicator: FC<Props> = ({ className, progress, ...props }) => (
  <div className={cn(s.root, className)} {...props}>
    <div className={s.progress} style={{ transform: `translateX(${progress - 100}%)` }} />
  </div>
);
