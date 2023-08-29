import React, { FC, useEffect } from 'react';
import cn from 'clsx';
import { socket } from './socket';
import s from './WebSocketsExample.sass';

export type WebSocketsExampleProps = {
  className?: string;
};

export const WebSocketsExample: FC<WebSocketsExampleProps> = ({ className }) => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
  return <div className={cn(s.root, className)}>WebSocketsExample</div>;
};
