import React, { FC } from 'react';
import cn from 'clsx';
import { Title } from 'src/shared/ui/Title';
import { FetchExample } from './FetchExample';
import s from './RestApiExample.sass';

export type BabelExampleProps = {
  className?: string;
};

export const RestApiExample: FC<BabelExampleProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <div>
      <Title className={s.title}>Классическое использование fetch</Title>
      <FetchExample />
    </div>
  </div>
);
