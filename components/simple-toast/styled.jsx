import styled, { keyframes, css } from 'styled-components';
import { typography } from '../../theme/system';
import { TransitionStatuses } from '../utils';
import { mediaSizes } from '../shared-styles';
import { Box } from '../Box';

const fixedHeaderHeight = 47; // px
const fixedHeightOffset = 8; // px
const toastOffset = { desktop: '24px', mobile: `${fixedHeaderHeight + fixedHeightOffset}px` };

const slideIn = ({ bottom }) => keyframes`
	from {
		bottom: 0;
	}

	to {
		bottom: ${bottom || toastOffset.desktop};
	}
`;

export const transitionTime = 250; // milliseconds

export const ToastContainer = styled(Box)`
	${typography}

	> svg {
		height: 1em;
		width: 1em;
	}

	/** Mobile Styles */
	transform: translateX(-50%);
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
		transform: none;
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
