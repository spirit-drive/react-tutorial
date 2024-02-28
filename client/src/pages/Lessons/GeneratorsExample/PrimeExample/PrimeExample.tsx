import React, { FC, useState, useRef, useEffect } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ProgressIndicator } from 'src/shared/ui/ProgressIndicator';
import { Title } from 'src/shared/ui/Title';
import s from './PrimeExample.sass';

export type PrimeExampleProps = {
  className?: string;
};

const size = 1000;

// const getPrimes = (n: number): number[] => {
//   const primes = [];
//   for (let i = 2; i <= n; i++) {
//     let isPrime = true;
//     for (let j = 2; j <= Math.sqrt(i); j++) {
//       if (i % j === 0) {
//         isPrime = false;
//         break;
//       }
//     }
//     if (isPrime) {
//       primes.push(i);
//     }
//   }
//   return primes;
// };
//
// export const PrimeExample: FC<PrimeExampleProps> = ({ className }) => {
//   const [list, setList] = useState<number[]>([]);
//
//   const onClick = () => setList(getPrimes(size));
//
//   return (
//     <div className={cn(s.root, className)}>
//       <Title>Найти простые числа</Title>
//
//       <div className={s.buttons}>
//         <Button type="primary" onClick={onClick}>
//           <PlayCircleIcon />
//         </Button>
//       </div>
//       {list.map((item, i) => (
//         <div key={i}>{item}</div>
//       ))}
//     </div>
//   );
// };

function* getPrimes(n: number): Generator<number> {
  for (let i = 2; i <= n; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      yield i;
    }
  }
}

export const PrimeExample: FC<PrimeExampleProps> = ({ className }) => {
  const [running, setRunning] = useState<boolean>(false);
  const [list, setList] = useState<number[]>([]);

  const listCopy = useRef(list);
  listCopy.current = list;

  const primes = useRef<Generator<number>>();
  const paused = useRef<boolean>(false);

  useEffect(() => {
    const fn = () => {
      if (paused.current) return;
      const { value, done } = primes.current.next();
      if (!done) {
        setList((v) => [...v, value]);
        setTimeout(fn);
      }
    };

    if (running) {
      paused.current = false;

      if (listCopy.current.length) {
        fn();
      } else {
        primes.current = getPrimes(size);
        fn();
      }
    } else {
      paused.current = true;
    }
  }, [running]);

  const onStop = () => {
    setList([]);
    setRunning(false);
  };
  return (
    <div className={cn(s.root, className)}>
      <Title>Найти простые числа</Title>
      <div>
        <ProgressIndicator className={s.progress} progress={(list.length / size) * 100} />
        {`${list.length} / ${size}`}
      </div>
      <div className={s.buttons}>
        <Button type="primary" onClick={() => setRunning(true)}>
          <PlayCircleIcon />
        </Button>
        <Button onClick={() => setRunning(false)}>
          <PauseCircleIcon />
        </Button>
        <Button type="primary" danger onClick={onStop}>
          <HighlightOffIcon />
        </Button>
      </div>
      {list.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </div>
  );
};
