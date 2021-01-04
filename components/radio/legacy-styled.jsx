import styled from 'styled-components';
import { resetStyles } from '../utils';

export const RadioSvg = styled.svg`
	position: absolute;
	width: 14px;
	height: 14px;
`;

export const RadioBorder = styled.circle`
	fill: none;
	stroke: ${props => props.theme.border};
	stroke-width: 2;
`;

export const CheckedIndicator = styled.circle`
	fill: ${props => props.theme.primary};
`;

export const RadioContainer = styled.button`
	${resetStyles};

	display: flex;
	align-items: center;
	position: relative;
	border: none;
	padding: 0;
	min-width: 16px;
	min-height: 16px;
	background: transparent;

	&:not(:disabled) {
		&:active {
			color: buttontext;
		}

		@media (hover: hover) {
			&:hover ${RadioBorder} {
				stroke: ${props => props.theme.primary};
			}
		}
		@media (hover: none) {
			&:active ${RadioBorder} {
				stroke: ${props => props.theme.primary};
			}
		}
	}

	&:disabled ${RadioBorder} {
		fill: ${props => props.theme.disabledBackground};
		stroke: ${props => props.theme.disabledBorder};
	}

	&:focus {
		&:not(:active) {
			box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		}
		outline: none;
	}
`;

export const Label = styled.div`
	margin-left: 22px;

	& + & {
		margin-left: 6px;
	}
`;
