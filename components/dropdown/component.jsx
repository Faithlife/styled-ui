import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { PopoverManager } from '../popover';
import { DropdownContext } from './dropdown-helpers';

export function Dropdown({ isOpen, onCloseCallback, children }) {
	const handleCloseMenu = useCallback(
		() => {
			if (onCloseCallback) {
				onCloseCallback();
			}
		},
		[onCloseCallback],
	);

	return (
		<DropdownContext.Provider value={{ isOpen, handleCloseMenu }}>
			<PopoverManager onFocusAway={handleCloseMenu}>{children}</PopoverManager>
		</DropdownContext.Provider>
	);
}

Dropdown.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onCloseCallback: PropTypes.func.isRequired,
	children: PropTypes.node.isRequried,
};
