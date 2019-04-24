import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import { PopoverReference } from '../popover';
import { useDropdownContext, useKeyboardActivate } from './dropdown-utils';

/** Accepts all props a Button component would as well. */
export function DropdownToggle({ children, onToggleMenu, ...buttonProps }) {
	const { isOpen, menuId, setFocusedMenuItem, dropdownToggleRef } = useDropdownContext();
	const handleKeyPress = useKeyboardActivate(onToggleMenu, setFocusedMenuItem);

	const buttonAriaProps = {
		role: 'button',
		'aria-haspopup': true,
		'aria-controls': `dropdown:${menuId}`,
		'aria-label': `dropdown:${menuId}`,
		// do not specify aria-expanded unless it is expanded
		...(isOpen ? { 'aria-expanded': true } : {}),
	};

	return (
		<PopoverReference>
			<Button
				ref={dropdownToggleRef}
				onClick={onToggleMenu}
				onKeyDown={handleKeyPress}
				{...buttonAriaProps}
				{...buttonProps}
			>
				{children}
			</Button>
		</PopoverReference>
	);
}

DropdownToggle.propTypes = {
	/** The content of the toggle button, usually a span */
	children: PropTypes.node.isRequired,
	/** Toggle the isOpen prop when called */
	onToggleMenu: PropTypes.func.isRequired,
};
