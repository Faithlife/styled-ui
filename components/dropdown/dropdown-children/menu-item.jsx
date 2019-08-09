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
		display,
		flexDirection,
		alignItems,
		whiteSpace,
		color,
		textAlign,
		background,
		hoverBackgroundColor,
		textStyle,
		focusOutline,
		focusBorder,
		padding,
		paddingY,
		paddingX,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
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
				display={display || 'flex'}
				flexDirection={flexDirection || 'flexDirection'}
				alignItems={alignItems || 'center'}
				color={color || (disabled && 'gray22')}
				whiteSpace={whiteSpace || 'nowrap'}
				textAlign={textAlign || 'left'}
				background={background || 'transparent'}
				hoverBackgroundColor={hoverBackgroundColor || 'gray4'}
				textStyle={textStyle || 'c.16'}
				focusOutline={isDefined(focusOutline) ? focusOutline : 'none'}
				focusBorder={isDefined(focusBorder) ? focusBorder : '0'}
				padding={isDefined(padding) ? padding : 3}
				paddingY={isDefined(paddingY) ? paddingY : isDefined(padding) ? padding : ''}
				paddingX={isDefined(paddingX) ? paddingX : isDefined(padding) ? padding : ''}
				paddingTop={
					isDefined(paddingTop)
						? paddingTop
						: isDefined(paddingY)
						? paddingY
						: isDefined(padding)
						? padding
						: ''
				}
				paddingRight={
					isDefined(paddingRight)
						? paddingRight
						: isDefined(paddingX)
						? paddingX
						: isDefined(padding)
						? padding
						: ''
				}
				paddingBottom={
					isDefined(paddingBottom)
						? paddingBottom
						: isDefined(paddingY)
						? paddingY
						: isDefined(padding)
						? padding
						: ''
				}
				paddingLeft={
					isDefined(paddingLeft)
						? paddingLeft
						: isDefined(paddingX)
						? paddingX
						: isDefined(padding)
						? padding
						: ''
				}
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

const isDefined = function(value) {
	return value !== undefined && value !== null;
};
