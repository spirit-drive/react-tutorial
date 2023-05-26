import React, { FC } from 'react';
import cn from 'clsx';
import { Link, LinkProps } from 'react-router-dom';
import s from './StyledLink.sass';

export type StyledLinkProps = LinkProps & React.RefAttributes<HTMLAnchorElement>;

export const StyledLink: FC<StyledLinkProps> = ({ className, ...props }) => (
  <Link {...props} className={cn(s.root, className)} />
);
