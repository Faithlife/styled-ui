import styled from 'styled-components';
import { thickness, fonts } from '../shared-styles';

const arrowSize = 10;

export const TooltipContainer = styled.div`
	display: inline-flex;
	position: relative;
	justify-content: center;
	align-items: center;
`;

export const TooltipDiv = styled.div`
	${fonts.ui16};
	position: absolute;
	box-shadow: ${props => props.theme.shadow};
	bottom: calc(100% + ${props => props.offset}px);
	background-color: ${props => props.theme.backgroundColor};
	color: ${props => props.theme.textColor};
	border-radius: 3px;
	padding: ${thickness.eight} ${thickness.sixteen};
	z-index: 10;
	text-align: center;
	width: ${props => props.width};
	opacity: ${props => (props.isOpen ? '1' : '0')};
	visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
	transition: all ${props => (props.delay.hide ? props.delay.hide : props.delay)}s linear;

	&::after {
		visibility: ${props => (props.hideArrow ? 'hidden' : 'visible')};
		content: '';
		position: absolute;
		bottom: -${props => parseInt(props.offset, 10) + arrowSize}px;
		left: 50%;
		margin-left: -${arrowSize}px;
		border-width: ${arrowSize}px;
		border-style: solid;
		border-color: ${props => props.theme.backgroundColor} transparent transparent transparent;
		z-index: 10;
	}

	/* stylelint-disable-next-line rule-empty-line-before */
	${TooltipContainer}:hover & {
		opacity: 1;
		visibility: visible;
		transition: opacity ${props => (props.delay.show ? props.delay.show : props.delay)}s linear;
	}

	/* stylelint-disable-next-line rule-empty-line-before */
	${TooltipContainer}:hover &:hover {
		opacity: ${props => (props.autoHide && !props.isOpen ? '0' : '1')};
	}
`;

export const variationMap = {
	'top-start': component => component.extend`
		left: 0;

		&::after {
			left: ${arrowSize}px;
		}
	`,
	'top-end': component => component.extend`
		right: 0;

		&::after {
			right: 0;
			left: auto;
		}
	`,
	right: component => component.extend`
		left: calc(100% + ${props => props.offset}px);
		bottom: auto;

		&::after {
			left: -${arrowSize}px;
			border-color: transparent ${props => props.theme.backgroundColor} transparent transparent;
			bottom: calc(50% - ${arrowSize}px);
		}
	`,
	'right-start': component => component.extend`
		top: 0;
		left: calc(100% + ${props => props.offset}px);
		bottom: auto;

		&::after {
			left: -${arrowSize}px;
			border-color: transparent ${props => props.theme.backgroundColor} transparent transparent;
			top: 0;
			bottom: auto;
		}
	`,
	'right-end': component => component.extend`
		left: calc(100% + ${props => props.offset}px);
		bottom: 0;

		&::after {
			left: -${arrowSize}px;
			border-color: transparent ${props => props.theme.backgroundColor} transparent transparent;
			bottom: 0;
		}
	`,
	bottom: component => component.extend`
		top: calc(100% + ${props => props.offset}px);
		bottom: auto;

		&::after {
			border-color: transparent transparent ${props => props.theme.backgroundColor} transparent;
			top: -${props => parseInt(props.offset, 10) + arrowSize}px;
			bottom: auto;
		}
	`,
	'bottom-start': component => component.extend`
		top: calc(100% + ${props => props.offset}px);
		left: 0;
		bottom: auto;

		&::after {
			left: ${arrowSize}px;
			top: -${props => parseInt(props.offset, 10) + arrowSize}px;
			bottom: auto;
			border-color: transparent transparent ${props => props.theme.backgroundColor} transparent;
		}
	`,
	'bottom-end': component => component.extend`
		top: calc(100% + ${props => props.offset}px);
		right: 0;
		bottom: auto;

		&::after {
			right: 0;
			left: auto;
			top: -${props => parseInt(props.offset, 10) + arrowSize}px;
			bottom: auto;
			border-color: transparent transparent ${props => props.theme.backgroundColor} transparent;
		}
	`,
	left: component => component.extend`
		right: calc(100% + ${props => props.offset}px);
		left: auto;
		bottom: auto;

		&::after {
			right: -${props => parseInt(props.offset, 10) + arrowSize}px;
			left: auto;
			border-color: transparent transparent transparent ${props => props.theme.backgroundColor};
			bottom: calc(50% - ${arrowSize}px);
		}
	`,
	'left-start': component => component.extend`
		top: 0;
		right: calc(100% + ${props => props.offset}px);
		left: auto;
		bottom: auto;

		&::after {
			right: -${props => parseInt(props.offset, 10) + arrowSize}px;
			left: auto;
			border-color: transparent transparent transparent ${props => props.theme.backgroundColor};
			top: 0;
			bottom: auto;
		}
	`,
	'left-end': component => component.extend`
		right: calc(100% + ${props => props.offset}px);
		left: auto;
		bottom: 0;

		&::after {
			right: -${props => parseInt(props.offset, 10) + arrowSize}px;
			left: auto;
			border-color: transparent transparent transparent ${props => props.theme.backgroundColor};
			bottom: 0;
		}
	`,
};
