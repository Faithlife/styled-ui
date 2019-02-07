import styled, { keyframes, css } from 'styled-components';
import { fonts, thickness, colors, mediaSizes } from '../shared-styles';

const fixedHeaderHeight = 47; // px
const fixedHeightOffset = 8; // px
const toastOffset = { desktop: '24px', mobile: `${fixedHeaderHeight + fixedHeightOffset}px` };
const toastMinWidth = '285px';
const toastPadding = '16px';
const toastHeight = { desktop: '20px', mobile: '18px' };

const slideIn = ({ styleOverrides }) => keyframes`
	0% {
		opacity: 1;
	}

	100% {
		bottom: ${styleOverrides.bottomOffset || toastOffset.desktop};
	}
`;

const fadeOut = keyframes`
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
	}
`;

const showToast = ({ styleOverrides }) => keyframes`
	0%, 100% {
		opacity: 1;
		bottom: ${styleOverrides.bottomOffset || toastOffset.desktop};
	}
`;

const showToastMobile = keyframes`
	0%, 100% {
		opacity: 1;
	}
`;

const fadeInMobile = keyframes`
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
`;

// On desktop the toast should initially render hidden off screen and slide up into view
const hiddenBottomValue = ({ styleOverrides }) => css`
	bottom: calc(-1 * (${styleOverrides.height || toastHeight.desktop} + ${toastPadding} * 2));
`;

export const ToastStates = Object.freeze({
	hidden: 'hidden',
	hiding: 'hiding',
	showing: 'showing',
	shown: 'shown',
});

export const ToastContainer = styled.div`
	/** Shared Styles */
	display: grid;
	grid-auto-flow: column;
	grid-column-gap: ${thickness.eight};
	grid-template-columns: min-content max-content;

	position: fixed;
	z-index: ${({ styleOverrides }) => styleOverrides.zIndex || 1000};
	${({ styleOverrides }) => (styleOverrides.width ? `width: ${styleOverrides.width}` : '')};

	${fonts.ui18};

	background-color: ${({ theme }) => theme.backgroundColor || colors.white};
	border-radius: 3px;
	box-shadow: 0 19px 38px 0 rgba(0, 0, 0, 0.12), 0 15px 12px 0 rgba(0, 0, 0, 0.12);

	pointer-events: none;

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
	opacity: 0;

	justify-items: center;

	${props => {
		switch (props.state) {
			case ToastStates.showing:
				return css`
					animation: ${fadeInMobile} 1s linear;
				`;
			case ToastStates.hiding:
				return css`
					animation: ${fadeOut} 250ms linear;
				`;
			case ToastStates.shown:
				return css`
					animation: ${showToastMobile} 1s linear;
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

		${props => hiddenBottomValue(props)};
		right: ${({ styleOverrides }) => styleOverrides.rightOffset || toastOffset.desktop};

		top: auto;
		left: auto;
		transform: none;
		opacity: 1;
		justify-items: left;

		${props => {
			switch (props.state) {
				case ToastStates.showing:
					return css`
						animation: ${slideIn(props)} 250ms linear;
					`;
				case ToastStates.hiding:
					return css`
						animation: ${fadeOut} 250ms linear;
						bottom: ${props.bottomOffset || toastOffset.desktop};
					`;
				case ToastStates.shown:
					return css`
						animation: ${showToast(props)} 5s linear;
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
