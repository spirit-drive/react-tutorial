// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ChangeEvent, memo, useCallback, useMemo, useRef } from 'react';
import { MemoInput } from './MemoInput';

export type Address = {
  city?: string;
  street?: string;
  house?: string;
};

export type SimpleAddressInputProps = {
  className?: string;
  value: Address;
  onChange: (value: Address) => void;
};

export const SimpleAddressInput = memo<SimpleAddressInputProps>(({ className, value, onChange }) => {
  const valueCopy = useRef(value);
  valueCopy.current = value;

  const { onChangeCity, onChangeStreet, onChangeHouse } = useMemo(
    () => ({
      onChangeCity: (e: ChangeEvent<HTMLInputElement>) => {
        onChange({ ...(valueCopy.current || {}), city: e.target.value });
      },
      onChangeStreet: (e: ChangeEvent<HTMLInputElement>) => {
        onChange({ ...(valueCopy.current || {}), street: e.target.value });
      },
      onChangeHouse: (e: ChangeEvent<HTMLInputElement>) => {
        onChange({ ...(valueCopy.current || {}), house: e.target.value });
      },
    }),
    [onChange]
  );

  return (
    <div className={className}>
      <div>city</div>
      <MemoInput name="city" value={value?.city} onChange={onChangeCity} />
      <div>street</div>
      <MemoInput name="street" value={value?.street} onChange={onChangeStreet} />
      <div>house</div>
      <MemoInput name="house" value={value?.house} onChange={onChangeHouse} />
    </div>
  );
});

// export const SimpleAddressInput = memo<SimpleAddressInputProps>(({ className, value, onChange }) => {
//   const valueCopy = useRef(value);
//   valueCopy.current = value;
//
//   const handleChange = useCallback(
//     (e: ChangeEvent<HTMLInputElement>) => {
//       onChange({
//         ...(valueCopy.current || {}),
//         [e.target.name]: e.target.value,
//       });
//     },
//     [onChange]
//   );
//
//   return (
//     <div className={className}>
//       <div>city</div>
//       <MemoInput name="city" value={value?.city} onChange={handleChange} />
//       <div>street</div>
//       <MemoInput name="street" value={value?.street} onChange={handleChange} />
//       <div>house</div>
//       <MemoInput name="house" value={value?.house} onChange={handleChange} />
//     </div>
//   );
// });
