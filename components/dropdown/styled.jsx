import styled from 'styled-components';
import { colors, thickness } from '../shared-styles';
import { resetStyles } from '../utils';

export const DropdownMenu = styled.div.attrs({ role: 'menu' })``;

export const DropdownMenuContent = styled.div`
	width: 100%;
	padding: ${thickness.four} 0;

	display: flex;
	flex-direction: column;
`;

export const MenuItem = styled.button.attrs({
	tabIndex: '-1',
	role: ({ role }) => role || 'menuitem',
	'aria-disabled': ({ isDisabled }) => isDisabled,
})`
	${resetStyles};
	outline: none;
	border: none;
	padding: 0;

	background-color: transparent;

	${({ isDisabled }) => !isDisabled && 'cursor: pointer'};

	&:focus {
		background-color: ${colors.gray4};
		outline: none;
		border: 0;
	}

	&::-moz-focus-inner {
		border: 0;
	}
`;

export const MenuItemContent = styled.span.attrs({ tabIndex: '-1' })`
	${({ isDisabled }) => isDisabled && `color: ${colors.gray22}`};

	padding: ${thickness.eight};
	text-align: left;
	white-space: nowrap;
	background-color: transparent;
	font-size: 16px;

	display: flex;
	flex-direction: row;
	align-items: center;

	&:focus {
		outline: none;
		border: 0;
	}

	&:hover {
		${({ isDisabled }) => !isDisabled && `background-color: ${colors.gray4}`};
	}
`;

export const MenuSeparator = styled.hr.attrs({ role: 'separator' })`
	border: 0;
	border-top: 1px solid ${colors.gray14};
	width: 100%;
	margin: 0;
`;
