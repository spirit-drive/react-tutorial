import React, { FC } from 'react';
import cn from 'clsx';
import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
import s from './Login.sass';

export type LoginProps = {
  className?: string;
};

export const Login: FC<LoginProps> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={cn(s.root, className)}>
      <LoginIcon />
      {t('login.enter')}
    </div>
  );
};
