import React, { FC, useCallback } from 'react';
import cn from 'clsx';
import s from './BrokenInput.sass';
import { Title } from '../../../../shared/ui/Title';
import { SomeMemoInput } from './SomeMemoInput';

export type BrokenInputValue = {
  city: string;
  house: string;
  street: string;
};

export type BrokenInputProps = {
  className?: string;
  value: BrokenInputValue;
  onChange: (value: BrokenInputValue) => void;
};

export const BrokenInput: FC<BrokenInputProps> = ({ className, value, onChange }) => {
  const handleChange = useCallback((v: string, name: string) => onChange({ ...value, [name]: v }), [onChange]);
  return (
    <div className={cn(s.root, className)}>
      <Title>Город</Title>
      <SomeMemoInput name="city" value={value?.city} onChange={handleChange} />
      <Title>Улица</Title>
      <SomeMemoInput name="street" value={value?.street} onChange={handleChange} />
      <Title>Дом</Title>
      <SomeMemoInput name="house" value={value?.house} onChange={handleChange} />
    </div>
  );
};
