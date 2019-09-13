import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme as defaultTheme } from '../theme';

export const DefaultThemeProvider = ({ theme, children }) => (
	<ThemeProvider theme={parentTheme => parentTheme || theme || defaultTheme}>
		{children}
	</ThemeProvider>
);
