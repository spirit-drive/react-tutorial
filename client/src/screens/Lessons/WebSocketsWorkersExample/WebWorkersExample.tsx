import React, { FC, useState } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { IntInput } from 'src/components/Inputs';
import { Title } from 'src/components/Title';
import s from './WebWorkersExample.sass';

export type WebWorkersExampleProps = {
  className?: string;
};

const getArray = (length: number) =>
  Array(length)
    .fill('')
    .map((_, i) => i);

function* permute(arr: number[], m: number[] = []): Generator<number[]> {
  // написать свою реализацию
  if (arr.length === 0) {
    yield m;
  } else {
    for (let i = 0; i < arr.length; i++) {
      const curr = [...arr];
      const next = curr.splice(i, 1);
      yield* permute(curr.slice(), m.concat(next));
    }
  }
}

export const WebWorkersExample: FC<WebWorkersExampleProps> = ({ className }) => {
  const [withWorker, setWithWorker] = useState<number[][]>();
  const [origin, setOrigin] = useState<number[][]>();
  const [value, onChange] = useState<number>(7);

  const calculateOrigin = () => {
    setOrigin([...permute(getArray(value))]);
  };
  const calculateWithWorker = () => {
    setWithWorker([...permute(getArray(value))]);
  };
  return (
    <div className={cn(s.root, className)}>
      <Title>Найдем все перестановки из заданного количества элементов</Title>
      <div>
        <Title>Количество элементов</Title>
        <IntInput min={0} value={value} onChange={onChange} />
        <div className={s.value}>{getArray(value).join(', ')}</div>
      </div>
      <div className={s.base}>
        <div>
          <Button onClick={calculateOrigin}>Без веб воркера</Button>
          <div className={s.body}>{JSON.stringify(origin, null, 2)}</div>
        </div>
        <div>
          <Button onClick={calculateWithWorker}>С воркером</Button>
          <div className={s.body}>{JSON.stringify(withWorker, null, 2)}</div>
        </div>
      </div>
    </div>
  );
};
