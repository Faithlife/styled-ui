import React, { useContext, useRef, useState, useMemo, useEffect, useCallback } from 'react';
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

const itemNavigation = {
	first: 'first',
	last: 'last',
	next: 'next',
	prev: 'prev',
};

export function Dropdown({ isOpen, onToggleMenu, children, width }) {
	const itemList = useRef([]);
	const [focusedItemIndex, setFocusedItemIndex] = useState(null);

	const menuId = useId();
	const toggleRef = useRef();

	useEffect(() => {
		if (!isOpen) {
			setFocusedItemIndex(null);
		}
	}, [isOpen]);

	useEffect(() => {
		if (focusedItemIndex) {
			itemList.current[focusedItemIndex]?.focus();
		}
	}, [focusedItemIndex]);

	const onCloseMenu = useCallback(() => {
		if (isOpen) {
			onToggleMenu();
			toggleRef.current?.focus();
		}
	}, [isOpen, onToggleMenu]);

	const registerItem = useCallback(index => {
		return ref => {
			let newList = [...itemList.current];
			if (itemList.current.length < index) {
				newList = newList.slice(0, index);
			}
			newList[index] = ref;

			itemList.current = newList;
		};
	}, []);

	const onKeyboardNav = useCallback(
		nav => {
			setTimeout(() => {
				const itemIndexes = itemList.current
					.map((item, index) => (item !== null ? index : null))
					.filter(x => x !== null);
				console.log(itemList.current, itemIndexes);
				const currentIndex = focusedItemIndex && itemIndexes.findIndex(x => x === focusedItemIndex);

				switch (nav) {
					case itemNavigation.first: {
						setFocusedItemIndex(itemIndexes[0]);
						break;
					}
					case itemNavigation.last: {
						setFocusedItemIndex(itemIndexes[itemIndexes.length - 1]);
						break;
					}
					case itemNavigation.next: {
						const nextIndex = currentIndex === itemIndexes.length - 1 ? 0 : currentIndex + 1;
						setFocusedItemIndex(itemIndexes[nextIndex]);
						break;
					}
					case itemNavigation.prev: {
						const nextIndex = currentIndex === 0 ? itemIndexes.length - 1 : currentIndex - 1;
						setFocusedItemIndex(itemIndexes[nextIndex]);
						break;
					}
				}
			}, 0);
		},
		[focusedItemIndex],
	);

	return (
		<DefaultThemeProvider>
			<DropdownContext.Provider
				value={{
					isOpen,
					onToggleMenu,
					registerItem,
					menuId: `dropdownMenu-${menuId}`,
					toggleRef,
					width,
					onKeyboardNav,
					focusedItemIndex,
					onCloseMenu,
				}}
			>
				{children}
			</DropdownContext.Provider>
		</DefaultThemeProvider>
	);
}

function DropdownToggle({ hideCarrot, children, ...buttonProps }) {
	const { onToggleMenu, menuId, isOpen, toggleRef, onKeyboardNav } = useDropdownContext();

	const onKeyPress = useKeyboardActivate(onToggleMenu, onKeyboardNav);

	const childProps = useMemo(
		() => ({
			ref: toggleRef,
			onKeyDown: onKeyPress,
			onClick: onToggleMenu,
			ariaProps: {
				'aria-haspopup': true,
				'aria-controls': menuId,
				'aria-expanded': isOpen,
			},
		}),
		[toggleRef, onToggleMenu, menuId, isOpen, onKeyPress],
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

const handledKeys = {
	enter: 'Enter',
	spaceBar: ' ',
	arrowDown: 'ArrowDown',
	arrowUp: 'ArrowUp',
	escape: 'Escape',
	home: 'Home',
	end: 'End',
};

export function useKeyboardActivate(onToggleMenu, onKeyboardNav) {
	const handleKeyboardActivate = useCallback(
		event => {
			switch (event.key) {
				case handledKeys.enter:
				case handledKeys.spaceBar:
				case handledKeys.arrowDown: {
					event.preventDefault();
					onToggleMenu();
					onKeyboardNav(itemNavigation.first);
					break;
				}
				case handledKeys.arrowUp: {
					event.preventDefault();
					// Should select the last menuItem
					onToggleMenu();
					onKeyboardNav(itemNavigation.last);
					break;
				}
				default:
					return;
			}
		},
		[onToggleMenu, onKeyboardNav],
	);

	return handleKeyboardActivate;
}

function DropdownMenu({ children, ...popoverProps }) {
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
								keyboardHovered: focusedItemIndex === index,
						  })
						: unregisterItem(index, child),
				)}
			</Popover>
		)
	);
}

function useKeyboardNavigate(onCloseMenu, onKeyboardNav) {
	const handleKeyboardNavigate = useCallback(
		event => {
			switch (event.key) {
				case handledKeys.escape: {
					event.preventDefault();
					onCloseMenu();
					break;
				}
				case handledKeys.arrowUp: {
					event.preventDefault();
					onKeyboardNav(itemNavigation.prev);
					break;
				}
				case handledKeys.arrowDown: {
					event.preventDefault();
					onKeyboardNav(itemNavigation.next);
					break;
				}
				case handledKeys.home: {
					event.preventDefault();
					onKeyboardNav(itemNavigation.first);
					break;
				}
				case handledKeys.end: {
					event.preventDefault();
					onKeyboardNav(itemNavigation.last);
					break;
				}
				default:
					return;
			}
		},
		[onCloseMenu, onKeyboardNav],
	);

	return handleKeyboardNavigate;
}

const MenuItem = React.forwardRef(function MenuItem(
	{ children, keyboardHovered, onClick, ...boxProps },
	ref,
) {
	const { onCloseMenu } = useDropdownContext();

	const handleClick = useCallback(
		event => {
			onClick(event);
			onCloseMenu();
		},
		[onClick, onCloseMenu],
	);

	const handleKeyPress = useCallback(
		event => {
			if (event.key === handledKeys.enter) {
				event.preventDefault();
				onClick();
				onCloseMenu();
			}
		},
		[onClick, onCloseMenu],
	);

	return (
		<Styled.MenuItem
			ref={ref}
			as="li"
			role="menuitem"
			height="40px"
			paddingX={4}
			paddingY="10px"
			color="dropdown.foreground"
			backgroundColor={keyboardHovered ? 'dropdown.backgroundHover' : 'dropdown.background'}
			tabIndex={-1}
			onClick={handleClick}
			onKeyDown={handleKeyPress}
			{...boxProps}
		>
			{children}
		</Styled.MenuItem>
	);
});

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
	box-shadow: none;

	${({ theme }) => css`
		&:hover {
			background-color: ${theme.colors.dropdown.backgroundHover};
		}

		&:focus {
			outline: none;
			box-shadow: none;
			border: 0;
		}

		&.focus-visible {
			outline: none;
			box-shadow: none;
			border: 0;

			&:not(:active) {
				box-shadow: none;
			}
		}

		&:disabled {
			cursor: default;

			color: ${theme.colors.dropdown.foregroundDisabled};
		}
	`}
`;
