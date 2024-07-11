import React, { useState } from 'react';
import cn from 'clsx';
import { Input } from 'antd';
import { compose } from 'src/utils/compose';
import s from './FunctionalProgramming.sass';

export type FunctionalProgrammingProps = {
  className?: string;
};

const universalFormat = (regexp: RegExp) => (v: string) => v.replace(regexp, '');

const getOnlyDigits = (v: string) => v.replace(/[^\d-.]/g, '');
const removeMinus = (v: string) => v.replace(/-/g, '');
const removeFewZerosInStart = (v: string) => v.replace(/^0+/, '');

// const getOnlyDigits1 = universalFormat(/[^\d-.]/g);
// const getNoMinus1 = universalFormat(/-/g);
// const removeFewZerosInStart1 = universalFormat(/^0+/);

// console.log(getOnlyDigits('asdedew23423dwer34rfew'));
// console.log(removeMinus('-23-12-312-3-'));
// console.log(removeFewZerosInStart('0001232300034000'));

const anonymous = universalFormat(/\w/g);

const prepare = compose(removeMinus, removeFewZerosInStart, anonymous, getOnlyDigits);

const prepare1 = compose(removeMinus, removeFewZerosInStart, universalFormat(/\w/g), getOnlyDigits);

// const prepare0 = compose(
//   (a: boolean) => a,
//   (a: number) => a,
//   (a: string) => ({ a, b, c })
// );

// const test = prepare1('', 2, 3);

const prepare2 = (string: string) => {
  const _1 = getOnlyDigits(string);
  const _2 = anonymous(_1);
  const _3 = removeFewZerosInStart(_2);
  return removeMinus(_3);
};

const prepare3 = (string: string) => removeMinus(removeFewZerosInStart(anonymous(getOnlyDigits(string))));

// console.log(prepare('000asde000dew23000423d- --wer34r--few000'));
// console.log(prepare1('000asde000dew23000423d- --wer34r--few000'));
// console.log(prepare2('000asde000dew23000423d- --wer34r--few000'));

export const FunctionalProgramming = ({ className }: FunctionalProgrammingProps) => {
  const [value, onChange] = useState('');

  return (
    <div className={cn(s.root, className)}>
      <Input
        value={value}
        onChange={(e) => {
          onChange(prepare2(e.target.value));
        }}
      />
    </div>
  );
};
