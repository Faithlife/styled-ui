import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../shared-hooks';
import { PopoverManager } from '../popover';
import { DropdownContextProvider } from './dropdown-utils';

export function Dropdown({ isOpen, onToggleIsOpen, theme, styleOverrides, children }) {
	const [focusedMenuItem, setFocusedMenuItem] = useState(null);
	const dropdownToggleRef = useRef();
	const menuId = useId();

	const handleCloseMenu = useCallback(
		() => {
			if (onToggleIsOpen) {
				onToggleIsOpen();
			}
		},
		[onToggleIsOpen],
	);

	const context = {
		isOpen,
		handleCloseMenu,
		menuId,
		focusedMenuItem,
		setFocusedMenuItem,
		dropdownToggleRef,
		theme,
		styleOverrides,
	};

	return (
		<DropdownContextProvider value={context}>
			<PopoverManager onFocusAway={handleCloseMenu}>{children}</PopoverManager>
		</DropdownContextProvider>
	);
}

Dropdown.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onToggleIsOpen: PropTypes.func.isRequired,
	children: PropTypes.node.isRequried,
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
