import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { resetStyles } from '../utils';

export const RadioSvg = styled.svg`
	position: absolute;
	width: 14px;
	height: 14px;
`;

export const RadioBorder = styled.circle`
	fill: none;
	stroke: ${themeGet('colors.radio.border')};
	stroke-width: 2;
`;

export const CheckedIndicator = styled.circle`
	fill: ${themeGet('colors.radio.primary')};
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
				stroke: ${themeGet('colors.radio.primary')};
			}
		}
		@media (hover: none) {
			&:active ${RadioBorder} {
				stroke: ${themeGet('colors.radio.primary')};
			}
		}
	}

	&:disabled ${RadioBorder} {
		fill: ${themeGet('colors.radio.disabledBackground')};
		stroke: ${themeGet('colors.radio.disabledBorder')};
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
