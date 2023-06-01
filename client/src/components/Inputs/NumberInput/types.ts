import { InputProps } from 'antd/lib/input/Input';
import { Ref } from 'react';
import { Input } from 'antd';

export type NumberInputProps = Omit<InputProps, 'value' | 'onChange'> & {
  value: number | string;
  onChange: (value: number) => void;
  maxValue?: number;
  minValue?: number;
  forwardElem?: Ref<Input>;
};
