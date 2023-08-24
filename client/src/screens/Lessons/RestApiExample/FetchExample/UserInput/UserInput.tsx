import React, { FC } from 'react';
import cn from 'clsx';
import { Input } from 'antd';
import { User } from '../UserCard/types';
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
  return (
    <div className={cn(s.root, className)}>
      <div className={s.wrapper}>
        {/* {img && <img className={s.img} src={img} alt="" />} */}
        <Input autoFocus onPressEnter={onPressEnter} value={value.name} onChange={onChangeName} />
      </div>
    </div>
  );
};
