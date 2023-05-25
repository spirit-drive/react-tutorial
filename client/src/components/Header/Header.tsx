import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { Frame } from 'src/components/Frame';
import { Logo } from 'src/components/Logo';
import { ResponseNavigation, ResponseNavigationProps } from 'src/components/ResponseNavigation';
import { WithTranslation, withTranslation } from 'react-i18next';
import { NavLink, NavLinkProps } from 'react-router-dom';
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
              {t(`header.root`)}
            </NavLink>
          ),
          verticalElem: (
            <NavLink className={verClassName} to="/">
              {t(`header.root`)}
            </NavLink>
          ),
        },
        {
          key: '/secret',
          horizontalElem: (
            <NavLink className={horClassName} to="/secret">
              {t(`header.secret`)}
            </NavLink>
          ),
          verticalElem: (
            <NavLink className={verClassName} to="/secret">
              {t(`header.secret`)}
            </NavLink>
          ),
        },
        {
          key: '/examples',
          horizontalElem: (
            <NavLink className={horClassName} to="/examples">
              {t(`header.examples`)}
            </NavLink>
          ),
          verticalElem: (
            <NavLink className={verClassName} to="/examples">
              {t(`header.examples`)}
            </NavLink>
          ),
        },
        {
          key: '/teachers',
          horizontalElem: (
            <NavLink className={horClassName} to="/teachers">
              {t(`header.teachers`)}
            </NavLink>
          ),
          verticalElem: (
            <NavLink className={verClassName} to="/teachers">
              {t(`header.teachers`)}
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
        <ResponseNavigation
          title={t(`header.nav`)}
          className={s.menu}
          gap={16}
          left={left}
          right={right}
          classNameMenuIcon={s.icon}
        />
      </Frame>
    </header>
  );
});

HeaderOrigin.displayName = 'HeaderOrigin';

export const Header = withTranslation()(HeaderOrigin);
