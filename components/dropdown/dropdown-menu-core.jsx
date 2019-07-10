import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Popover } from '../popover';
import { useDropdownContext, getFocusableChildrenList, useKeyboardNav } from './dropdown-utils';
import * as Styled from './styled';

export function DropdownMenuCore({ children, popoverProps, ariaProps }) {
	const {
		isOpen,
		menuId,
		focusedMenuItem,
		setFocusedMenuItem,
		handleCloseMenu,
		dropdownToggleRef,
		styleOverrides,
	} = useDropdownContext();

	const closeMenu = useCallback(() => {
		if (dropdownToggleRef.current) {
			dropdownToggleRef.current.focus();
		}

		handleCloseMenu();
	}, [dropdownToggleRef, handleCloseMenu]);

	const focusableChildList = getFocusableChildrenList(children);
	const handleKeyboardNav = useKeyboardNav(
		focusedMenuItem,
		setFocusedMenuItem,
		closeMenu,
		focusableChildList,
	);

	const focusedIndex = focusableChildList.indexOf(focusedMenuItem);

	useEffect(() => {
		if (focusedMenuItem === 'last') {
			setFocusedMenuItem(focusableChildList[focusableChildList.length - 1]);
		} else if (focusedMenuItem === 'first') {
			setFocusedMenuItem(focusableChildList[0]);
		}
	}, [focusedMenuItem, focusedIndex, focusableChildList, setFocusedMenuItem]);

	return (
		<div id={menuId} {...ariaProps}>
			<Popover
				isOpen={isOpen}
				placement={'bottom-start' || popoverProps.placement}
				hideArrow
				styleOverrides={{ padding: '0', width: styleOverrides.width || '160px' }}
				{...popoverProps}
			>
				<Styled.DropdownMenuContent onKeyDown={handleKeyboardNav}>
					{React.Children.map(children, (child, index) =>
						React.isValidElement(child) ? React.cloneElement(child, { index }) : null,
					)}
				</Styled.DropdownMenuContent>
			</Popover>
		</div>
	);
}

DropdownMenuCore.propTypes = {
	children: PropTypes.node.isRequired,
	popoverProps: PropTypes.object,
	ariaProps: PropTypes.object,
};
