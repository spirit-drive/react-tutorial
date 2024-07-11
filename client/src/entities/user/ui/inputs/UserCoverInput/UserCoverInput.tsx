import React, { FC } from 'react';
import cn from 'clsx';
import { ImgInput } from 'src/features/inputs/ImgInput';
import s from './UserCoverInput.sass';

export type FileInputProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

export const UserCoverInput: FC<FileInputProps> = ({ className, ...props }) => (
  <ImgInput className={cn(s.root, className)} {...props} />
);
