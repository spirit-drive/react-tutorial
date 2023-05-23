import React, { FC } from 'react';
import cn from 'clsx';
import s from './Skeleton.sass';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton: FC<SkeletonProps> = ({ className, ...props }) => (
  <div {...props} className={cn(s.root, className)} />
);
