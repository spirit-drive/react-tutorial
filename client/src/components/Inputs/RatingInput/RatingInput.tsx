import React, { memo } from 'react';
import cn from 'clsx';
import { StarCheckbox } from 'src/components/Checkboxes';
import s from './RatingInput.module.sass';

export interface Props {
  className?: string;
  children?: never;
  value: number;
  onChange: (value: number) => void;
}

const map = Array(5)
  .fill('')
  .map((_, i) => i + 1);

export const RatingInput = memo<Props>(({ value, className, onChange }) => (
  <div className={cn(s.root, className)}>
    {map.map((star) => (
      <StarCheckbox checked={star <= value} onCheck={() => onChange(star)} />
    ))}
  </div>
));

RatingInput.displayName = 'RatingInput';
