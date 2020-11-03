import React, { useContext, useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { useId } from '../shared-hooks';
import { getConfigChild } from '../utils';
import { Button, UtilityButton, SegmentedButtonGroup } from '../button';
import { Popover } from '../popover-v6';
import { Box } from '../Box';
import { Text } from '../Text';
import { ChevronDown } from '../icons/12px';
import { DefaultThemeProvider } from '../DefaultThemeProvider';
import { CheckboxContent } from '../check-box';

import styled, { css } from 'styled-components';
import { variant as createVariant } from 'styled-system';

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
	const splitRef = useRef();

	useEffect(() => {
		if (!isOpen) {
			setFocusedItemIndex(null);
		}
	}, [isOpen]);

	useEffect(() => {
		if (focusedItemIndex !== null) {
			itemList.current[focusedItemIndex]?.focus();
		}
	}, [focusedItemIndex]);

	const onCloseMenu = useCallback(() => {
		if (isOpen) {
			onToggleMenu();
			splitRef.current ? splitRef.current.focus() : toggleRef.current?.focus();
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
					splitRef,
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

function DropdownActionButton({
	defaultSize,
	defaultVariant,
	defaultDisabled,
	children,
	...buttonProps
}) {
	return (
		<Button size={defaultSize} variant={defaultVariant} disabled={defaultDisabled} {...buttonProps}>
			{children}
		</Button>
	);
}
DropdownActionButton.childConfigComponent = 'DropdownActionButton';

function DropdownToggle({ hideCarrot, size, variant, disabled, children, ...buttonProps }) {
	const { onToggleMenu, menuId, isOpen, toggleRef, splitRef, onKeyboardNav } = useDropdownContext();

	const onKeyPress = useKeyboardActivate(onToggleMenu, onKeyboardNav);

	const childProps = useMemo(
		() => ({
			onKeyDown: onKeyPress,
			onClick: onToggleMenu,
			ariaProps: {
				'aria-haspopup': true,
				'aria-controls': menuId,
				'aria-expanded': isOpen,
			},
		}),
		[onToggleMenu, menuId, isOpen, onKeyPress],
	);

	if (typeof children === 'function') {
		return children(toggleRef, childProps);
	}

	const [actionChild] = getConfigChild(children, DropdownActionButton.childConfigComponent);
	return actionChild ? (
		<SegmentedButtonGroup ref={toggleRef} border={0}>
			{React.cloneElement(actionChild, {
				defaultSize: size,
				defaultVariant: variant,
				defaultDisabled: disabled,
			})}
			<Button
				ref={splitRef}
				size={size}
				variant={variant}
				disabled={disabled}
				border={0}
				borderLeft={1}
				borderColor="blue5"
				{...childProps}
				{...childProps.ariaProps}
				{...buttonProps}
			>
				<Styled.DropdownCarrot hideMargin />
			</Button>
		</SegmentedButtonGroup>
	) : (
		<Button
			ref={toggleRef}
			size={size}
			variant={variant}
			disabled={disabled}
			{...childProps}
			{...childProps.ariaProps}
			{...buttonProps}
		>
			{children}
			{!hideCarrot && <Styled.DropdownCarrot />}
		</Button>
	);
}

DropdownToggle.defaultProps = {
	size: 'small',
	variant: 'primary',
};

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

function MenuItemIcon({ src, variant, children, ...iconProps }) {
	return (
		<Styled.MenuItemIcon variant={variant}>
			{src ? (
				<Box as="img" src={src} borderRadius={1} width="60px" height="40px" {...iconProps} />
			) : (
				children
			)}
		</Styled.MenuItemIcon>
	);
}
MenuItemIcon.defaultProps = {
	variant: 'icon',
};
MenuItemIcon.childConfigComponent = 'MenuItemIcon';

function MenuItemPrimaryText({ hasSecondaryText, children, ...textProps }) {
	return (
		<Text
			textStyle="ui.16"
			color="inherit"
			fontWeight={hasSecondaryText ? 1 : 0}
			marginBottom={hasSecondaryText ? 2 : 0}
			{...textProps}
		>
			{children}
		</Text>
	);
}
MenuItemPrimaryText.childConfigComponent = 'MenuItemPrimaryText';

function MenuItemSecondaryText({ children, ...textProps }) {
	return (
		<Text textStyle="ui.14" color="gray52" {...textProps}>
			{children}
		</Text>
	);
}
MenuItemSecondaryText.childConfigComponent = 'MenuItemSecondaryText';

function MenuItemCheckboxComponent(checkboxProps) {
	return <CheckboxContent position="relative" marginRight={3} {...checkboxProps} />;
}
MenuItemCheckboxComponent.childConfigComponent = 'MenuItemCheckboxComponent';

const MenuItem = React.forwardRef(function MenuItem(
	{ keyboardHovered, onClick, children, preventDefaultOnClick, ...boxProps },
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

	const [icon, iconFilteredChildren] = getConfigChild(children, MenuItemIcon.childConfigComponent);
	const [primaryText, primaryFilteredChildren] = getConfigChild(
		iconFilteredChildren,
		MenuItemPrimaryText.childConfigComponent,
	);
	const [secondaryText, secondaryFilteredChildren] = getConfigChild(
		primaryFilteredChildren,
		MenuItemSecondaryText.childConfigComponent,
	);
	const [checkbox, filteredChildren] = getConfigChild(
		secondaryFilteredChildren,
		MenuItemCheckboxComponent.childConfigComponent,
	);
	return (
		<Styled.MenuItem
			ref={ref}
			as="li"
			role="menuitem"
			minHeight="40px"
			paddingX={4}
			paddingY={icon ? 2 : '10px'}
			color="dropdown.foreground"
			backgroundColor={keyboardHovered ? 'dropdown.backgroundHover' : 'dropdown.background'}
			tabIndex={-1}
			onClick={!preventDefaultOnClick ? handleClick : onClick}
			onKeyDown={handleKeyPress}
			display="flex"
			flexDirection="row"
			alignItems="center"
			{...boxProps}
		>
			{checkbox}
			{icon}
			<Styled.MenuItemTextContainer>
				{primaryText
					? React.cloneElement(primaryText, { hasSecondaryText: !!secondaryText })
					: null}
				{secondaryText}
				{filteredChildren}
			</Styled.MenuItemTextContainer>
		</Styled.MenuItem>
	);
});

MenuItem.isFocusableChild = true;

const MenuItemCheckbox = React.forwardRef(function MenuItemCheckbox(
	{ isChecked, onToggle, children, ...menuItemProps },
	ref,
) {
	const handleKeyPress = useCallback(
		event => {
			if (event.key === handledKeys.enter) {
				event.preventDefault();
				onToggle();
			}
		},
		[onToggle],
	);
	return (
		<MenuItem
			ref={ref}
			role="menuitemcheckbox"
			aria-checked={isChecked}
			onClick={onToggle}
			onKeyDown={handleKeyPress}
			preventDefaultOnClick
			{...menuItemProps}
		>
			<MenuItemCheckboxComponent isChecked={isChecked} />
			{children}
		</MenuItem>
	);
});

MenuItemCheckbox.isFocusableChild = true;

const MenuItemLink = React.forwardRef(function MenuItemLink({ children, ...menuItemProps }, ref) {
	return (
		<Box as="li" role="none">
			<MenuItem
				as="a"
				ref={ref}
				onClick={null}
				onKeyDown={null}
				rel="noopener noreferrer"
				preventDefaultOnClick
				{...menuItemProps}
			>
				{children}
			</MenuItem>
		</Box>
	);
});

MenuItemLink.isFocusableChild = true;

function MenuItemSeparator(hrProps) {
	return (
		<Box
			as="hr"
			role="separator"
			aria-orientation="horizontal"
			width="100%"
			border={0}
			borderTop={1}
			borderColor="dropdown.separator"
			margin={0}
			{...hrProps}
		/>
	);
}

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = MenuItem;
Dropdown.CheckboxItem = MenuItemCheckbox;
Dropdown.LinkItem = MenuItemLink;
Dropdown.Separator = MenuItemSeparator;
Dropdown.ActionButton = DropdownActionButton;
Dropdown.ItemIcon = MenuItemIcon;
Dropdown.ItemPrimaryText = MenuItemPrimaryText;
Dropdown.ItemSecondaryText = MenuItemSecondaryText;

const DropdownCarrot = styled(ChevronDown).attrs({ color: 'currentColor' })``;

const CarrotContainer = styled(Box).attrs(({ hideMargin }) => ({
	marginLeft: !hideMargin ? 3 : 0,
	color: 'inherit',
}))``;

const Styled = {};
Styled.DropdownCarrot = ({ hideMargin }) => (
	<CarrotContainer hideMargin={hideMargin}>
		<DropdownCarrot />
	</CarrotContainer>
);
Styled.defaultMenuWidth = '160px';
Styled.MenuItem = styled(UtilityButton)`
	box-sizing: border-box;
	box-shadow: none;
	text-decoration: none;

	${({ theme }) => css`
		&:hover {
			background-color: ${theme.colors.dropdown.backgroundHover};
		}

		&:disabled {
			cursor: default;

			color: ${theme.colors.dropdown.foregroundDisabled};
		}
	`}

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
`;
Styled.MenuItemIcon = styled(Box)`
	${createVariant({
		variants: {
			thumbnail: {
				width: '76px',
				height: '56px',
				marginRight: 2,
			},
			icon: {
				width: '40px',
				height: '40px',
				marginRight: 3,
			},
			avatar: {
				width: '48px',
				height: '48px',
				marginRight: 3,
			},
		},
	})}

	display: flex;
	justify-content: center;
	align-items: center;
`;
Styled.MenuItemTextContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;
Styled.MenuItemSeparator = styled.hr.attrs(() => ({
	role: 'separator',
	'aria-orientation': 'horizontal',
}))`
	border: 0;
	border-top: 1px solid
		${({ theme, themeOverrides }) =>
			themeOverrides?.separator ?? theme?.colors?.dropdown?.separator};
	width: 100%;
	margin: 0;
`;
