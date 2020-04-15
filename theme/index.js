import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { theme as coreTheme } from './core';
import { textStyles } from './textStyles';

export const theme = {
	__faithlifeStyledUIThemeVersion: 1,
	...coreTheme,
	textStyles,
};

export function useTheme() {
	return useContext(ThemeContext) || theme;
}

export function isSystemTheme(theme) {
	return !!theme.__faithlifeStyledUIThemeVersion;
}
