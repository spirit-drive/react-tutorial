import React, { createContext, FC, useCallback, useContext, useInsertionEffect, useState } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import vars from 'src/styles/common.scss';
import { Theme } from './types';

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const useThemeContext = (): ThemeContextType => useContext(ThemeContext);

const KEY = 'theme';

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(KEY) as Theme) || Theme.light);

  useInsertionEffect(() => {
    localStorage.setItem(KEY, theme);
    const html = document.body.parentElement;
    html.classList.add(theme);

    return () => html.classList.remove(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((v) => (v === Theme.light ? Theme.dark : Theme.light)), []);

  const isLight = theme === Theme.light;
  const colorPrimary = isLight ? vars.light_accent : vars.dark_accent;
  const algorithm = isLight ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm;
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <ConfigProvider theme={{ token: { colorPrimary }, algorithm }}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};
