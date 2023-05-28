import React, { FC } from 'react';
import cn from 'clsx';
import { CloseOutlined } from '@ant-design/icons';
import s from './ModalHeader.sass';

export type Children = React.ReactNode;
export type ChildrenCallback = (btnClassName?: string) => Children;

export type ModalHeaderProps = {
  className?: string;
  children?: Children | ChildrenCallback;
  onClose?: () => void;
};

export const ModalHeader: FC<ModalHeaderProps> = ({ className, onClose, children }) => (
  <div className={cn(s.root, className)}>
    {typeof children === 'function' ? (children as ChildrenCallback)(s.btn) : children}
    {onClose && <CloseOutlined data-testid="close-modal" className={s.btn} onClick={onClose} />}
  </div>
);
