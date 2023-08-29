import React, { FC, useState } from 'react';
import cn from 'clsx';
import { Button, message } from 'antd';
import { IntInput } from 'src/components/Inputs';
import { Title } from 'src/components/Title';
import { getArray, permute } from './helpers';
import s from './WebWorkersExample.sass';

export type WebWorkersExampleProps = {
  className?: string;
};

export const WebWorkersExample: FC<WebWorkersExampleProps> = ({ className }) => {
  const [withWorker, setWithWorker] = useState<number[][]>();
  const [origin, setOrigin] = useState<number[][]>();
  const [value, onChange] = useState<number>(8);

  const calculateOrigin = () => {
    setOrigin([...permute(getArray(value))]);
  };
  const calculateWithWorker = () => {
    if (window.Worker) {
      const worker = new Worker(new URL('./workerMain.ts', import.meta.url));
      worker.postMessage({ value });
      worker.addEventListener('message', (e) => {
        setWithWorker(e.data);
        worker.terminate();
      });
    } else {
      message.error(`К сожалению веб вокреры не поддерживаются на вашем устройстве`);
    }
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
