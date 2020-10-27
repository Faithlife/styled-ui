import React, { useContext, useRef, useState, useMemo, useCallback } from 'react';
import { useId } from '../shared-hooks';
import { Button } from '../button';
import { Popover } from '../popover-v6';
import { Box } from '../Box';
import { ChevronDown } from '../icons/12px';

import styled from 'styled-components';

const DropdownContext = React.createContext();

function useDropdownContext() {
	const context = useContext(DropdownContext);

	return context;
}

export function Dropdown({ isOpen, onToggleMenu, children }) {
	const itemList = useRef([]);
	const [focusedItem, setFocusedItem] = useState(null);

	const menuId = useId();
	const toggleRef = useRef();

	const registerItem = useCallback(({ index }) => {
		return ref => {
			let newList = [...itemList.current];
			if (itemList.current.length < index) {
				newList = newList.slice(0, index);
			}
			newList[index] = ref;

			itemList.current = newList;
		};
	}, []);

	return (
		<DropdownContext.Provider
			value={{
				isOpen,
				focusedItem,
				onToggleMenu,
				registerItem,
				menuId: `dropdownMenu-${menuId}`,
				toggleRef,
			}}
		>
			{children}
		</DropdownContext.Provider>
	);
}

function DropdownToggle({ hideCarrot, children, ...buttonProps }) {
	const { onToggleMenu, menuId, isOpen, toggleRef } = useDropdownContext();

	const childProps = useMemo(
		() => ({
			ref: toggleRef,
			// onKeyDown: onKeyPress,
			onClick: onToggleMenu,
			ariaProps: {
				'aria-haspopup': true,
				'aria-controls': menuId,
				'aria-expanded': isOpen,
			},
		}),
		[toggleRef, onToggleMenu, menuId, isOpen],
	);

	return typeof children === 'function' ? (
		children(childProps)
	) : (
		<Button size="small" variant="minorTransparent" {...childProps} {...buttonProps}>
			{children}
			{!hideCarrot && <DropdownCarrot />}
		</Button>
	);
}

function DropdownMenu({ children, ...popoverProps }) {
	const { onToggleMenu, menuId, isOpen, toggleRef } = useDropdownContext();

	return (
		isOpen && (
			<Popover
				id={menuId}
				as="ul"
				role="menu"
				reference={toggleRef}
				onFocusAway={onToggleMenu}
				placement="bottom"
				{...popoverProps}
			>
				{children}
			</Popover>
		)
	);
}

function MenuItem({ children, ...boxProps }) {
	return (
		<Styled.MenuItem as="li" role="menuitem" {...boxProps}>
			{children}
		</Styled.MenuItem>
	);
}

MenuItem.isFocusableChild = true;

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = MenuItem;

const DropdownCarrot = styled(ChevronDown).attrs({ color: 'inherit' })`
	margin-left: ${({ theme }) => theme.space[3]};
`;

const Styled = {};
Styled.MenuItem = styled(Box)``;
