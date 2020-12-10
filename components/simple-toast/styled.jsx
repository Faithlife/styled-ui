import styled, { keyframes, css } from 'styled-components';
import { color, layout, position } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { TransitionStatuses } from '../utils';

const fixedHeaderHeight = 47; // px
const fixedHeightOffset = 8; // px
const toastOffset = { desktop: '24px', mobile: `${fixedHeaderHeight + fixedHeightOffset}px` };
const toastMinWidth = '285px';
const toastHeight = { desktop: '20px', mobile: '18px' };

const getResponsiveProp = propName => css`
	${({ theme, ...props }) => {
		const propValue = props[propName];
		if (Array.isArray(propValue)) {
			return css`
				${propName}: ${propValue[0]};

				@media screen and (min-width: ${theme.breakpoints.tablet}) {
					${propName}: ${propValue[1]};
				}

				${propValue.length === 3 &&
					css`
						@media screen and (min-width: ${theme.breakpoints.desktop}) {
							${propName}: ${propValue[2]};
						}
					`}
			`;
		}

		return `${propName}: ${propValue};`;
	}}
`;

const slideIn = ({ bottom }) => keyframes`
	from {
		bottom: 0;
	}

	to {
		${bottom ? getResponsiveProp('bottom') : `bottom: ${toastOffset.desktop};`}
	}
`;

export const transitionTime = 250; // milliseconds

export const ToastContainer = styled.div`
	/** Shared Styles */
	display: grid;
	grid-auto-flow: column;
	grid-column-gap: ${themeGet('space.3')};

	grid-template-columns: min-content;

	position: fixed;
	z-index: 1000;

	font-size: ${themeGet('fontSizes.4')};
	font-weight: ${themeGet('fontWeights.regular')};
	line-height: ${themeGet('lineHeights.ui')};

	background-color: ${themeGet('colors.white')};
	border-radius: 3px;
	box-shadow: 0 19px 38px 0 rgba(0, 0, 0, 0.12), 0 15px 12px 0 rgba(0, 0, 0, 0.12);
	opacity: 0;

	pointer-events: none;

	> svg {
		height: 1em;
		width: 1em;
	}

	/** Mobile Styles */
	padding: 10px 16px;
	height: ${toastHeight.mobile};
	top: ${toastOffset.mobile};
	left: 50%;
	transform: translateX(-50%);

	justify-items: center;

	${props => {
		switch (props.state) {
			case TransitionStatuses.ENTERING:
				return css`
					transition: opacity ${transitionTime}ms linear;
					opacity: 1;
					pointer-events: all;
				`;
			case TransitionStatuses.EXITING:
				return css`
					transition: opacity ${transitionTime}ms linear;
					opacity: 0;
					pointer-events: all;
				`;
			case TransitionStatuses.ENTERED:
				return css`
					opacity: 1;
					pointer-events: all;
				`;
			default:
				return '';
		}
	}};

	/** Desktop */
	@media (min-width: ${themeGet('breakpoints.tablet')}) {
		padding: 16px;
		${({ width }) => !width && `min-width: ${toastMinWidth};`}
		height: ${toastHeight.desktop};

		right: ${toastOffset.desktop};

		top: auto;
		left: auto;
		transform: none;
		justify-items: left;

		bottom: ${toastOffset.desktop};

		${props => {
			switch (props.state) {
				case TransitionStatuses.ENTERING:
					return css`
						animation: ${slideIn(props)} ${transitionTime}ms linear;
						pointer-events: all;
					`;
				case TransitionStatuses.EXITING:
					return css`
						transition: opacity ${transitionTime}ms linear;
						opacity: 0;
						pointer-events: all;
					`;
				case TransitionStatuses.ENTERED:
					return css`
						opacity: 1;
						pointer-events: all;
					`;
				default:
					return '';
			}
		}};
	}

	&& {
		${color}
		${layout}
		${position}
	}
`;

export const ToastContent = styled.div`
	white-space: nowrap;
`;

export const ToastClose = styled.div`
	cursor: pointer;
	justify-self: right;
`;
