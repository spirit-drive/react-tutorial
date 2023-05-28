import React, { memo } from 'react';
import cn from 'clsx';
import { Input, InputProps } from 'antd';
import s from './SomeMemoInput.sass';

export type SomeMemoInputProps = Omit<InputProps, 'onChange'> & {
  name: string;
  onChange: (value: string, name: string) => void;
};

export const SomeMemoInput = memo<SomeMemoInputProps>(({ className, name, onChange, ...props }) => {
  console.log(`rerender ${name}`);
  return <Input {...props} className={cn(s.root, className)} onChange={(e) => onChange(e.target.value, name)} />;
});
