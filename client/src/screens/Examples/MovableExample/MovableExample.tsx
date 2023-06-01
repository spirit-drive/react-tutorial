import React, { FC } from 'react';
import cn from 'clsx';
import { useMovement } from 'src/hooks/useMovement';
import s from './MovableExample.sass';

export type MovableExampleProps = {
  className?: string;
};

export const MovableExample: FC<MovableExampleProps> = ({ className }) => {
  const { onMouseDown, onTouchStart, style } = useMovement();
  return (
    <div className={cn(s.root, className)}>
      <div role="presentation" className={s.target} onMouseDown={onMouseDown} onTouchStart={onTouchStart} style={style}>
        Перемести меня за экран
      </div>
    </div>
  );
};
