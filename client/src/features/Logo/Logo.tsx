import React, { memo } from 'react';
import cn from 'clsx';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import s from './Logo.sass';

export type LogoProps = {
  className?: string;
};

export const Logo = memo<LogoProps>(({ className }) => (
  <Link to="/" className={cn(s.root, className)}>
    <img src={logo} alt="logo" className={s.img} />
  </Link>
));

Logo.displayName = 'Logo';
