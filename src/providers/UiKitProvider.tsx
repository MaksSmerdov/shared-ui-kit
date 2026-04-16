import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useMemo, type ReactNode } from 'react';
import { createCssThemeVars, UI_KIT_THEME_ATTRIBUTE } from '../theme/createCssThemeVars';
import { createMuiTheme } from '../theme/createMuiTheme';
import type { UiKitThemeMode } from '../theme/themeTokens';
import '../theme/theme.scss';

export interface UiKitProviderProps {
  children: ReactNode;
  theme?: UiKitThemeMode;
}

export const UiKitProvider = ({ children, theme = 'light' }: UiKitProviderProps) => {
  const muiTheme = useMemo(() => createMuiTheme(theme), [theme]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const root = document.documentElement;
    const previousTheme = root.getAttribute(UI_KIT_THEME_ATTRIBUTE);
    const themeVars = createCssThemeVars(theme);

    root.setAttribute(UI_KIT_THEME_ATTRIBUTE, theme);
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    return () => {
      if (previousTheme) {
        root.setAttribute(UI_KIT_THEME_ATTRIBUTE, previousTheme);
      } else {
        root.removeAttribute(UI_KIT_THEME_ATTRIBUTE);
      }

      Object.keys(themeVars).forEach((key) => {
        root.style.removeProperty(key);
      });
    };
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
