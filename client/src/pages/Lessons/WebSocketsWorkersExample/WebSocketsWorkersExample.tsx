import React, { FC } from 'react';
import cn from 'clsx';
import { Title } from 'src/shared/ui/Title';
import { WebSocketsExample } from './WebSocketsExample';
import { WebWorkersExample } from './WebWorkersExample';
import s from './WebSocketsWorkersExample.sass';

export type BabelExampleProps = {
  className?: string;
};

export const WebSocketsWorkersExample: FC<BabelExampleProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <Title className={s.title}>Веб сокеты</Title>
    <WebSocketsExample />
    <Title className={s.title}>Веб воркеры</Title>
    <WebWorkersExample />
  </div>
);
