import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import { PopoverReference } from '../popover';
import {
	useDropdownContext,
	useKeyboardActivate,
	useMenuItemKeyboardHandler,
} from './dropdown-utils';
import * as Styled from './styled';

export function DropdownToggle({ children, onToggleMenu, ...buttonProps }) {
	const { isOpen, menuId, setFocusedMenuItem, dropdownToggleRef } = useDropdownContext();
	const handleKeyPress = useKeyboardActivate(onToggleMenu, setFocusedMenuItem);

	const buttonAriaProps = {
		role: 'button',
		'aria-haspopup': 'menu',
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
	onToggleMenu: PropTypes.func.isRequried,
};

export function MenuItem(props) {
	// Proptypes is linting so index does not show up in consumer proptypes
	// eslint-disable-next-line react/prop-types
	const { children, onClick, disabled, index } = props;

	const { handleCloseMenu, focusedMenuItem, setFocusedMenuItem } = useDropdownContext();
	const ref = useRef();
	const selected = focusedMenuItem === index;

	useEffect(
		() => {
			if (selected && ref.current) {
				ref.current.focus();
			}
		},
		[selected],
	);

	const handleClick = useCallback(
		() => {
			if (onClick) {
				onClick();
			}

			handleCloseMenu();
		},
		[onClick, handleCloseMenu],
	);
	// catch keyup event for spacebar in firefox. Opening the menu with spacebar will trigger the first option with the onKeyUp event from the spacebar
	const [handleKeyDown, handleKeyUp] = useMenuItemKeyboardHandler(handleClick);

	const onMouseEnter = useCallback(
		() => {
			setFocusedMenuItem(index);
		},
		[setFocusedMenuItem],
	);

	return (
		<Styled.MenuItem
			ref={ref}
			onClick={handleClick}
			onMouseEnter={onMouseEnter}
			disabled={disabled}
			onKeyDown={handleKeyDown}
			onKeyUp={handleKeyUp}
		>
			{typeof children === 'function' ? children({ selected, disabled }) : children}
		</Styled.MenuItem>
	);
}

MenuItem.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequried,
	disabled: PropTypes.func,
};

MenuItem.isFocusable = true;
