import React, { FC } from 'react';
import cn from 'clsx';
import s from './WebSocketsExample.sass';

export type WebSocketsExampleProps = {
  className?: string;
};

export const WebSocketsExample: FC<WebSocketsExampleProps> = ({ className }) => {
  console.log(WebSocketsExample);
  return <div className={cn(s.root, className)}>WebSocketsExample</div>;
};
