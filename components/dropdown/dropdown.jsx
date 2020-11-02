import React, { useContext, useRef, useState, useMemo, useCallback } from 'react';
import { useId } from '../shared-hooks';
import { Button, UtilityButton } from '../button';
import { Popover } from '../popover-v6';
import { Box } from '../Box';
import { ChevronDown } from '../icons/12px';
import { DefaultThemeProvider } from '../DefaultThemeProvider';

import styled, { css } from 'styled-components';

const DropdownContext = React.createContext();

function useDropdownContext() {
	const context = useContext(DropdownContext);

	return context;
}

export function Dropdown({ isOpen, onToggleMenu, children, width }) {
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
		<DefaultThemeProvider>
			<DropdownContext.Provider
				value={{
					isOpen,
					focusedItem,
					onToggleMenu,
					registerItem,
					menuId: `dropdownMenu-${menuId}`,
					toggleRef,
					width,
				}}
			>
				{children}
			</DropdownContext.Provider>
		</DefaultThemeProvider>
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
		<Button size="small" variant="primary" {...childProps} {...buttonProps}>
			{children}
			{!hideCarrot && <Styled.DropdownCarrot />}
		</Button>
	);
}

function DropdownMenu({ children, ...popoverProps }) {
	const { onToggleMenu, menuId, isOpen, toggleRef, registerItem, width } = useDropdownContext();

	return (
		isOpen && (
			<Popover
				id={menuId}
				as="ul"
				margin={0}
				role="menu"
				reference={toggleRef.current}
				onFocusAway={onToggleMenu}
				placement="bottom-start"
				hideArrow
				width={width || Styled.defaultMenuWidth}
				padding={0}
				{...popoverProps}
			>
				{React.Children.map(children, (child, index) =>
					React.isValidElement(child) && child.type.isFocusableChild
						? React.cloneElement(child, { ref: registerItem({ index }) })
						: child,
				)}
			</Popover>
		)
	);
}

function MenuItem({ children, ...boxProps }) {
	return (
		<Styled.MenuItem
			as="li"
			role="menuitem"
			height="40px"
			paddingX={4}
			paddingY="10px"
			color="dropdown.foreground"
			backgroundColor="dropdown.background"
			{...boxProps}
		>
			{children}
		</Styled.MenuItem>
	);
}

MenuItem.isFocusableChild = true;

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = MenuItem;

const DropdownCarrot = styled(ChevronDown).attrs({ color: 'currentColor' })``;

const CarrotContainer = styled(Box).attrs({ marginLeft: 3, color: 'inherit' })``;

const Styled = {};
Styled.DropdownCarrot = () => (
	<CarrotContainer>
		<DropdownCarrot />
	</CarrotContainer>
);
Styled.defaultMenuWidth = '160px';
Styled.MenuItem = styled(UtilityButton)`
	box-sizing: border-box;

	${({ theme }) => css`
		&:hover {
			background-color: ${theme.colors.dropdown.backgroundHover};
		}

		&:disabled {
			cursor: default;

			color: ${theme.colors.dropdown.foregroundDisabled};
		}
	`}
`;
