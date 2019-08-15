import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Popover } from '../popover';
import { useDropdownContext, getFocusableChildrenList, useKeyboardNav } from './dropdown-utils';

export function DropdownMenuCore({ children, popoverProps, ariaProps }) {
	const {
		isOpen,
		menuId,
		focusedMenuItem,
		setFocusedMenuItem,
		handleCloseMenu,
		dropdownToggleRef,
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
				padding={0}
				width="160px"
				{...popoverProps}
			>
				<Box
					onKeyDown={handleKeyboardNav}
					display="flex"
					flexDirection="column"
					width="100%"
					paddingY={2}
				>
					{React.Children.map(children, (child, index) =>
						React.isValidElement(child)
							? React.cloneElement(child, {
									isSelected: index === focusedMenuItem,
							  })
							: null,
					)}
				</Box>
			</Popover>
		</Box>
	);
}

DropdownMenuCore.propTypes = {
	children: PropTypes.node.isRequired,
	popoverProps: PropTypes.object,
	ariaProps: PropTypes.object,
};
