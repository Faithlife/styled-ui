import styled, { keyframes } from 'styled-components';
import { resetStyles } from '../utils';

const spinTransform = keyframes`
0% {
	transform: rotate(0deg);
}

100% {
	transform: rotate(360deg);
}
`;

export const Spinner = styled.div`
	${resetStyles}

	border: 0 solid ${props => props.theme.outerColor};
	border-left-color: ${props => props.theme.innerColor};
	border-radius: 50%;
	display: inline-block;
	margin-left: 5px;
	animation: ${spinTransform} 1.1s infinite linear;
`;

export const variationMap = {
	small: component => component.extend`
	width: ${props => props.height || 20}px;
	height: ${props => props.height || 20}px;
	border-width: 4px;
`,
	medium: component => component.extend`
	width: ${props => props.height || 64}px;
	height: ${props => props.height || 64}px;
	border-width: 8px;
`,
	large: component => component.extend`
	width: ${props => props.height || 120}px;
	height: ${props => props.height || 120}px;
	border-width: 12px;
`,
};
