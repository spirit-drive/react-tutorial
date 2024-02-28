import React, { FC, useState, useRef, useEffect } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ProgressIndicator } from 'src/shared/ui/ProgressIndicator';
import { Title } from 'src/shared/ui/Title';
import s from './PermutationsExample.sass';

export type PermutationsExampleProps = {
  className?: string;
};

const LENGTH = 7;

const array = Array(LENGTH)
  .fill('')
  .map((_, i) => i);

function factorial(n: number): number {
  let result = 1;
  let i = 1;
  while (i <= n) {
    result *= i;
    i++;
  }
  return result;
}

const count = factorial(LENGTH);

// function permutations(arr: number[]): number[][] {
//   const result: number[][] = [];
//   const permute = (_arr: number[], m: number[] = []) => {
//     if (_arr.length === 0) {
//       result.push(m);
//     } else {
//       for (let i = 0; i < _arr.length; i++) {
//         const curr = [..._arr];
//         const next = curr.splice(i, 1);
//         permute(curr.slice(), m.concat(next));
//       }
//     }
//   };
//
//   permute(arr);
//
//   return result;
// }
//
// export const PermutationsExample: FC<PermutationsExampleProps> = ({ className }) => {
//   const [list, setList] = useState<number[][]>([]);
//
//   const onClick = () => setList(permutations(array));
//
//   return (
//     <div className={cn(s.root, className)}>
//       <Title>Найти перетасовки</Title>
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

function* permute(arr: number[], m: number[] = []): Generator<number[]> {
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

export const PermutationsExample: FC<PermutationsExampleProps> = ({ className }) => {
  const [running, setRunning] = useState<boolean>(false);
  const [list, setList] = useState<number[]>([]);

  const listCopy = useRef(list);
  listCopy.current = list;

  const permutation = useRef<Generator<number[]>>();
  const paused = useRef<boolean>(false);

  useEffect(() => {
    const fn = () => {
      if (paused.current) return;
      const { value, done } = permutation.current.next();
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
        permutation.current = permute(array);
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
      <Title>Найти перетасовки</Title>
      <div>
        <ProgressIndicator className={s.progress} progress={(list.length / count) * 100} />
        {`${list.length} / ${count}`}
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
