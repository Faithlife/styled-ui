import styled from 'styled-components';
import { Box } from '../Box';

export const PopoverArrow = styled(Box)`
	position: absolute;
	width: 25px;
	height: 25px;
	pointer-events: none;
	overflow: hidden;

	&::after {
		content: '';
		position: absolute;
		transform: translate(-50%, -50%) rotate(45deg);
		box-shadow: ${({ theme }) => theme.shadows[1]};
		width: 10px;
		height: 10px;
		background-color: white;
	}
`;

export const PopoverContainer = styled(Box)`
	position: absolute;
	box-shadow: ${({ boxShadow, theme }) => boxShadow ?? theme.shadows[1]};
	border-radius: ${({ borderRadius, theme }) => borderRadius ?? theme.radii[1]};
	padding: ${({ padding }) => padding ?? '12px'};
	background-color: ${({ backgroundColor, theme }) =>
		backgroundColor ?? theme.colors.popover.background};
	z-index: ${({ zIndex, theme }) => zIndex || theme.zIndices.menu};

	& > ${PopoverArrow}::after {
		border: ${({ border }) => border ?? 'none'};
		box-shadow: ${({ boxShadow, theme }) => boxShadow ?? theme.shadows[1]};
		background-color: ${({ backgroundColor, theme }) =>
			backgroundColor ?? theme.colors.popover.background};
	}

	&[data-popper-placement^='top'] > ${PopoverArrow} {
		top: 100%;

		&:after {
			top: 0;
			left: 50%;
		}
	}

	&[data-popper-placement^='bottom'] > ${PopoverArrow} {
		bottom: 100%;

		&:after {
			top: 100%;
			left: 50%;
		}
	}

	&[data-popper-placement^='left'] > ${PopoverArrow} {
		left: 100%;

		&:after {
			left: 0;
			top: 50%;
		}
	}

	&[data-popper-placement^='right'] > ${PopoverArrow} {
		right: 100%;

		&:after {
			left: 100%;
			top: 50%;
		}
	}
`;
