import styled, { css, keyframes } from 'styled-components';
import { variant } from 'styled-system';
import { theme } from '../../theme';
import { Box } from '../Box';

const spinTransform = keyframes`
0% {
	transform: rotate(0deg);
}

100% {
	transform: rotate(360deg);
}
`;

export const Spinner = styled(Box)`
	border: 0 solid ${props => props.overrides.outerColor};
	border-left-color: ${props => props.overrides.innerColor};
	border-radius: 50%;
	display: inline-block;
	margin-left: 5px;
	animation: ${spinTransform} 1.1s infinite linear;
	border-width: 4px;

	${variant({
		variants: {
			small: {
				height: '20px',
				width: '20px',
				borderWidth: '4px',
			},
			medium: {
				height: '64px',
				width: '64px',
				borderWidth: '8px',
			},
			large: {
				height: '120px',
				width: '120px',
				borderWidth: '12px',
			},
		},
	})}

	${props =>
		props.height &&
		css`
			width: ${props.height}px;
			height: ${props.height}px;
		`}
`;

Spinner.defaultProps = {
	theme,
	variant: 'small',
};
