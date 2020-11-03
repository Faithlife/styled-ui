import React, { useCallback } from 'react';
import { getConfigChild } from '../utils';
import { Box } from '../Box';
import { Text } from '../Text';
import { CheckboxContent } from '../check-box';
import { handledKeys, useDropdownContext } from './utils';
import * as Styled from './styled';

function MenuItemCheckboxComponent(checkboxProps) {
	return <CheckboxContent position="relative" marginRight={3} {...checkboxProps} />;
}
MenuItemCheckboxComponent.childConfigComponent = 'MenuItemCheckboxComponent';

export function MenuItemIcon({ src, variant, children, ...iconProps }) {
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

export function MenuItemPrimaryText({ hasSecondaryText, children, ...textProps }) {
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

export function MenuItemSecondaryText({ children, ...textProps }) {
	return (
		<Text textStyle="ui.14" color="gray52" {...textProps}>
			{children}
		</Text>
	);
}
MenuItemSecondaryText.childConfigComponent = 'MenuItemSecondaryText';

export const MenuItem = React.forwardRef(function MenuItem(
	{ keyboardHovered, onClick, onKeyDown, disabled, preventDefaultOnClick, children, ...boxProps },
	ref,
) {
	const { onCloseMenu } = useDropdownContext();

	const handleClick = useCallback(
		event => {
			if (!disabled) {
				onClick(event);
				onCloseMenu();
			}
		},
		[onClick, onCloseMenu, disabled],
	);

	const handleKeyPress = useCallback(
		event => {
			if (!disabled && event.key === handledKeys.enter) {
				event.preventDefault();
				onClick();
				onCloseMenu();
			}
		},
		[onClick, onCloseMenu, disabled],
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
			color={!disabled ? 'dropdown.foreground' : 'dropdown.foregroundDisabled'}
			backgroundColor={keyboardHovered ? 'dropdown.backgroundHover' : 'dropdown.background'}
			tabIndex={-1}
			onClick={!preventDefaultOnClick || disabled ? handleClick : onClick}
			onKeyDown={!disabled && onKeyDown ? onKeyDown : handleKeyPress}
			display="flex"
			flexDirection="row"
			alignItems="center"
			disabled={disabled}
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

export const MenuItemCheckbox = React.forwardRef(function MenuItemCheckbox(
	{ isChecked, onToggle, disabled, children, ...menuItemProps },
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
			disabled={disabled}
			preventDefaultOnClick
			{...menuItemProps}
		>
			<MenuItemCheckboxComponent isChecked={isChecked} disabled={disabled} />
			{children}
		</MenuItem>
	);
});

MenuItemCheckbox.isFocusableChild = true;

export const MenuItemLink = React.forwardRef(function MenuItemLink(
	{ disabled, href, children, ...menuItemProps },
	ref,
) {
	return (
		<Box as="li" role="none">
			<MenuItem
				as="a"
				ref={ref}
				onClick={null}
				onKeyDown={null}
				rel="noopener noreferrer"
				preventDefaultOnClick
				href={!disabled ? href : null}
				disabled={disabled}
				{...menuItemProps}
			>
				{children}
			</MenuItem>
		</Box>
	);
});

MenuItemLink.isFocusableChild = true;

export function MenuItemSeparator(hrProps) {
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

export function MenuItemTitle({ children, ...textProps }) {
	return (
		<Text textStyle="ui.16" fontWeight={1} paddingX={4} paddingY={5} {...textProps}>
			{children}
		</Text>
	);
}
