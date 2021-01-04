import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { theme as defaultTheme } from '../theme';

/**
 * A wrapper component that injects the default Styled UI theme into the component tree below it if
 * a global theme has not already been set above it. Otherwise, it simply passes the parent theme
 * on.
 */
export const DefaultThemeProvider = ({ theme, children }) => (
	<ThemeProvider theme={parentTheme => parentTheme || theme || defaultTheme}>
		{children}
	</ThemeProvider>
);

DefaultThemeProvider.propTypes = {
	/**
	 * A theme object to inject instead of the default Styled UI theme if no global theme has already
	 * been set above it.
	 */
	theme: PropTypes.object,
	children: PropTypes.node,
};
