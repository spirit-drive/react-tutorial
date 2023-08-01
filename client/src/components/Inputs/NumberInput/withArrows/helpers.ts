import { useCallback, useRef } from 'react';
import { getOnlyNumber } from 'src/utils/format';
import { NumberInputProps } from 'src/components/Inputs/NumberInput';
import { DEFAULT_MAX_VALUE } from '../config';

export const getValue = (value: string | number): number => parseFloat(getOnlyNumber(value.toString()));

export const useCreateUpDown = (
  value: number | string,
  onChange: NumberInputProps['onChange'],
  limits?: { max: number; min: number }
): ((shift: number) => () => void) => {
  const { max = DEFAULT_MAX_VALUE, min = -DEFAULT_MAX_VALUE } = limits || {};
  const valueCopy = useRef(value);
  valueCopy.current = value;

  return useCallback(
    (shift: number) => (): void => {
      const result = getValue(valueCopy.current) + shift;
      if (result < min) onChange(0);
      else if (result > max) onChange(max);
      else onChange(result);
    },
    [min, max, onChange]
  );
};
