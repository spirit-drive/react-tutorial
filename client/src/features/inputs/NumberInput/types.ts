import { Ref } from 'react';
import { Input, InputNumberProps } from 'antd';

export type NumberInputProps = Omit<InputNumberProps, 'value' | 'onChange' | 'max' | 'min'> & {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  forwardElem?: Ref<typeof Input>;
};
