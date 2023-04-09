import React, { FC } from 'react';
import cn from 'clsx';
import {useDispatch, useSelector} from "react-redux";
import {themeActions, themeSelectors, Theme } from "../../store/reducers/theme";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import s from './ThemeSwitcher.sass';

export type ThemeSwitcherProps = {
  className?: string;
};

const icons = {
  [Theme.dark]: <DarkModeIcon />,
  [Theme.light]: <LightModeIcon />
};

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const theme = useSelector(themeSelectors.get);
  const dispatch = useDispatch();
  return (
    <button className={cn(s.root, className)} onClick={() => dispatch(themeActions.toggle())}>
      {icons[theme]}
    </button>
  );
};
