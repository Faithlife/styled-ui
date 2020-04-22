import styled from 'styled-components';
import { colors, thickness } from '../shared-styles';
import { resetStyles } from '../utils';
import { Box } from '../Box';

export const DropdownMenuContent = styled.div`
	width: 100%;
	padding: ${thickness.four} 0;

	background-color: ${({ theme }) => theme.colors.dropdown.background || colors.white};
	display: flex;
	flex-direction: column;
`;

export const MenuItem = styled.button.attrs(({ role, isDisabled }) => ({
	// Menu items should not be in the tab order. They are only reachable by the arrow keys
	tabIndex: '-1',
	role: role || 'menuitem',
	'aria-disabled': isDisabled,
}))`
	${resetStyles};
	outline: none;
	border: none;
	padding: 0;

	background-color: transparent;

	${({ isDisabled }) => !isDisabled && 'cursor: pointer'};

	&:focus {
		background-color: ${({ theme }) => theme.colors.dropdown.backgroundHover || colors.gray4};
		outline: none;
		border: 0;
	}

	&::-moz-focus-inner {
		border: 0;
	}
`;

export const MenuItemContent = styled(Box).attrs(() => ({ tabIndex: '-1' }))`
	${({ disabled }) =>
		disabled
			? `color: ${({ theme }) => theme.colors.dropdown.foregroundDisabled || colors.gray22}`
			: `color: ${({ theme }) => theme.colors.dropdown.foreground || colors.black}`};

	padding: ${({ styleOverrides }) => styleOverrides.padding || thickness.eight};
	text-align: left;
	white-space: nowrap;
	background-color: transparent;
	font-size: ${({ styleOverrides }) => styleOverrides.fontSize || '16px'};

	display: flex;
	flex-direction: row;
	align-items: center;

	&:focus {
		outline: none;
		border: 0;
	}

	&:hover {
		${({ isDisabled, theme }) =>
			!isDisabled &&
			`background-color:
			${theme.colors.dropdown.backgroundHover || colors.gray4};`};
	}
`;

export const MenuSeparator = styled.hr.attrs(() => ({
	role: 'separator',
	'aria-orientation': 'horizontal',
}))`
	border: 0;
	border-top: 1px solid ${({ theme }) => theme.colors.dropdown.separator || colors.gray14};
	width: 100%;
	margin: 0;
`;
