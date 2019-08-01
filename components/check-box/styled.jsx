import styled from 'styled-components';
import { system } from 'styled-system';
import { resetStyles } from '../utils';
import { Box } from '../Box';
import { Text } from '../Text';

export const CheckboxContainer = styled.button`
	${resetStyles};

	display: flex;
	align-items: center;
	position: relative;
	border: none;
	padding: 0px 16px;
	min-height: 44px;
	min-width: 44px;
	background: transparent;
	text-align: unset;
	cursor: ${props => props.disabled || 'pointer'};

	&:not(:disabled) {
		&:active {
			color: buttontext;
		}
	}

	&:focus {
		&:not(:active) {
			box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		}
		outline: none;
	}
`;

const hoverBorderColor = { hoverBorderColor: { property: 'borderColor', scale: 'colors' } };
export const HoverableBox = styled(Box)`
	@media (hover: hover) {
		&:hover {
			${system(hoverBorderColor)};
		}
	}
	@media (hover: none) {
		&:active {
			${system(hoverBorderColor)};
		}
	}
`;

export const IconBox = styled(Box)`
	path {
		${system({ fill: { property: 'fill', scale: 'colors' } })};
	}
`;

export const Label = styled(Text)`
	& + & {
		${system({ siblingMarginLeft: { property: 'margin-left', scale: 'space' } })};
	}
`;
