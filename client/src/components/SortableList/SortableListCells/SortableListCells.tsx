import React, { FC, memo, useMemo, useRef, useEffect, RefObject, useState } from 'react';
import cn from 'clsx';
import { getTransformFromCss } from 'src/utils/valueFromCss';
import { SortableListItem, SortableListItems } from '../types';
import { SortableItemProps } from '../SortableItemView';
import s from './SortableListCells.sass';

export type SortableListItemsProps = {
  className?: string;
  items: SortableListItems;
  bases: RefObject<HTMLElement[]>;
  root: RefObject<HTMLDivElement>;
  sortable?: boolean;
  elementView: FC<SortableItemProps>;
  reorder: (id1: string, id2: string) => void;
  onStartSortable?: () => void;
  onFinishSortable?: () => void;
  itemClassName?: string;
};

export const SortableListCells = memo<SortableListItemsProps>(
  ({
    className,
    onStartSortable,
    onFinishSortable,
    itemClassName,
    bases,
    sortable,
    reorder,
    root,
    items,
    elementView: ElementView,
  }) => {
    const itemsRef = useRef<Array<{ elem: HTMLElement; item: SortableListItem }>>([]);
    itemsRef.current = [];
    const [activeId, setActiveId] = useState<string>();

    const mounted = useRef(true);
    useEffect(
      () => (): void => {
        mounted.current = false;
      },
      []
    );

    const activeIdCopy = useRef(activeId);
    activeIdCopy.current = activeId;

    const sortableCopy = useRef(sortable);
    sortableCopy.current = sortable;

    const { onMouseDown, setCoords, onTouchStart } = useMemo(() => {
      let timeoutId: number;
      let transition: string;
      let elem: HTMLDivElement;

      let elementSizes: Array<{ rect: DOMRect; id: string }>;
      const elemPosition = { x: 0, y: 0 };
      const clickPosition = { x: 0, y: 0 };

      const _setCoords = (): void => {
        if (!root.current || !mounted.current) return;
        const { top: rootTop, left: rootLeft } = root.current.getBoundingClientRect();
        elementSizes = [];
        bases.current.forEach((base, i) => {
          const rect = base.getBoundingClientRect();
          elementSizes.push({ id: itemsRef.current[i].item.id, rect });

          if (itemsRef.current[i].item.id === activeIdCopy.current) return;
          const { top, left } = rect;
          itemsRef.current[i].elem.style.transform = `translate(${left - rootLeft}px, ${top - rootTop}px)`;
        });
      };

      const getTransformForMove = ({ x, y }: { x: number; y: number }): string =>
        `translate(${elemPosition.x + x - clickPosition.x}px, ${elemPosition.y + y - clickPosition.y}px)`;

      const createMove =
        <E extends MouseEvent | TouchEvent>(
          handle: (e: E) => { clientX: number; clientY: number; screenX: number; screenY: number }
        ) =>
        (e: E): void => {
          const coord = handle(e);
          elem.style.transform = getTransformForMove({ x: coord.screenX, y: coord.screenY });
          elementSizes.forEach((elementSize) => {
            if (elementSize.id === activeIdCopy.current) {
              return;
            }
            if (
              coord.clientX > elementSize.rect.left &&
              coord.clientX < elementSize.rect.right &&
              coord.clientY > elementSize.rect.top &&
              coord.clientY < elementSize.rect.bottom
            ) {
              clearTimeout(timeoutId);
              timeoutId = window.setTimeout(() => {
                reorder(activeIdCopy.current, elementSize.id);
              });
            }
          });
        };

      const mouseMove = createMove<MouseEvent>((e) => ({
        clientY: e.clientY,
        clientX: e.clientX,
        screenX: e.screenX,
        screenY: e.screenY,
      }));

      const touchMove = createMove<TouchEvent>((e) => ({
        clientY: e.touches[0].clientY,
        clientX: e.touches[0].clientX,
        screenX: e.touches[0].screenX,
        screenY: e.touches[0].screenY,
      }));

      const end = (): void => {
        elem.style.transition = transition;
        elem.style.zIndex = '0';

        setActiveId(null);

        setTimeout(() => _setCoords());

        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('touchmove', touchMove);
        window.removeEventListener('mouseup', end);
        window.removeEventListener('touchend', end);
        onFinishSortable?.();
      };

      const createStart =
        <E extends React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>>(
          handle: (e: E) => { x: number; y: number }
        ) =>
        (id: string) =>
        (e: E): void => {
          if (!sortableCopy.current) return;
          setActiveId(id);
          elem = e.currentTarget as HTMLDivElement;
          elem.style.zIndex = '1';

          transition = elem.style.transition;
          elem.style.transition = 'none';

          const translates = getTransformFromCss(getComputedStyle(elem).transform);

          elemPosition.x = translates.x;
          elemPosition.y = translates.y;

          const data = handle(e);
          clickPosition.x = data.x;
          clickPosition.y = data.y;

          window.addEventListener('mousemove', mouseMove, { passive: true });
          window.addEventListener('touchmove', touchMove, { passive: true });
          window.addEventListener('mouseup', end, { passive: true });
          window.addEventListener('touchend', end, { passive: true });
          onStartSortable?.();
        };

      return {
        setCoords: _setCoords,
        onMouseDown: createStart<React.MouseEvent<HTMLElement>>((e) => ({ x: e.screenX, y: e.screenY })),
        onTouchStart: createStart<React.TouchEvent<HTMLElement>>((e) => ({
          x: e.touches[0].screenX,
          y: e.touches[0].screenY,
        })),
      };
    }, [root, bases, reorder, onFinishSortable, onStartSortable]);

    useEffect(() => {
      setTimeout(() => setCoords());
    }, [setCoords, items]);

    useEffect(() => {
      const observer = new ResizeObserver(setCoords);
      observer.observe(root.current);

      return (): void => observer.disconnect();
    }, [root, setCoords]);

    return (
      <div className={cn(s.root, className)}>
        {items.map((item) => {
          const refCallback = (elem: HTMLElement | null): void => {
            if (elem) itemsRef.current.push({ elem, item });
          };
          return (
            <div
              role="presentation"
              onMouseDown={onMouseDown(item.id)}
              onTouchStart={onTouchStart(item.id)}
              ref={refCallback}
              key={item.id}
              className={cn(s.item, itemClassName)}
            >
              <ElementView value={item.value} active={activeId === item.id} />
            </div>
          );
        })}
      </div>
    );
  }
);
