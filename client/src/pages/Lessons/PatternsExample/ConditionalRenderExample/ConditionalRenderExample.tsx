/* eslint-disable no-console */
import React, { FC, useReducer, useState } from 'react';
import cn from 'clsx';
import { Divider, Button } from 'antd';
import s from './ConditionalRenderExample.sass';
import { ChildrenCheck } from '../ChildrenCheck';

const Test = ({ children, id }: { children: React.ReactNode; id: string }) => {
  console.log(id);
  return <div>{children}</div>;
};

const arr: number[] = [];

const SimpleExample: FC = () => {
  const [visible, toggle] = useReducer((v) => !v, false);

  return (
    <div>
      <ChildrenCheck>
        {!!Object.keys(arr).length && <div>Есть элементы</div>}
        {visible && <Test id="1">Видно если true</Test>}
        <Divider />
        {visible || <Test id="2">Видно если false</Test>}
        <Divider />
        {visible ? <Test id="3">Видно если true</Test> : <Test id="4">Видно если false</Test>}
      </ChildrenCheck>
      <Button onClick={toggle}>toggle</Button>
    </div>
  );
};

const HandleQueryComponent: FC<{ loading: boolean; error: Error; data: unknown }> = ({ loading, data, error }) => {
  if (loading) return <div>loading</div>;
  if (error) return <div>{error.message}</div>;
  return <div>{JSON.stringify(data)}</div>;
};

const AdvancedExample: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<unknown>();

  const onFetch = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false))
      .catch(setError);
  };

  return (
    <div>
      <ChildrenCheck>
        {loading && <div>loading</div>}
        {error && <div>error.message</div>}
        {!error && !loading && <div>error.message</div>}
      </ChildrenCheck>
      <ChildrenCheck>
        {(() => {
          if (loading) return <div>loading</div>;
          if (error) return <div>{error.message}</div>;
          return JSON.stringify(data);
        })()}
      </ChildrenCheck>
      <ChildrenCheck>
        {/* eslint-disable-next-line no-nested-ternary */}
        {loading ? <div>loading</div> : error ? <div>{error.message}</div> : JSON.stringify(data)}
      </ChildrenCheck>
      <HandleQueryComponent loading={loading} error={error} data={data} />
      <Button onClick={onFetch}>запросить данные</Button>
    </div>
  );
};

export type ConditionalRenderExampleProps = {
  className?: string;
};

export const ConditionalRenderExample: FC<ConditionalRenderExampleProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <SimpleExample />
    <AdvancedExample />
  </div>
);
