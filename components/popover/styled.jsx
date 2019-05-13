import styled from 'styled-components';
import { colors, thickness } from '../shared-styles';

const arrowWidth = '10px';
const maxWidth = 300;

export const margins = {
	top: { marginBottom: arrowWidth },
	right: { marginLeft: arrowWidth },
	left: { marginRight: arrowWidth },
	bottom: { marginTop: arrowWidth },
};

export const getPlacement = placement => {
	if (!placement) {
		return 'top';
	}
	return placement.split('-')[0];
};

export const PopoverContent = styled.div`
	position: absolute;
	padding: ${({ styleOverrides }) => styleOverrides.padding || thickness.twelve};
	${({ styleOverrides }) =>
		styleOverrides.minWidth == null ? '' : `min-width: ${styleOverrides.minWidth}px`};
	max-width: ${({ styleOverrides }) => styleOverrides.maxWidth || maxWidth}px;
	${({ styleOverrides }) => (styleOverrides.width ? `width: ${styleOverrides.width}` : '')};
	background-color: ${({ theme }) => theme.backgroundColor};
	border-radius: 3px;
	text-align: center;
	border: ${({ styleOverrides }) => (styleOverrides.border ? styleOverrides.border : 'none')};
	box-shadow: ${({ styleOverrides }) => (styleOverrides.hideShadow ? 'none' : colors.boxShadow)};
	white-space: normal;
	${({ theme }) => (theme.textColor ? `color: ${theme.textColor}` : '')};
	${({ styleOverrides }) => (styleOverrides.zIndex ? `z-index: ${styleOverrides.zIndex}` : '')};
`;

export const Arrow = styled.div`
	width: 25px;
	height: 25px;
	position: absolute;
	overflow: hidden;
	pointer-events: none;

	&::after {
		content: '';
		border: ${({ styleOverrides }) => (styleOverrides.border ? styleOverrides.border : 'none')};
		position: absolute;
		width: ${arrowWidth};
		height: ${arrowWidth};
		background: ${({ theme }) => theme.backgroundColor};
		transform: translateX(-50%) translateY(-50%) rotate(45deg);
		box-shadow: ${({ styleOverrides }) => (styleOverrides.hideShadow ? 'none' : colors.boxShadow)};
	}
	${({ placement }) => (placement ? arrowStyles[getPlacement(placement)] : arrowStyles.top)};
`;

const arrowStyles = {
	top: `
		top: 100%;

		&::after {
			top: 0;
		}
	`,
	right: `
		right: 100%;

		&::after {
			top: 50%;
			left: 100%;
		}
	`,
	left: `
		left: 100%;

		&::after {
			top: 50%;
			left: 0;
		}
	`,
	bottom: `
		bottom: 100%;

		&::after {
			top: 100%;
		}
	`,
};

export const ReferenceContainer = styled.div`
	display: inline-block;
`;

export const FocusCatcher = styled.div.attrs({ tabIndex: '-1' })`
	display: inline-block;
`;
