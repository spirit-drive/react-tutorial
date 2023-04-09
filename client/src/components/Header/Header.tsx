import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { Frame } from 'src/components/Frame';
import { Logo } from 'src/components/Logo';
import { ResponseNavigation, ResponseNavigationProps } from 'src/components/ResponseNavigation';
import {WithTranslation, withTranslation} from 'react-i18next';
import { NavLink, NavLinkProps } from 'react-router-dom';
import s from './Header.sass';

export type HeaderOriginProps = WithTranslation & {
  className?: string;
};

const horClassName: NavLinkProps['className'] = ({ isActive }) => cn(s.horizontalLink, isActive && s.active);
const verClassName: NavLinkProps['className'] = ({ isActive }) => cn(s.verticalLink, isActive && s.active);

export const HeaderOrigin = memo<HeaderOriginProps>(({ className, t }) => {
  const { left, right } = useMemo<Pick<ResponseNavigationProps, 'left' | 'right'>>(
    () => ({
      left: [
        {
          key: '/practices',
          horizontalElem: <NavLink className={horClassName} to="/practices">{t(`nav`)}</NavLink>,
          verticalElem: <NavLink className={verClassName} to="/practices">{t(`nav`)}</NavLink>,
        },
      ],
      right: [
        {
          key: '/profile',
          horizontalElem: (
            <NavLink className={horClassName} to="/profile">
              user
            </NavLink>
          ),
          verticalElem: (
            <NavLink className={verClassName} to="/profile">
              user
            </NavLink>
          ),
        },
      ],
    }),
    [t]
  );

  return (
    <header className={cn(s.root, className)}>
      <Frame className={s.frame}>
        <Logo className={s.logo} />
        <ResponseNavigation title={t(`nav`)} className={s.menu} left={left} right={right} />
      </Frame>
    </header>
  );
});

HeaderOrigin.displayName = 'HeaderOrigin';

export const Header = withTranslation('header')(HeaderOrigin);
