import React, { FC } from 'react';
import cn from 'clsx';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeContext, Theme } from '../../theming';
import s from './ThemeSwitcher.sass';

export type ThemeSwitcherProps = {
  className?: string;
};

const icons = {
  [Theme.light]: <DarkModeIcon />,
  [Theme.dark]: <LightModeIcon />,
};

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <button type="button" className={cn(s.root, className)} onClick={toggleTheme}>
      {icons[theme]}
    </button>
  );
};
