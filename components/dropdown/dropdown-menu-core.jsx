import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
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
		padding,
		paddingY,
		paddingX,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		width,
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
		<Box id={menuId} {...ariaProps}>
			<Popover
				isOpen={isOpen}
				placement={'bottom-start' || popoverProps.placement}
				hideArrow
				padding={isDefined(padding) ? padding : 0}
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
				width={isDefined(width) ? width : '160px'}
				{...popoverProps}
			>
				<Styled.DropdownMenuContent onKeyDown={handleKeyboardNav}>
					{React.Children.map(children, (child, index) =>
						React.isValidElement(child)
							? React.cloneElement(child, {
									isSelected: index === focusedMenuItem,
							  })
							: null,
					)}
				</Styled.DropdownMenuContent>
			</Popover>
		</Box>
	);
}

DropdownMenuCore.propTypes = {
	children: PropTypes.node.isRequired,
	popoverProps: PropTypes.object,
	ariaProps: PropTypes.object,
};

const isDefined = function(value) {
	return value !== undefined && value !== null;
};
