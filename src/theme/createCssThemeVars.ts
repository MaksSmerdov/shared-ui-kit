import type { UiKitThemeMode } from './themeTokens';
import { themeTokens } from './themeTokens';

export const UI_KIT_THEME_ATTRIBUTE = 'data-ui-kit-theme';

export const createCssThemeVars = (mode: UiKitThemeMode): Record<string, string> => {
  return Object.fromEntries(Object.entries(themeTokens[mode]).map(([token, value]) => [`--${token}`, value]));
};
