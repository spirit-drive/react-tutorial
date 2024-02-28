import React, { FC, useCallback, useState } from 'react';
import { Divider } from 'antd';
import { Title } from 'src/shared/ui/Title';
import { AddressInput, Address, AddressInputProps } from './AddressInput';
import { SimpleAddressInput } from './SimpleAddressInput';

export type EventSwitchExampleProps = {
  className?: string;
};

export type EventSwitchState = Record<'address1' | 'address2' | 'address3', Address>;

export const EventSwitchExample: FC<EventSwitchExampleProps> = ({ className }) => {
  const [address, setAddress] = useState<Address>({} as Address);
  const [state, setState] = useState<EventSwitchState>({} as EventSwitchState);

  const onChange = useCallback<AddressInputProps['onChange']>(
    (value, name) => setState((v) => ({ ...v, [name]: value })),
    []
  );

  return (
    <div className={className}>
      <Title>Простой пример</Title>
      <SimpleAddressInput value={address} onChange={setAddress} />
      <Divider />
      <Title>address1</Title>
      <AddressInput name="address1" value={state.address1} onChange={onChange} />
      <Divider />
      <Title>address2</Title>
      <AddressInput name="address2" value={state.address2} onChange={onChange} />
      <Divider />
      <Title>address3</Title>
      <AddressInput name="address3" value={state.address3} onChange={onChange} />
    </div>
  );
};
