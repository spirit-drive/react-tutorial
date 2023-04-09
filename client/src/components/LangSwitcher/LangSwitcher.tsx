import React, { FC } from 'react';
import cn from 'clsx';
import {useDispatch, useSelector} from "react-redux";
import {langActions, langSelectors } from "../../store/reducers/lang";
import s from './LangSwitcher.sass';

export type ThemeSwitcherProps = {
  className?: string;
};

export const LangSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const lang = useSelector(langSelectors.get);
  const dispatch = useDispatch();
  return (
    <button className={cn(s.root, className)} onClick={() => dispatch(langActions.toggle())}>
      {lang}
    </button>
  );
};
