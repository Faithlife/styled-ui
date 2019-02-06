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

	7%, 100% {
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

const fadeInMobile = keyframes`
	0% {
		opacity: 0;
	}

	10%, 100% {
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

	background-color: ${colors.white};
	border-radius: 3px;
	box-shadow: 0 19px 38px 0 rgba(0, 0, 0, 0.12), 0 15px 12px 0 rgba(0, 0, 0, 0.12);

	pointer-events: none;

	> svg {
		height: 1em;
		width: 1em;
	}

	/** Mobile Styles */
	@media (max-width: ${mediaSizes.tablet}) {
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
						animation: ${fadeInMobile} 1250ms linear;
					`;
				case ToastStates.hiding:
					return css`
						animation: ${fadeOut} 250ms linear;
					`;
				default:
					return '';
			}
		}};
	}

	/** Desktop */
	@media (min-width: ${mediaSizes.tablet}) {
		padding: 16px;
		${({ styleOverrides }) => (!styleOverrides.width ? `min-width: ${toastMinWidth}` : '')};
		height: ${({ styleOverrides }) => styleOverrides.height || toastHeight.desktop};

		${props => hiddenBottomValue(props)};
		right: ${({ styleOverrides }) => styleOverrides.rightOffset || toastOffset.desktop};

		${props => {
			switch (props.state) {
				case ToastStates.showing:
					return css`
						animation: ${slideIn(props)} 5s linear;
					`;
				case ToastStates.hiding:
					return css`
						animation: ${fadeOut} 250ms linear;
						bottom: ${props.bottomOffset || toastOffset.desktop};
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
