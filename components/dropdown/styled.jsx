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
	role: 'menuitem',
	'aria-disabled': ({ disabled }) => disabled,
})`
	${resetStyles};
	outline: none;
	border: none;

	padding: ${thickness.eight};
	text-align: left;
	white-space: nowrap;
	background-color: transparent;

	&:focus {
		background-color: ${colors.gray4};
		outline: none;
	}
`;
