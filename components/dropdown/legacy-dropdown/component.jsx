import React from 'react';
import PropTypes from 'prop-types';
import { DropdownCore } from './dropdown-core';
import { DefaultThemeProvider } from '../../DefaultThemeProvider';
import { isSystemTheme } from '../../../theme';

const Dropdown = function Dropdown(props) {
	const { isOpen, onToggleMenu, theme, styleOverrides, children, ...dropdownProps } = props;

	const isCoreTheme = isSystemTheme(theme);
	const themedProps = { ...dropdownProps, ...(isCoreTheme ? {} : theme) };

	return (
		<DefaultThemeProvider>
			<DropdownCore
				isOpen={isOpen}
				onToggleMenu={onToggleMenu}
				themeOverrides={themedProps}
				styleOverrides={styleOverrides}
			>
				{children}
			</DropdownCore>
		</DefaultThemeProvider>
	);
};

Dropdown.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onToggleMenu: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	theme: PropTypes.shape({
		hoverBackgroundColor: PropTypes.string,
		checkboxPrimary: PropTypes.string,
		checkboxBorder: PropTypes.string,
	}),
	styleOverrides: PropTypes.shape({
		fontSize: PropTypes.string,
		padding: PropTypes.string,
		width: PropTypes.string,
	}),
};

Dropdown.defaultProps = {
	theme: {
		checkboxPrimary: '#1E91D6',
		checkboxBorder: '#95908f',
	},
	styleOverrides: {},
};

export { Dropdown };
