import React, { FC, Reducer, useEffect, useReducer } from 'react';
import cn from 'clsx';
import { Alert, Spin } from 'antd';
import { myCustomFetch } from 'src/app/client/myCustomFetch';
import { User } from 'src/entities/user/ui/views/UserCard/types';
import { UserCardManaged } from 'src/entities/user/ui/views/UserCardManaged';
import { runServerText } from 'src/pages/Lessons/RestApiExample/common';
import { QueryAction, QueryData, reducer } from './common';
import s from './FetchByMounting.sass';

export type FetchByMountingProps = {
  className?: string;
};

export const FetchByMounting: FC<FetchByMountingProps> = ({ className }) => {
  const [state, dispatch] = useReducer<Reducer<QueryData<User[]>, QueryAction<User[]>>>(reducer, {
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    dispatch({ type: 'loading' });
    myCustomFetch<User[]>('/users')
      .then((res) => dispatch({ type: 'data', payload: res }))
      .catch((e) => dispatch({ type: 'error', payload: e }));
  }, []);

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
              onSave={onSave}
              onRemove={onRemove}
              id={item.id}
              name={item.name}
              img={item.img}
              key={item.id}
            />
          ))}
        </div>
      );
    }
    return null;
  })();

  return <div className={cn(s.root, className)}>{content}</div>;
};
