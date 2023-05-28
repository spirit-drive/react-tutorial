import React, { FC, useState } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Title } from 'src/components/Title';
import s from './PrimeExample.sass';

export type PrimeExampleProps = {
  className?: string;
};

const size = 100000;

const getPrimes = (n: number): number[] => {
  const primes = [];
  for (let i = 2; i <= n; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
  }
  return primes;
};

export const PrimeExample: FC<PrimeExampleProps> = ({ className }) => {
  const [list, setList] = useState<number[]>([]);

  const onClick = () => setList(getPrimes(size));

  return (
    <div className={cn(s.root, className)}>
      <Title>Найти простые числа</Title>

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
