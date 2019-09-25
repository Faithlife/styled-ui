import styled from 'styled-components';
import { colors } from '../shared-styles';
import { Box } from '../Box';

const arrowWidth = '10px';
const maxWidth = '1000px';
const maxHeight = '1000px';

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

export const PopoverBase = styled(Box)`
	background: ${({ styleOverrides }) =>
		styleOverrides.background
			? styleOverrides.background
			: `${({ theme }) => theme.backgroundColor}`};
	background-color: ${({ theme }) => theme.backgroundColor};
	border: ${({ styleOverrides }) => (styleOverrides.border ? styleOverrides.border : 'none')};
	border-radius: ${({ styleOverrides }) =>
		styleOverrides.borderRadius ? styleOverrides.borderRadius : '0px'};
	box-shadow: ${({ styleOverrides }) => (styleOverrides.hideShadow ? 'none' : colors.boxShadow)};
	color: ${({ theme }) => theme.textColor};
	font-size: ${({ styleOverrides }) =>
		styleOverrides.fontSize ? styleOverrides.fontSize : 'medium'};
	font-weight: ${({ styleOverrides }) =>
		styleOverrides.fontWeight ? styleOverrides.fontWeight : 'normal'};
	height: ${({ styleOverrides }) => (styleOverrides.height ? styleOverrides.height : 'auto')};
	line-height: ${({ styleOverrides }) =>
		styleOverrides.lineHeight ? styleOverrides.lineHeight : 'normal'};
	margin: ${({ styleOverrides }) => (styleOverrides.margin ? styleOverrides.margin : '0px')};
	max-height: ${({ styleOverrides }) =>
		styleOverrides.maxHeight
			? typeof styleOverrides.maxHeight === 'number'
				? `${styleOverrides.maxHeight}px`
				: styleOverrides.maxHeight
			: maxHeight};
	max-width: ${({ styleOverrides }) =>
		styleOverrides.maxWidth
			? typeof styleOverrides.maxWidth === 'number'
				? `${styleOverrides.maxWidth}px`
				: styleOverrides.maxWidth
			: maxWidth};
	min-height: ${({ styleOverrides }) =>
		styleOverrides.minHeight
			? typeof styleOverrides.minHeight === 'number'
				? `${styleOverrides.minHeight}px`
				: styleOverrides.minHeight
			: ''};
	min-width: ${({ styleOverrides }) =>
		styleOverrides.minWidth
			? typeof styleOverrides.minWidth === 'number'
				? `${styleOverrides.minWidth}px`
				: styleOverrides.minWidth
			: ''};
	outline: ${({ styleOverrides }) => (styleOverrides.outline ? styleOverrides.outline : '')};
	padding: ${({ styleOverrides }) => (styleOverrides.padding ? styleOverrides.padding : '0px')};
	position: absolute;
	text-align: ${({ styleOverrides }) =>
		styleOverrides.textAlign ? styleOverrides.textAlign : 'center'};
	white-space: normal;
	width: ${({ styleOverrides }) => (styleOverrides.width ? styleOverrides.width : 'auto')};
	z-index: ${({ styleOverrides }) => (styleOverrides.zIndex ? styleOverrides.zIndex : '10')};
	${({ styleOverrides }) =>
		styleOverrides.overflow ? `overflow: ${styleOverrides.overflow}` : ''};
`;

export const Arrow = styled(Box)`
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
