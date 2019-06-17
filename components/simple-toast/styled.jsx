import styled, { keyframes, css } from 'styled-components';
import { TransitionStatuses } from '../utils';
import { fonts, colors, thickness, mediaSizes } from '../shared-styles';

const fixedHeaderHeight = 47; // px
const fixedHeightOffset = 8; // px
const toastOffset = { desktop: '24px', mobile: `${fixedHeaderHeight + fixedHeightOffset}px` };
const toastMinWidth = '285px';
const toastHeight = { desktop: '20px', mobile: '18px' };

const slideIn = ({ styleOverrides }) => keyframes`
	from {
		bottom: 0;
	}

	to {
		bottom: ${styleOverrides.bottomOffset || toastOffset.desktop};
	}
`;

export const transitionTime = 250; // milliseconds

export const ToastContainer = styled.div`
	/** Shared Styles */
	display: grid;
	grid-auto-flow: column;
	grid-column-gap: ${thickness.eight};

	grid-template-columns: min-content;

	position: fixed;
	z-index: ${({ styleOverrides }) => styleOverrides.zIndex || 1000};
	${({ styleOverrides }) => (styleOverrides.width ? `width: ${styleOverrides.width}` : '')};

	${fonts.ui18};

	background-color: ${({ theme }) => theme.backgroundColor || colors.white};
	border-radius: 3px;
	box-shadow: 0 19px 38px 0 rgba(0, 0, 0, 0.12), 0 15px 12px 0 rgba(0, 0, 0, 0.12);
	opacity: 0;

	> svg {
		height: 1em;
		width: 1em;
	}

	/** Mobile Styles */
	padding: 10px 16px;
	height: ${({ styleOverrides }) => styleOverrides.height || toastHeight.mobile};
	top: ${({ styleOverrides }) => styleOverrides.topOffset || toastOffset.mobile};
	left: 50%;
	transform: translateX(-50%);

	justify-items: center;

	${props => {
		switch (props.state) {
			case TransitionStatuses.ENTERING:
				return css`
					transition: opacity ${transitionTime}ms linear;
					opacity: 1;
				`;
			case TransitionStatuses.EXITING:
				return css`
					transition: opacity ${transitionTime}ms linear;
					opacity: 0;
				`;
			case TransitionStatuses.ENTERED:
				return css`
					opacity: 1;
				`;
			default:
				return '';
		}
	}};

	/** Desktop */
	@media (min-width: ${mediaSizes.tablet}) {
		padding: 16px;
		${({ styleOverrides }) => (!styleOverrides.width ? `min-width: ${toastMinWidth}` : '')};
		height: ${({ styleOverrides }) => styleOverrides.height || toastHeight.desktop};

		right: ${({ styleOverrides }) => styleOverrides.rightOffset || toastOffset.desktop};

		top: auto;
		left: auto;
		transform: none;
		justify-items: left;

		bottom: ${({ styleOverrides }) => styleOverrides.bottomOffset || toastOffset.desktop};

		${props => {
			switch (props.state) {
				case TransitionStatuses.ENTERING:
					return css`
						animation: ${slideIn(props)} ${transitionTime}ms linear;
					`;
				case TransitionStatuses.EXITING:
					return css`
						transition: opacity ${transitionTime}ms linear;
						opacity: 0;
					`;
				case TransitionStatuses.ENTERED:
					return css`
						opacity: 1;
					`;
				default:
					return '';
			}
		}};
	}
`;

export const ToastContent = styled.div`
	white-space: nowrap;
`;

export const ToastClose = styled.div`
	cursor: pointer;
	justify-self: right;
`;
