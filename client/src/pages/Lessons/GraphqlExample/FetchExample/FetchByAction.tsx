import React, { FC, useState, useMemo } from 'react';
import cn from 'clsx';
import { Alert, Button, Input, Spin } from 'antd';
import { useQuery } from '@apollo/client';
import { Title } from 'src/shared/ui/Title';
import { extractGetCustomers, GET_CUSTOMERS, GetCustomerArgs, GetCustomerResponse } from '../connection';
import { UserCardManagedWithGraphql } from '../UserCardManagedWithGraphql';
import s from './FetchByAction.sass';

export type FetchByActionProps = {
  className?: string;
};

export const FetchByAction: FC<FetchByActionProps> = ({ className }) => {
  const [value, onChange] = useState<string>('');
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch({ ids: value ? value.split(' ') : undefined });
  };

  return (
    <form className={cn(s.root, className)} onSubmit={onSubmit}>
      <div>
        <Title>Введите url запроса</Title>
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
      <div>
        <Title>Ответ</Title>
        {content}
      </div>
      <div>
        <Button type="primary" htmlType="submit">
          Запросить
        </Button>
      </div>
    </form>
  );
};
