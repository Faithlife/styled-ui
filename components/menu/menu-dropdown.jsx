import React, { useCallback } from 'react';
import { Popover } from '../popover';
import { useDropdownContext, useKeyboardNavigate } from './utils';
import * as Styled from './styled';

export function MenuDropdown({ children, ...popoverProps }) {
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
					React.isValidElement(child) && child.type && child.type.isFocusableChild
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
