import React, { FC } from 'react';
import cn from 'clsx';
import { SortableList } from 'src/shared/ui/SortableList';
import s from './SortableListExample.sass';

export type MovableExampleProps = {
  className?: string;
};

const list = Array(100)
  .fill('')
  .map((_, i) => i + 1);

export const SortableListExample: FC<MovableExampleProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <div>Можно сортировать</div>
    <SortableList<number> list={list} />
  </div>
);
