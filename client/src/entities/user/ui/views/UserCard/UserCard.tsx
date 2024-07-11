import React, { FC } from 'react';
import cn from 'clsx';
import { User } from './types';
import s from './UserCard.sass';

export type UserCardProps = User & {
  className?: string;
};

export const UserCard: FC<UserCardProps> = ({ className, img, name }) => (
  <div className={cn(s.root, className)}>
    <div className={s.wrapper}>
      {img && <img className={s.img} src={img} alt="" />}
      <div>{name}</div>
    </div>
  </div>
);
