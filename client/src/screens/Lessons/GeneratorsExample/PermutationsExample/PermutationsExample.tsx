import React, { FC, useState } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Title } from 'src/components/Title';
import s from './PermutationsExample.sass';

export type PermutationsExampleProps = {
  className?: string;
};

const LENGTH = 5;

const array = Array(LENGTH)
  .fill('')
  .map((_, i) => i);

function permutations(arr: number[]): number[][] {
  const result: number[][] = [];
  const permute = (_arr: number[], m: number[] = []) => {
    if (_arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < _arr.length; i++) {
        const curr = [..._arr];
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(arr);

  return result;
}

export const PermutationsExample: FC<PermutationsExampleProps> = ({ className }) => {
  const [list, setList] = useState<number[][]>([]);

  const onClick = () => setList(permutations(array));

  return (
    <div className={cn(s.root, className)}>
      <Title>Найти перетасовки</Title>

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
