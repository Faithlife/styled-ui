import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { get } from 'styled-system';
import { theme as defaultTheme } from '../theme';

/**
 * A wrapper component that merges a provided theme object with the existing global theme above it
 * (or the default Styled UI theme if no global theme has been set) and provides the resulting new
 * global theme prop to all styled-components underneath it via the context API.
 */
export function ThemeProvider({ theme, children }) {
	const getCurrentTheme = useCallback(parent => getTheme(getTheme(parent ?? defaultTheme, theme)), [
		theme,
	]);

	return <StyledThemeProvider theme={getCurrentTheme}>{children}</StyledThemeProvider>;
}

ThemeProvider.propTypes = {
	theme: PropTypes.object.isRequired,
	children: PropTypes.node,
};

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
