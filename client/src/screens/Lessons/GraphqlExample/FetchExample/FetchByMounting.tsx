import React, { FC, useMemo } from 'react';
import cn from 'clsx';
import { Alert, Spin } from 'antd';
import { useQuery } from '@apollo/client';
import { extractGetCustomers, GET_CUSTOMERS, GetCustomerArgs, GetCustomerResponse } from '../connection';
import { UserCardManagedWithGraphql } from '../UserCardManagedWithGraphql';
import s from './FetchByMounting.sass';

export type FetchByMountingProps = {
  className?: string;
};

export const FetchByMounting: FC<FetchByMountingProps> = ({ className }) => {
  const { data, loading, error, refetch } = useQuery<GetCustomerResponse, GetCustomerArgs>(GET_CUSTOMERS);

  const customers = useMemo(() => extractGetCustomers(data), [data]);

  const content = (() => {
    if (loading) return <Spin />;
    if (error) return <Alert message={error.message} type="error" showIcon />;
    if (data) {
      return (
        <div className={s.users}>
          {customers?.map((item) => (
            <UserCardManagedWithGraphql
              id={item.id}
              name={item.name}
              img={item.img}
              key={item.id}
              afterRemove={() => refetch()}
            />
          ))}
        </div>
      );
    }
    return null;
  })();

  return <div className={cn(s.root, className)}>{content}</div>;
};
