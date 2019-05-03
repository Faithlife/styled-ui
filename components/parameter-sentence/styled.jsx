import styled from 'styled-components';
import { colors, thickness } from '../shared-styles';
import { resetStyles } from '../utils';

export const Button = styled.button`
	${resetStyles};

	box-shadow: none;
	cursor: pointer;
	display: inline-block;
	background-color: transparent;
	padding: 0;
	border: none;
	outline: none;

	transition: box-shadow 0.25s ease 0s;

	&:focus {
		&:not(:active) {
			box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		}
		outline: none;
	}
`;

export const ButtonContent = styled.div.attrs({ tabIndex: '-1' })`
	white-space: nowrap;
	min-height: fit-content;
	font-size: ${props => props.styleOverrides.fontSize || '16px'};
	width: ${props => props.styleOverrides.width};
	padding-bottom: 1px;
	border-bottom: dashed ${thickness.three} ${colors.blueBase};
	font-weight: bold;
	color: black;
	${props => `color: ${props.isOpen ? colors.blueActive : colors.gray66}`};

	&:hover {
		&:not(:focus) {
			color: ${colors.blueBase};
		}
	}

	&:active {
		color: ${colors.blueBase};
	}

	&:focus {
		outline: none;
	}
`;

export const Container = styled.div`
	display: inline-block;
`;
