import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Popover } from '../popover';
import { useDropdownContext, getFocusableChildrenList, useKeyboardNav } from './dropdown-utils';
import * as Styled from './styled';

export function DropdownMenu(props) {
	const { children, ...popoverProps } = props;
	const {
		isOpen,
		menuId,
		focusedMenuItem,
		setFocusedMenuItem,
		handleCloseMenu,
		dropdownToggleRef,
		styleOverrides,
	} = useDropdownContext();

	const closeMenu = useCallback(
		() => {
			if (dropdownToggleRef.current) {
				dropdownToggleRef.current.focus();
			}

			handleCloseMenu();
		},
		[handleCloseMenu],
	);

	const focusableChildList = getFocusableChildrenList(children);
	const handleKeyboardNav = useKeyboardNav(
		focusedMenuItem,
		setFocusedMenuItem,
		closeMenu,
		focusableChildList,
	);

	useEffect(
		() => {
			if (focusedMenuItem === 'last') {
				setFocusedMenuItem(focusableChildList[focusableChildList.length - 1]);
			} else if (focusedMenuItem === 'first') {
				setFocusedMenuItem(focusableChildList[0]);
			}
		},
		[focusedMenuItem, focusableChildList],
	);

	return (
		<Styled.DropdownMenu id={menuId}>
			<Popover
				isOpen={isOpen}
				placement={'bottom-start' || popoverProps.placement}
				hideArrow
				styleOverrides={{ padding: '0', width: styleOverrides.width || '160px' }}
				{...popoverProps}
			>
				<Styled.DropdownMenuContent onKeyDown={handleKeyboardNav}>
					{React.Children.map(children, (child, index) => React.cloneElement(child, { index }))}
				</Styled.DropdownMenuContent>
			</Popover>
		</Styled.DropdownMenu>
	);
}

DropdownMenu.propTypes = {
	children: PropTypes.node.isRequired,
};
