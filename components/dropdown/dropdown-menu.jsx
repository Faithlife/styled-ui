import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Popover } from '../popover-v6';
import { useDropdownContext, useKeyboardNavigate } from './utils';
import { elementOfType } from '../utils';
import {
	MenuItem,
	MenuItemCheckbox,
	MenuItemLink,
	MenuItemSeparator,
	MenuItemIcon,
	MenuItemPrimaryText,
	MenuItemSecondaryText,
	MenuItemTitle,
} from './dropdown-children';
import * as Styled from './styled';

export function DropdownMenu({ children, ...popoverProps }) {
	const {
		menuId,
		isOpen,
		toggleRef,
		registerItem,
		width,
		focusedItemIndex,
		onCloseMenu,
		onKeyboardNav,
	} = useDropdownContext();

	const unregisterItem = useCallback(
		(index, child) => {
			registerItem(index)(null);
			return child;
		},
		[registerItem],
	);

	const onKeyPress = useKeyboardNavigate(onCloseMenu, onKeyboardNav);

	return (
		isOpen && (
			<Popover
				id={menuId}
				as="ul"
				margin={0}
				role="menu"
				reference={toggleRef.current}
				onFocusAway={onCloseMenu}
				placement="bottom-start"
				hideArrow
				width={width || Styled.defaultMenuWidth}
				padding={0}
				onKeyDown={onKeyPress}
				{...popoverProps}
			>
				{React.Children.map(children, (child, index) =>
					React.isValidElement(child) && child.type.isFocusableChild
						? React.cloneElement(child, {
								ref: registerItem(index),
								keyboardFocused: focusedItemIndex === index,
						  })
						: unregisterItem(index, child),
				)}
			</Popover>
		)
	);
}

DropdownMenu.propTypes = {
	children: PropTypes.arrayOf(
		PropTypes.oneOfType([
			elementOfType(MenuItem),
			elementOfType(MenuItemCheckbox),
			elementOfType(MenuItemLink),
			elementOfType(MenuItemSeparator),
			elementOfType(MenuItemIcon),
			elementOfType(MenuItemPrimaryText),
			elementOfType(MenuItemSecondaryText),
			elementOfType(MenuItemTitle),
		]),
	),
	...Popover.propTypes,
};
