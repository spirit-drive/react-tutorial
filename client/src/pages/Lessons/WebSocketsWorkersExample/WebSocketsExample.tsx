import React, { FC, useEffect, useState } from 'react';
import cn from 'clsx';
import { Button, Divider, Input } from 'antd';
import { useSelector } from 'react-redux';
import { Title } from 'src/shared/ui/Title';
import { profileSelectors } from 'src/app/store/profile';
import { MessageView, Message } from './MessageView';
import { socket } from './socket';
import s from './WebSocketsExample.sass';

export type WebSocketsExampleProps = {
  className?: string;
};

export const WebSocketsExample: FC<WebSocketsExampleProps> = ({ className }) => {
  const profile = useSelector(profileSelectors.get);

  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.connect();
    socket.emit('getMsgs');
    socket.on('msgs', setMessages);

    return () => {
      socket.disconnect();
      socket.off('msgs', setMessages);
    };
  }, []);

  const sendMsg = (msg: string) => socket.emit('msg', { msg, name: profile?.name });
  const onText = () => socket.emit('test', (a: number, b: number) => a + b); // Функция работать не будет

  const onSend = () => {
    sendMsg(value);
    setValue('');
  };
  return (
    <div className={cn(s.root, className)}>
      <div>
        <Title className={s.title}>Сообщения</Title>
        <div className={s.field}>
          {messages?.map((msg, i) => (
            <MessageView className={s.msg} value={msg} key={i} />
          ))}
        </div>
      </div>
      <Divider />
      <div>
        <Title className={s.title}>Введите сообщение</Title>
        <Input.TextArea onPressEnter={onSend} value={value} rows={5} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div>
        <Button type="primary" onClick={onSend} className={s.btn}>
          Отправить
        </Button>{' '}
        <Button type="primary" onClick={onText} className={s.btn}>
          Тест
        </Button>
      </div>
    </div>
  );
};
