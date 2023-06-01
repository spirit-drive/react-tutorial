import { InputNumberProps } from 'antd';
import { createRangeInput, RangeInputProps } from 'src/components/Inputs/createRangeInput';
import { IntInputWithArrows } from 'src/components/Inputs/NumberInput/IntInput';

export type IntRangeInputProps = RangeInputProps<number>;

export const IntRangeInput = createRangeInput<number, Omit<InputNumberProps<number>, 'value' | 'onChange'>>(
  IntInputWithArrows
);
