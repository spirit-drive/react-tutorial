import React, { FC } from 'react';
import cn from 'clsx';
import { FibonacciExample } from './FibonacciExample';
import { PrimeExample } from './PrimeExample';
import { PermutationsExample } from './PermutationsExample';
import { FetchExample } from './FetchExample';
import s from './GeneratorsExample.sass';

export type ModalExampleProps = {
  className?: string;
};

export const GeneratorsExample: FC<ModalExampleProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <FibonacciExample />
    <PrimeExample />
    <PermutationsExample />
    <FetchExample />
  </div>
);
