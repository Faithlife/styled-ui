import React, { useCallback } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { get } from 'styled-system';
import { theme as defaultTheme } from '../theme';

export function ThemeProvider({ theme, children }) {
	const getCurrentTheme = useCallback(parent => getTheme(getTheme(parent ?? defaultTheme, theme)), [
		theme,
	]);

	return <StyledThemeProvider theme={getCurrentTheme}>{children}</StyledThemeProvider>;
}

function getTheme(parent, overrides) {
	if (!overrides) {
		return parent;
	}

	const baseColors = {
		...parent.colors,
		...overrides.colors,
	};

	const theme = {
		...parent,
		...overrides,
		colors: {
			...baseColors,
			...resolveColors(overrides.colors, baseColors),
		},
	};

	return theme;
}

function resolveColors(colors, themeColors) {
	const mapped = Object.fromEntries(
		Object.entries(colors ?? {}).map(([k, v]) => [
			k,
			typeof v === 'object' ? resolveColors(v, themeColors) : get(themeColors, v) ?? v,
		]),
	);

	return mapped;
}
