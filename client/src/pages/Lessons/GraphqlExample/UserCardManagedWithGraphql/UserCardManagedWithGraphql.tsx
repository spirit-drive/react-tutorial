import React, { FC } from 'react';
import cn from 'clsx';
import { FetchResult, useMutation } from '@apollo/client';
import { UserCardManaged, UserCardManagedProps } from 'src/entities/user/ui/views/UserCardManaged';
import s from './UserCardManagedWithGraphql.sass';
import {
  EDIT_CUSTOMER,
  REMOVE_CUSTOMER,
  EditCustomerArgs,
  EditCustomerResponse,
  RemoveCustomerResponse,
  RemoveCustomerArgs,
} from '../connection';

export type UserCardManagedWithGraphqlProps = Omit<UserCardManagedProps, 'onSave' | 'onRemove'> & {
  afterRemove?: (result: FetchResult<RemoveCustomerResponse>) => void;
};

export const UserCardManagedWithGraphql: FC<UserCardManagedWithGraphqlProps> = ({
  className,
  afterRemove,
  ...props
}) => {
  const [edit] = useMutation<EditCustomerResponse, EditCustomerArgs>(EDIT_CUSTOMER);
  const [remove] = useMutation<RemoveCustomerResponse, RemoveCustomerArgs>(REMOVE_CUSTOMER);

  const onSave = (id: string, data: { name: string; img?: string }) => {
    edit({ variables: { id, name: data.name, img: data.img } });
  };

  const onRemove = (id: string) => remove({ variables: { id } }).then(afterRemove);

  return <UserCardManaged className={cn(s.root, className)} {...props} onSave={onSave} onRemove={onRemove} />;
};
