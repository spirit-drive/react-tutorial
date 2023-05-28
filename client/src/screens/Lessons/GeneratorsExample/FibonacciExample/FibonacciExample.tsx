import React, { FC, useState } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Title } from 'src/components/Title';
import s from './FibonacciExample.sass';

export type FibonacciExampleProps = {
  className?: string;
};

const size = 10000;

const fibonacciSequense = (length: number): number[] => {
  let [prev, current, next] = [0, 0, 1];
  const result: number[] = [];
  while (length > 0) {
    result.push(current);
    prev = current;
    current = next;
    next = prev + next;
    length--;
  }
  return result;
};

export const FibonacciExample: FC<FibonacciExampleProps> = ({ className }) => {
  const [list, setList] = useState<number[]>([]);

  const onClick = () => setList(fibonacciSequense(size));

  return (
    <div className={cn(s.root, className)}>
      <Title>Найти числа Фибоначчи</Title>

      <div className={s.buttons}>
        <Button type="primary" onClick={onClick}>
          <PlayCircleIcon />
        </Button>
      </div>
      {list.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </div>
  );
};
