import React, { FC } from 'react';
import cn from 'clsx';
import s from './SortableItemView.sass';

export type SortableItemProps<T = unknown> = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  classNameBadge?: string;
  active?: boolean;
  value?: T;
};

export const SortableItemView: FC<SortableItemProps<unknown>> = ({
  className,
  onMouseDown,
  onTouchStart,
  value,
  active,
  classNameBadge,
  ...props
}) => (
  <div className={cn(s.root, active && s.active, className)} {...props}>
    <div className={cn(s.badge, active && s.active, classNameBadge)}>{value as React.ReactNode}</div>
  </div>
);
