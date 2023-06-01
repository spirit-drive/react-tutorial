import React, { createRef, MutableRefObject, useMemo, useRef, useState } from 'react';
import { getTransformElement, getTransformElementStyle } from '../helpers';
import { ResizeData, Type, Position, Sizes } from './types';
import { resizeForCenteredElement } from './resize';
import s from './useResize.module.sass';

/**
 * Требуется чтобы родительский элемент для edges имел position: relative/absolute
 * */
export const useResize = (element: MutableRefObject<HTMLElement>, onEndHandler?: () => void): ResizeData => {
  const [style, setStyle] = useState<Sizes>();
  const refs = useRef<{
    topElement: MutableRefObject<HTMLDivElement>;
    rightElement: MutableRefObject<HTMLDivElement>;
    bottomElement: MutableRefObject<HTMLDivElement>;
    leftElement: MutableRefObject<HTMLDivElement>;
    element: MutableRefObject<HTMLElement>;
    onEndHandler: () => void;
    startData: {
      cursor: Position;
      element: { width: number; height: number; x: number; y: number; transform: string; transition: string };
    };
    savedType: Type;
  }>({
    element,
    topElement: createRef(),
    rightElement: createRef(),
    bottomElement: createRef(),
    leftElement: createRef(),
    startData: undefined,
    savedType: undefined,
    onEndHandler,
  });

  refs.current.onEndHandler = onEndHandler;

  const edges = useMemo(() => {
    const createMove =
      <E extends MouseEvent | TouchEvent>(handler: (e: E) => Position) =>
      (e: E): void => {
        setStyle((currentSizes) =>
          resizeForCenteredElement(handler(e), refs.current.savedType, {
            currentSizes,
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            startHeight: refs.current.startData.element.height,
            startWidth: refs.current.startData.element.width,
          })
        );
      };

    const mouseMove = createMove<MouseEvent>((e) => ({
      x: e.clientX - refs.current.startData.cursor.x,
      y: e.clientY - refs.current.startData.cursor.y,
    }));

    const touchMove = createMove<TouchEvent>((e) => ({
      x: e.touches[0].clientX - refs.current.startData.cursor.x,
      y: e.touches[0].clientY - refs.current.startData.cursor.y,
    }));

    const onEnd = (): void => {
      window?.removeEventListener('mouseup', onEnd);
      window?.removeEventListener('mousemove', mouseMove);
      window?.removeEventListener('touchend', onEnd);
      window?.removeEventListener('touchmove', touchMove);
      refs.current.element.current.style.transition = refs.current.startData.element.transition;
      refs.current.startData = null;
      refs.current.onEndHandler?.();
    };

    const start = (e: React.MouseEvent | React.TouchEvent, cursor: Position): void => {
      e.preventDefault();
      e.stopPropagation();
      const { width, height } = refs.current.element.current?.getBoundingClientRect() || {};
      const { transform, transition } = getTransformElement(refs.current.element.current);
      const { x, y } = transform;
      refs.current.element.current.style.transition = null;
      refs.current.startData = {
        cursor,
        element: {
          width,
          height,
          x,
          y,
          transition,
          transform: getTransformElementStyle(refs.current.element.current),
        },
      };
    };

    const createStart =
      <E extends React.MouseEvent | React.TouchEvent>(handler: (e: E) => Position) =>
      (type: Type) =>
      (e: E): void => {
        if (refs.current.startData) return;
        refs.current.savedType = type;
        start(e, handler(e));
        window?.addEventListener('mousemove', mouseMove);
        window?.addEventListener('mouseup', onEnd);
        window?.addEventListener('touchmove', touchMove);
        window?.addEventListener('touchend', onEnd);
      };

    const onMouseDown = createStart<React.MouseEvent>((e) => ({ x: e.clientX, y: e.clientY }));
    const onTouchStart = createStart<React.TouchEvent>((e) => ({ x: e.touches[0].clientX, y: e.touches[0].clientY }));

    return (
      <>
        <div
          role="presentation"
          ref={refs.current.topElement}
          onTouchStart={onTouchStart(Type.top)}
          onMouseDown={onMouseDown(Type.top)}
          className={s.top}
        />
        <div
          role="presentation"
          ref={refs.current.rightElement}
          onTouchStart={onTouchStart(Type.right)}
          onMouseDown={onMouseDown(Type.right)}
          className={s.right}
        />
        <div
          role="presentation"
          ref={refs.current.bottomElement}
          onTouchStart={onTouchStart(Type.bottom)}
          onMouseDown={onMouseDown(Type.bottom)}
          className={s.bottom}
        />
        <div
          role="presentation"
          ref={refs.current.leftElement}
          onTouchStart={onTouchStart(Type.left)}
          onMouseDown={onMouseDown(Type.left)}
          className={s.left}
        />
      </>
    );
  }, []);

  return { edges, style };
};
