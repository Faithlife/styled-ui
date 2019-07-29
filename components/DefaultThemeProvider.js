import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';

function getTheme(parentTheme) {
	return parentTheme || theme;
}

export const DefaultThemeProvider = ({ theme, children }) => (
	<ThemeProvider theme={getTheme}>{children}</ThemeProvider>
);
