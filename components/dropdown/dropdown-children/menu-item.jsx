import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDropdownContext, useMenuItemKeyboardHandler } from '../dropdown-utils';
import * as Styled from '../styled';

export function MenuItem(props) {
	// Proptypes is linting so index does not show up in consumer proptypes
	const {
		children,
		onClick,
		onFocus,
		shouldKeepOpenOnClick,
		disabled,
		// eslint-disable-next-line react/prop-types
		isSelected,
		...ariaProps
	} = props;

	const { handleCloseMenu, theme, styleOverrides } = useDropdownContext();
	const ref = useRef();

	useEffect(() => {
		if (isSelected && ref.current) {
			// We need to defer the focus so that we are sure the parent is mounted and added as an inbounds element for the focusAwayHandler
			setTimeout(() => ref.current && ref.current.focus(), 0);
			if (onFocus) {
				onFocus();
			}
		}
	}, [onFocus, isSelected]);

	const handleClick = useCallback(
		e => {
			if (!disabled) {
				if (onClick) {
					onClick(e);
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
				{typeof children === 'function' ? children({ selected: isSelected, disabled }) : children}
			</Styled.MenuItemContent>
		</Styled.MenuItem>
	);
}

MenuItem.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	onClick: PropTypes.func.isRequired,
	onFocus: PropTypes.func,
	disabled: PropTypes.bool,
	shouldKeepOpenOnClick: PropTypes.bool,
};

MenuItem.isFocusableMenuChild = true;
