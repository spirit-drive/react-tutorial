import React, { FC } from 'react';
import cn from 'clsx';
import { Input } from 'antd';
import { UserCoverInput } from 'src/components/Inputs/UserCoverInput';
import { User } from 'src/components/UserCard/types';
import s from './UserInput.sass';

export type UserInputProps = {
  className?: string;
  onPressEnter?: () => void;
  value: User;
  onChange: (value: User) => void;
};

export const UserInput: FC<UserInputProps> = ({ className, value, onPressEnter, onChange }) => {
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...(value || ({} as User)), name: e.target.value });
  const onChangeImg = (img: string) => onChange({ ...(value || ({} as User)), img });
  return (
    <div className={cn(s.root, className)}>
      <div className={s.wrapper}>
        <UserCoverInput value={value?.img} onChange={onChangeImg} />
        <Input autoFocus onPressEnter={onPressEnter} value={value?.name} onChange={onChangeName} />
      </div>
    </div>
  );
};
