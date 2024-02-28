import React, { FC, useState } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { Title } from 'src/shared/ui/Title';
import { fetchInfinity, fetchOne, getFromToItems } from './helpers';
import s from './FetchExample.sass';

export type FetchExampleProps = {
  className?: string;
};

export const FetchExample: FC<FetchExampleProps> = ({ className }) => {
  const [one, setOne] = useState<unknown>();
  const [fromTo, setFromTo] = useState<unknown[]>([]);
  const [infinity, setInfinity] = useState<unknown[]>([]);

  return (
    <div className={cn(s.root, className)}>
      <div>
        <Title>Один запрос</Title>
        <div className={s.data}>{JSON.stringify(one)}</div>
        <Button
          type="primary"
          onClick={async () => {
            const { value, done } = fetchOne.next();
            if (!done) setOne(await value);
          }}
        >
          Запросить
        </Button>
      </div>
      <div>
        <Title>Много запросов</Title>
        <div className={s.data}>{JSON.stringify(infinity)}</div>
        <Button
          type="primary"
          onClick={async () => {
            const res = await fetchInfinity.next().value;
            setInfinity((v) => [...v, res]);
          }}
        >
          Запросить
        </Button>
      </div>
      <div>
        <Title>Запросить от и до</Title>
        <div className={s.data}>{JSON.stringify(fromTo)}</div>
        <Button
          type="primary"
          onClick={async () => {
            for await (const item of getFromToItems(1, 20)) {
              setFromTo((v) => [...v, item]);
            }
          }}
        >
          Запросить
        </Button>
      </div>
    </div>
  );
};
