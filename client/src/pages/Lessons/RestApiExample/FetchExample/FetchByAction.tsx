import React, { FC, useReducer, useState, useEffect, Reducer } from 'react';
import cn from 'clsx';
import { Alert, Button, Input, Spin } from 'antd';
import { myCustomFetch } from 'src/app/client/myCustomFetch';
import { Title } from 'src/shared/ui/Title';
import { User } from 'src/entities/user/ui/views/UserCard/types';
import { UserCardManaged } from 'src/entities/user/ui/views/UserCardManaged';
import { runServerText } from 'src/pages/Lessons/RestApiExample/common';
import { QueryAction, QueryData, reducer } from './common';
import s from './FetchByAction.sass';

export type FetchByActionProps = {
  className?: string;
};

export const FetchByAction: FC<FetchByActionProps> = ({ className }) => {
  const [value, onChange] = useState<string>('/users');
  const [state, dispatch] = useReducer<Reducer<QueryData<User[]>, QueryAction<User[]>>>(reducer, {
    loading: false,
    error: null,
    data: null,
  });

  const query = (input = '/users') => {
    dispatch({ type: 'loading' });
    myCustomFetch<User[]>(input)
      .then((res) => dispatch({ type: 'data', payload: res }))
      .catch((e) => dispatch({ type: 'error', payload: e }));
  };

  const onRemove = (id: string) => {
    dispatch({ type: 'loading' });
    myCustomFetch<User[]>(`/users/${id}`, { method: 'delete' })
      .then((res) => dispatch({ type: 'data', payload: res }))
      .catch((e) => dispatch({ type: 'error', payload: e }));
  };

  const onSave = (id: string, user: User) => {
    dispatch({ type: 'loading' });
    myCustomFetch<User[]>(`/users/${id}`, {
      method: 'put',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => dispatch({ type: 'data', payload: res }))
      .catch((e) => dispatch({ type: 'error', payload: e }));
  };

  useEffect(query, []);

  const content = (() => {
    if (state.loading) return <Spin />;
    if (state.error) {
      return (
        <Alert
          message={state.error.message === 'Failed to fetch' ? runServerText : state.error.message}
          type="error"
          showIcon
        />
      );
    }
    if (state.data) {
      return (
        <div className={s.users}>
          {state.data?.map((item) => (
            <UserCardManaged
              id={item.id}
              name={item.name}
              img={item.img}
              key={item.id}
              onRemove={onRemove}
              onSave={onSave}
            />
          ))}
        </div>
      );
    }
    return null;
  })();

  const handleChange = (v: string) => onChange(v.startsWith('/') ? v : `/${v}`);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    query(value);
  };

  return (
    <form className={cn(s.root, className)} onSubmit={onSubmit}>
      <div>
        <Title>Введите url запроса</Title>
        <Input value={value} onChange={(e) => handleChange(e.target.value)} />
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
