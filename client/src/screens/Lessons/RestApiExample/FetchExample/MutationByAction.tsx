import React, { FC, useReducer, useState, useEffect } from 'react';
import cn from 'clsx';
import { Alert, Button, Input, Spin } from 'antd';
import { myCustomFetch } from 'src/client/myCustomFetch';
import { Title } from 'src/components/Title';
import { reducer } from './common';
import s from './MutationByAction.sass';

export type MutationByActionProps = {
  className?: string;
};

export const MutationByAction: FC<MutationByActionProps> = ({ className }) => {
  const [value, onChange] = useState<string>('/users');
  const [state, dispatch] = useReducer(reducer, { loading: false, error: null, data: null });

  const query = (input = '/users') => {
    dispatch({ type: 'loading' });
    myCustomFetch(input)
      .then((res) => dispatch({ type: 'data', payload: res }))
      .catch((e) => dispatch({ type: 'error', payload: e }));
  };

  useEffect(query, []);

  const content = (() => {
    if (state.loading) return <Spin />;
    if (state.error) return <Alert message={state.error.message} className={s.result} type="error" showIcon />;
    if (state.data) return <div className={s.result}>{JSON.stringify(state.data, null, 2)}</div>;
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
