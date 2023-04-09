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
  const { left, right } = useMemo<Pick<ResponseNavigationProps, 'left'>>(
    () => ({
      left: [
        {
          key: '/',
          horizontalElem: <NavLink className={horClassName} to="/">{t(`header.root`)}</NavLink>,
          verticalElem: <NavLink className={verClassName} to="/">{t(`header.root`)}</NavLink>,
        },
        {
          key: '/home-works',
          horizontalElem: <NavLink className={horClassName} to="/home-works">{t(`header.home-works`)}</NavLink>,
          verticalElem: <NavLink className={verClassName} to="/home-works">{t(`header.home-works`)}</NavLink>,
        },
        {
          key: '/examples',
          horizontalElem: <NavLink className={horClassName} to="/examples">{t(`header.examples`)}</NavLink>,
          verticalElem: <NavLink className={verClassName} to="/examples">{t(`header.examples`)}</NavLink>,
        },
        {
          key: '/teachers',
          horizontalElem: <NavLink className={horClassName} to="/teachers">{t(`header.teachers`)}</NavLink>,
          verticalElem: <NavLink className={verClassName} to="/teachers">{t(`header.teachers`)}</NavLink>,
        },
      ],
    }),
    [t]
  );

  return (
    <header className={cn(s.root, className)}>
      <Frame className={s.frame}>
        <Logo className={s.logo} />
        <ResponseNavigation title={t(`header.nav`)} className={s.menu} gap={16} left={left} right={right} classNameMenuIcon={s.icon} />
      </Frame>
    </header>
  );
});

HeaderOrigin.displayName = 'HeaderOrigin';

export const Header = withTranslation()(HeaderOrigin);
