import styled from 'styled-components';
import { thickness } from '../shared-styles';
import { resetStyles } from '../utils';

export const DropdownMenuContent = styled.div`
	width: 100%;
	padding: ${thickness.four} 0;

	background-color: ${({ theme, themeOverrides }) =>
		themeOverrides?.background ?? theme?.colors?.dropdown?.background};
	display: flex;
	flex-direction: column;
`;

export const MenuItem = styled.button.attrs(({ role, isDisabled }) => ({
	// Menu items should not be in the tab order. They are only reachable by the arrow keys
	tabIndex: '-1',
	role: role ?? 'menuitem',
	'aria-disabled': isDisabled,
}))`
	${resetStyles};
	outline: none;
	border: none;
	padding: 0;

	background-color: transparent;
	color: ${({ theme }) => theme?.colors?.dropdown?.foreground};

	${({ isDisabled }) => !isDisabled && 'cursor: pointer'};

	&:focus,
	&:hover {
		background-color: ${({ theme, themeOverrides }) =>
			themeOverrides?.hoverBackgroundColor ?? theme?.colors?.dropdown?.backgroundHover};
		outline: none;
		border: 0;
	}

	&::-moz-focus-inner {
		border: 0;
	}
`;

export const MenuItemContent = styled.div.attrs(() => ({ tabIndex: '-1' }))`
	color: ${({ isDisabled, theme, themeOverrides }) =>
		isDisabled
			? themeOverrides?.foregroundDisabled ?? theme?.colors?.dropdown?.foregroundDisabled
			: themeOverrides?.foreground ?? theme?.colors?.dropdown?.foreground};
	padding: ${({ styleOverrides }) => styleOverrides.padding ?? thickness.eight};
	text-align: left;
	white-space: nowrap;
	background-color: transparent;
	font-size: ${({ styleOverrides }) => styleOverrides.fontSize ?? '16px'};

	display: flex;
	flex-direction: row;
	align-items: center;

	&:focus {
		outline: none;
		border: 0;
	}

	&:hover {
		${({ isDisabled, theme, themeOverrides }) =>
			!isDisabled &&
			`background-color:
			${themeOverrides?.hoverBackgroundColor ?? theme?.colors?.dropdown?.hoverBackgroundColor};`};
	}
`;

export const MenuSeparator = styled.hr.attrs(() => ({
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
