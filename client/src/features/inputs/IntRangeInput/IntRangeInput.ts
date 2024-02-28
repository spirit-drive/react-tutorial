import { InputNumberProps } from 'antd';
import { createRangeInput, RangeInputProps } from 'src/shared/inputs/factories/createRangeInput';
import { IntInputWithArrows } from 'src/features/inputs/NumberInput/IntInput';

export type IntRangeInputProps = RangeInputProps<number>;

export const IntRangeInput = createRangeInput<number, Omit<InputNumberProps<number>, 'value' | 'onChange'>>(
  IntInputWithArrows
);
