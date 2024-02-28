import React, { ChangeEvent, memo, useCallback, useRef } from 'react';
import { MemoInput } from './MemoInput';

export type Address = {
  city?: string;
  street?: string;
  house?: string;
};

export type AddressInputProps = {
  className?: string;
  name: string;
  value: Address;
  onChange: (value: Address, name: string) => void;
};

export const AddressInput = memo<AddressInputProps>(({ className, value, name, onChange }) => {
  const valueCopy = useRef(value);
  valueCopy.current = value;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(
        {
          ...(valueCopy.current || {}),
          [e.target.name]: e.target.value,
        },
        name
      );
    },
    [onChange, name]
  );

  // console.log("rerender AddressInput", name);

  return (
    <div className={className}>
      <div>city</div>
      <MemoInput name="city" value={value?.city} onChange={handleChange} />
      <div>street</div>
      <MemoInput name="street" value={value?.street} onChange={handleChange} />
      <div>house</div>
      <MemoInput name="house" value={value?.house} onChange={handleChange} />
    </div>
  );
});
