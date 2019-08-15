import React, { useCallback, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../shared-hooks';
import { PopoverManager } from '../popover';
import { DropdownContextProvider } from './dropdown-utils';

export function DropdownCore({ isOpen, onToggleMenu, children, additionalContext }) {
	const [focusedMenuItem, setFocusedMenuItem] = useState(null);
	const dropdownToggleRef = useRef();
	const menuId = useId();

	const handleCloseMenu = useCallback(() => {
		if (onToggleMenu && isOpen) {
			onToggleMenu();
		}
	}, [onToggleMenu, isOpen]);

	const context = useMemo(
		() => ({
			isOpen,
			handleCloseMenu,
			menuId: `menu:${menuId}`,
			focusedMenuItem,
			setFocusedMenuItem,
			dropdownToggleRef,
			onToggleMenu,
			...additionalContext,
		}),
		[
			isOpen,
			handleCloseMenu,
			menuId,
			focusedMenuItem,
			setFocusedMenuItem,
			dropdownToggleRef,
			onToggleMenu,
			additionalContext,
		],
	);

	return (
		<DropdownContextProvider value={context}>
			<PopoverManager onFocusAway={handleCloseMenu}>{children}</PopoverManager>
		</DropdownContextProvider>
	);
}

DropdownCore.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onToggleMenu: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	/** Additional context to include in the dropdown context */
	additionalContext: PropTypes.object,
};

DropdownCore.defaultProps = {
	additionalContext: {},
};
