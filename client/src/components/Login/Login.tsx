import React, { FC } from 'react';
import cn from 'clsx';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { tokenSelectors, tokenActions } from '../../store/token';
import s from './Login.sass';

export type LoginProps = {
  className?: string;
};

export const Login: FC<LoginProps> = ({ className }) => {
  const dispatch = useDispatch();
  const token = useSelector<RootState, RootState['token']>(tokenSelectors.get);

  return (
    <div className={cn(s.root, className)}>
      {token ? (
        <button className={s.btn} type="button" onClick={() => dispatch(tokenActions.logout())}>
          <LogoutIcon />
        </button>
      ) : (
        <Link className={s.btn} to="auth">
          <LoginIcon />
        </Link>
      )}
    </div>
  );
};
