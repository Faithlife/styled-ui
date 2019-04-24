import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import { CheckboxCore } from '../check-box';
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
	const { children, onClick, shouldKeepOpenOnClick, disabled, index, ...ariaProps } = props;

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
			if (!disabled) {
				if (onClick) {
					onClick();
				}

				if (!shouldKeepOpenOnClick) {
					handleCloseMenu();
				}
			}
		},
		[onClick, handleCloseMenu, shouldKeepOpenOnClick, disabled],
	);
	// catch keyup event for spacebar in firefox. Opening the menu with spacebar will trigger the first option with the onKeyUp event from the spacebar
	const [handleKeyDown, handleKeyUp] = useMenuItemKeyboardHandler(handleClick);

	return (
		<Styled.MenuItem
			ref={ref}
			onKeyDown={handleKeyDown}
			onKeyUp={handleKeyUp}
			isDisabled={disabled}
			onClick={handleClick}
			{...ariaProps}
			// `Disabled menu items are focusable but cannot be activated.` https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton
			{...(!disabled ? {} : { as: 'div' })}
		>
			<Styled.MenuItemContent isDisabled={disabled}>
				{typeof children === 'function' ? children({ selected, disabled }) : children}
			</Styled.MenuItemContent>
		</Styled.MenuItem>
	);
}

MenuItem.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	shouldKeepOpenOnClick: PropTypes.bool,
};

MenuItem.isFocusableMenuChild = true;

export const MenuSeparator = Styled.MenuSeparator;
MenuSeparator.propTypes = {};

export function MenuCheckbox(props) {
	// Proptypes is linting so index does not show up in consumer proptypes
	// eslint-disable-next-line react/prop-types
	const { onClick, disabled, index, isChecked, ...checkboxProps } = props;

	return (
		<MenuItem
			shouldKeepOpenOnClick
			onClick={onClick}
			disabled={disabled}
			index={index}
			role="menuitemcheckbox"
			aria-checked={isChecked}
		>
			<CheckboxCore isChecked={isChecked} {...checkboxProps} />
		</MenuItem>
	);
}

MenuCheckbox.propTypes = {
	isChecked: PropTypes.bool.isRequried,
};

MenuCheckbox.isFocusableMenuChild = true;
