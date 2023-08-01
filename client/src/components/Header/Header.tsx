import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { WithTranslation, withTranslation } from 'react-i18next';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Frame } from 'src/components/Frame';
import { Logo } from 'src/components/Logo';
import { ResponseNavigation, ResponseNavigationProps } from 'src/components/ResponseNavigation';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { LangSwitcher } from '../LangSwitcher';
import { Login } from '../Login';
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
          key: '/',
          horizontalElem: (
            <NavLink className={horClassName} to="/">
              {t(`components.header.root`)}
            </NavLink>
          ),
          verticalElem: (
            <NavLink className={verClassName} to="/">
              {t(`components.header.root`)}
            </NavLink>
          ),
        },
        {
          key: '/profile',
          horizontalElem: (
            <NavLink className={horClassName} to="/profile">
              {t(`components.header.profile`)}
            </NavLink>
          ),
          verticalElem: (
            <NavLink className={verClassName} to="/profile">
              {t(`components.header.profile`)}
            </NavLink>
          ),
        },
        {
          key: '/examples',
          horizontalElem: (
            <NavLink className={horClassName} to="/examples">
              {t(`components.header.examples`)}
            </NavLink>
          ),
          verticalElem: (
            <NavLink className={verClassName} to="/examples">
              {t(`components.header.examples`)}
            </NavLink>
          ),
        },
        {
          key: '/lessons',
          horizontalElem: (
            <NavLink className={horClassName} to="/lessons">
              {t(`components.header.lessons`)}
            </NavLink>
          ),
          verticalElem: (
            <NavLink className={verClassName} to="/lessons">
              {t(`components.header.lessons`)}
            </NavLink>
          ),
        },
        {
          key: '/teachers',
          horizontalElem: (
            <NavLink className={horClassName} to="/teachers">
              {t(`components.header.teachers`)}
            </NavLink>
          ),
          verticalElem: (
            <NavLink className={verClassName} to="/teachers">
              {t(`components.header.teachers`)}
            </NavLink>
          ),
        },
      ],
      right: [
        {
          key: 'theme-switcher',
          horizontalElem: <ThemeSwitcher className={s.switcher} />,
          verticalElem: <ThemeSwitcher className={s.switcher} />,
        },
        {
          key: 'lang-switcher',
          horizontalElem: <LangSwitcher className={s.switcher} />,
          verticalElem: <LangSwitcher className={s.switcher} />,
        },
        {
          key: 'login',
          horizontalElem: <Login className={s.switcher} />,
          verticalElem: <Login className={s.switcher} />,
        },
      ],
    }),
    [t]
  );

  return (
    <header className={cn(s.root, className)}>
      <Frame className={s.frame}>
        <Logo className={s.logo} />
        <ResponseNavigation title={t(`components.header.nav`)} className={s.menu} left={left} right={right} />
      </Frame>
    </header>
  );
});

HeaderOrigin.displayName = 'HeaderOrigin';

export const Header = withTranslation()(HeaderOrigin);
