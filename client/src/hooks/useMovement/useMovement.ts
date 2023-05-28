import React, { CSSProperties, MutableRefObject, useMemo, useRef, useState } from 'react';
import { Coordinate, getTransformElement } from 'src/hooks/helpers';
import { getCoordinatesForOutside, INITIAL_TRANSFORM } from './helpers';
import { UseMovementReturn } from './types';

export const useMovement = (movableElement?: MutableRefObject<HTMLElement>): UseMovementReturn => {
  const [transform, setTransform] = useState<Coordinate>(INITIAL_TRANSFORM);

  const refs = useRef<{
    firstClick: Coordinate;
    startData: { transform: Coordinate; transition: string };
    translate: Coordinate;
    target: MutableRefObject<HTMLElement>;
  }>({
    firstClick: transform,
    startData: { transform, transition: null },
    translate: transform,
    target: movableElement,
  });

  refs.current.translate = transform;
  refs.current.target = movableElement || refs.current.target;

  const { onMouseDown, onTouchStart, moveFromOutside } = useMemo<Omit<UseMovementReturn, 'style'>>(() => {
    const $moveFromOutside = (): void => {
      if (!refs.current.target.current) return;

      const newCoords = getCoordinatesForOutside(refs.current.target.current);
      if (refs.current.translate.x === newCoords.x && refs.current.translate.y === newCoords.y) return;

      const prevTransition = getComputedStyle(refs.current.target.current).transition;

      const transitionEnd = (): void => {
        refs.current.target.current.style.transition = prevTransition;
        refs.current.target.current.removeEventListener('transitionend', transitionEnd);
      };

      refs.current.target.current.style.transition = `transform 0.3s`;
      refs.current.target.current.addEventListener('transitionend', transitionEnd);

      setTransform(newCoords);
    };

    const createMove =
      <E extends MouseEvent | TouchEvent>(getCoordFromEvent: (event: E) => Coordinate) =>
      (e: E): void => {
        e.preventDefault();
        e.stopPropagation();
        setTransform(getCoordFromEvent(e));
      };

    const onMouseMove = createMove<MouseEvent>((e) => ({
      x: e.screenX - refs.current.firstClick.x + refs.current.startData.transform.x,
      y: e.screenY - refs.current.firstClick.y + refs.current.startData.transform.y,
    }));

    const onTouchMove = createMove<TouchEvent>((e) => ({
      x: e.touches[0].screenX - refs.current.firstClick.x + refs.current.startData.transform.x,
      y: e.touches[0].screenY - refs.current.firstClick.y + refs.current.startData.transform.y,
    }));

    const onEnd = (): void => {
      refs.current.target.current.style.transition = refs.current.startData.transition;

      $moveFromOutside();

      window?.removeEventListener('mousemove', onMouseMove);
      window?.removeEventListener('touchmove', onTouchMove);
      window?.removeEventListener('mouseup', onEnd);
      window?.removeEventListener('touchend', onEnd);
    };

    const createStart =
      <E extends React.MouseEvent | React.TouchEvent>(getCoordFromEvent: (event: E) => Coordinate) =>
      (e: E): void => {
        refs.current.target = { current: refs.current.target?.current || (e.currentTarget as HTMLElement) };

        refs.current.startData = getTransformElement(refs.current.target.current);
        refs.current.firstClick = getCoordFromEvent(e);

        refs.current.target.current.style.transition = null;

        window?.addEventListener('mousemove', onMouseMove);
        window?.addEventListener('touchmove', onTouchMove, { passive: false });
        window?.addEventListener('mouseup', onEnd);
        window?.addEventListener('touchend', onEnd);
      };

    return {
      moveFromOutside: $moveFromOutside,
      onMouseDown: createStart<React.MouseEvent>((e) => ({ x: e.screenX, y: e.screenY })),
      onTouchStart: createStart<React.TouchEvent>((e) => ({ x: e.touches[0].screenX, y: e.touches[0].screenY })),
    };
  }, []);

  const style = useMemo<CSSProperties>(
    () => ({ transform: `translate(${transform.x}px, ${transform.y}px)` }),
    [transform]
  );

  return {
    moveFromOutside,
    onTouchStart,
    style,
    onMouseDown,
  };
};
