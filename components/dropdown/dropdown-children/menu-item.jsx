import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDropdownContext, useMenuItemKeyboardHandler } from '../dropdown-utils';
import * as Styled from '../styled';

export function MenuItem(props) {
	// Proptypes is linting so index does not show up in consumer proptypes
	// eslint-disable-next-line react/prop-types
	const { children, onClick, shouldKeepOpenOnClick, disabled, index, ...ariaProps } = props;

	const { handleCloseMenu, focusedMenuItem, theme, styleOverrides } = useDropdownContext();
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
			<Styled.MenuItemContent isDisabled={disabled} theme={theme} styleOverrides={styleOverrides}>
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
