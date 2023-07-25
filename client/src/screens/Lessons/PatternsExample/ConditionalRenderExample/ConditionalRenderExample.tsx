/* eslint-disable no-console */
import React, { FC, useReducer, useState } from 'react';
import cn from 'clsx';
import s from './ConditionalRenderExample.sass';
import { ChildrenCheck } from '../ChildrenCheck';

const SimpleExample: FC = () => {
  const [visible, toggle] = useReducer((v) => !v, false);

  return (
    <div>
      <ChildrenCheck>
        {visible && <div>Видно если true</div>}
        <hr />
        {visible || <div>Видно если false</div>}
        <hr />
        {visible ? <div>Видно если true</div> : <div>Видно если false</div>}
      </ChildrenCheck>
      <button type="button" onClick={toggle}>
        toggle
      </button>
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
      <button type="button" onClick={onFetch}>
        запросить данные
      </button>
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
