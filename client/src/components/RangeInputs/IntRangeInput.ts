import { InputNumberProps } from 'antd';
import { createRangeInput, RangeInputProps } from './createRangeInput';
import { IntInput } from '../Inputs/NumberInput';

export type IntRangeInput = RangeInputProps<number>;

export const IntRangeInput = createRangeInput<number, Omit<InputNumberProps<number>, 'value' | 'onChange'>>(IntInput);
