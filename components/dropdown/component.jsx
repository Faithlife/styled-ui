import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../shared-hooks';
import { PopoverManager } from '../popover';
import { DropdownContextProvider } from './dropdown-utils';

export function Dropdown({ isOpen, onToggleIsOpen, children }) {
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
};
