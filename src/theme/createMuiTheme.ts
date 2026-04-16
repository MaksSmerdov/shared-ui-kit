import { createTheme } from '@mui/material';
import type { UiKitThemeMode } from './themeTokens';

export const createMuiTheme = (mode: UiKitThemeMode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: 'var(--hulk)',
      },
      success: {
        main: 'var(--hulk)',
      },
      background: {
        default: 'var(--white)',
        paper: 'var(--surface-elevated)',
      },
      text: {
        primary: 'var(--black)',
        secondary: 'var(--carbon)',
      },
    },
    typography: {
      fontFamily: 'Bitter, sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: 'var(--white)',
            color: 'var(--black)',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: 'var(--mui-tooltip-bg)',
            color: 'var(--mui-tooltip-fg)',
          },
          arrow: {
            color: 'var(--mui-tooltip-bg)',
          },
        },
      },
    },
  });
};
