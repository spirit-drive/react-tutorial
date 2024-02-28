import React, { FC, useState } from 'react';
import cn from 'clsx';
import { Button, message } from 'antd';
import { Title } from 'src/shared/ui/Title';
import { IntInput } from 'src/features/inputs/NumberInput';
import { getArray, permute } from './helpers';
import s from './WebWorkersExample.sass';

export type WebWorkersExampleProps = {
  className?: string;
};

export const WebWorkersExample: FC<WebWorkersExampleProps> = ({ className }) => {
  const [withWorker, setWithWorker] = useState<number[][] | string>();
  const [origin, setOrigin] = useState<number[][] | string>();
  const [value, onChange] = useState<number>(9);

  const calculateOrigin = () => {
    setOrigin('loading...');
    console.time('sync');
    setTimeout(() => {
      setOrigin([...permute(getArray(value))]);
      // setOrigin([...permute(getArray(value))]);
      console.timeEnd('sync');
    });
  };
  const calculateWithWorker = () => {
    setWithWorker('loading...');
    if (window.Worker) {
      console.time('worker1');
      const worker1 = new Worker(new URL('./worker.ts', import.meta.url));
      worker1.postMessage({ value });
      worker1.addEventListener('message', (e) => {
        setWithWorker(e.data);
        worker1.terminate();
        console.timeEnd('worker1');
      });
      // console.time('worker2');
      // const worker2 = new Worker(new URL('./worker.ts', import.meta.url));
      // worker2.postMessage({ value });
      // worker2.addEventListener('message', (e) => {
      //   // setWithWorker(e.data);
      //   worker2.terminate();
      //   console.timeEnd('worker2');
      // });
      // console.time('worker3');
      // const worker3 = new Worker(new URL('./worker.ts', import.meta.url));
      // worker3.postMessage({ value });
      // worker3.addEventListener('message', (e) => {
      //   // setWithWorker(e.data);
      //   worker3.terminate();
      //   console.timeEnd('worker3');
      // });
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
          <div className={s.body}>{JSON.stringify(origin)}</div>
        </div>
        <div>
          <Button onClick={calculateWithWorker}>С воркером</Button>
          <div className={s.body}>{JSON.stringify(withWorker)}</div>
        </div>
      </div>
    </div>
  );
};
