import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropdownContext, useKeyboardActivate } from './dropdown-utils';
import { DropdownToggleCore } from './dropdown-toggle-core';

/** Accepts all props a Button component would as well. */
export function DropdownToggle(props) {
	// DropdownToggle will pass all props that a Button component will want if it is not using render props
	const { children, ...buttonProps } = props;
	const { isOpen, menuId, setFocusedMenuItem, onToggleMenu } = useDropdownContext();
	const handleKeyPress = useKeyboardActivate(onToggleMenu, setFocusedMenuItem);

	const toggleAriaProps = {
		role: 'button',
		'aria-haspopup': true,
		'aria-controls': `dropdown:${menuId}`,
		'aria-label': `dropdown:${menuId}`,
		'aria-expanded': isOpen,
	};

	const handleToggleMenu = useCallback(
		event => {
			setFocusedMenuItem(null);
			onToggleMenu(event);
		},
		[setFocusedMenuItem, onToggleMenu],
	);

	return (
		<DropdownToggleCore
			buttonProps={buttonProps}
			onKeyPress={handleKeyPress}
			onToggleMenu={handleToggleMenu}
			ariaProps={toggleAriaProps}
		>
			{children}
		</DropdownToggleCore>
	);
}

DropdownToggle.propTypes = {
	/** The content of the toggle button, usually a span */
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};
