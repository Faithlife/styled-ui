import styled from 'styled-components';
import { colors, thickness } from '../shared-styles';
import { resetStyles } from '../utils';

export const DropdownMenuContent = styled.div`
	width: 100%;
	padding: ${thickness.four} 0;

	display: flex;
	flex-direction: column;
`;

export const MenuItem = styled.button.attrs({
	// Menu items should not be in the tab order. They are only reachable by the arrow keys
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

export const MenuSeparator = styled.hr.attrs({
	role: 'separator',
	'aria-orientation': 'horizontal',
})`
	border: 0;
	border-top: 1px solid ${colors.gray14};
	width: 100%;
	margin: 0;
`;
