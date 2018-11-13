import styled from 'styled-components';
import { colors, thickness } from '../shared-styles';

const arrowWidth = '10px';
const maxWidth = 300;

export const PopoverContent = styled.div`
	position: relative;
	padding: ${({ styleOverrides }) => styleOverrides.padding || thickness.twelve};
	max-width: ${({ styleOverrides }) => styleOverrides.width || maxWidth}px;
	background-color: ${({ theme }) => theme.backgroundColor};
	border-radius: 3px;
	text-align: center;
	border: ${({ theme }) => (theme.border ? theme.border : 'none')};
	box-shadow: ${({ styleOverrides }) => (styleOverrides.hideShadow ? 'none' : colors.boxShadow)};
	${({ theme }) => (theme.textColor ? `color: ${theme.textColor}` : '')};
	${({ showArrow }) =>
		showArrow
			? `
	[x-placement*='top'] & {
		margin-bottom: ${arrowWidth};
	}

	[x-placement*='bottom'] & {
		margin-top: ${arrowWidth};
	}

	[x-placement*='right'] & {
		margin-left: ${arrowWidth};
	}

	[x-placement*='left'] & {
		margin-right: ${arrowWidth};
	}
	`
			: ''};
`;

export const Arrow = styled.div`
	width: 25px;
	height: 25px;
	position: absolute;
	overflow: hidden;

	&::after {
		content: '';
		border: ${({ theme }) => (theme.border ? theme.border : 'none')};
		position: absolute;
		width: ${arrowWidth};
		height: ${arrowWidth};
		background: ${({ theme }) => theme.backgroundColor};
		transform: translate(-50%, -50%) rotate(45deg);
		box-shadow: ${({ styleOverrides }) => (styleOverrides.hideShadow ? 'none' : colors.boxShadow)};
	}

	[x-placement*='top'] & {
		top: 100%;

		&::after {
			top: 0;
		}
	}

	[x-placement*='bottom'] & {
		bottom: 100%;

		&::after {
			top: 100%;
		}
	}

	[x-placement*='right'] & {
		right: 100%;

		&::after {
			top: 50%;
			left: 100%;
		}
	}

	[x-placement*='left'] & {
		left: 100%;

		&::after {
			top: 50%;
			left: 0;
		}
	}
`;
