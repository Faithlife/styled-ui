import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { system, flexbox } from 'styled-system';
import { Text } from '../../Text';
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

	const { handleCloseMenu } = useDropdownContext();
	const ref = useRef();

	useEffect(() => {
		if (isSelected && ref.current) {
			// We need to defer the focus so that we are sure the parent is mounted and added as an inbounds element for the focusAwayHandler
			setTimeout(() => ref.current.focus(), 0);
			if (onFocus) {
				onFocus();
			}
		}
	}, [onFocus, isSelected]);

	const handleClick = useCallback(() => {
		if (!disabled) {
			if (onClick) {
				onClick();
			}

			if (!shouldKeepOpenOnClick) {
				handleCloseMenu();
			}
		}
	}, [onClick, handleCloseMenu, shouldKeepOpenOnClick, disabled]);
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
			<MenuItemContent
				display="flex"
				alignItems="center"
				color={disabled && 'gray22'}
				whiteSpace="nowrap"
				background="transparent"
				hoverBackgroundColor="gray4"
				textStyle="c.16"
				focusOutline="none"
				focusBorder="0"
				padding={3}
				{...ariaProps}
			>
				{typeof children === 'function' ? children({ selected: isSelected, disabled }) : children}
			</MenuItemContent>
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

const MenuItemContent = styled(Text).attrs({ tabIndex: '-1' })`
	${flexbox};

	&:focus {
		${system({ focusOutline: { property: 'outline' } })};
		${system({ focusBorder: { property: 'border', scale: 'borders' } })};
	}

	&:hover {
		${system({ hoverBackgroundColor: { property: 'background-color', scale: 'colors' } })};
	}
`;
