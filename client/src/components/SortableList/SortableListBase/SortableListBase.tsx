import React, { FC, memo, MutableRefObject } from 'react';
import cn from 'clsx';
import { SortableListItems } from 'src/components/SortableList/types';
import { SortableItemProps } from 'src/components/SortableList/SortableItemView';
import s from './SortableListBase.sass';

export type SortableListBaseProps = {
  className?: string;
  items: SortableListItems;
  bases: MutableRefObject<HTMLElement[]>;
  elementView: FC<SortableItemProps>;
  itemClassName?: string;
};

export const SortableListBase = memo<SortableListBaseProps>(
  ({ className, itemClassName, items, bases, elementView: ElementView }) => {
    bases.current = [];
    const refCallback = (elem: HTMLElement | null): void => {
      if (elem) bases.current.push(elem);
    };
    return (
      <div className={cn(s.root, className)}>
        {items.map((item) => (
          <div role="presentation" ref={refCallback} key={item.id} className={cn(s.item, itemClassName)}>
            <ElementView key={item.id} value={item.value} />
          </div>
        ))}
      </div>
    );
  }
);
