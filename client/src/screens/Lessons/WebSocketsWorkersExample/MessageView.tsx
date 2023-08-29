import React, { FC } from 'react';
import cn from 'clsx';
import s from './MessageView.sass';

export type Message = {
  socketID: string;
  name?: string;
  msg: string;
};

export type MessageViewProps = {
  className?: string;
  value: Message;
};

export const MessageView: FC<MessageViewProps> = ({ className, value }) => {
  if (!value) return null;
  return (
    <div className={cn(s.root, className)}>
      <div>{`От: ${value.name || value.socketID}`}</div>
      <div>{value.msg}</div>
    </div>
  );
};
