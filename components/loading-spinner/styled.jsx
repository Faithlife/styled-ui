import styled, { keyframes } from 'styled-components';
import { variant, layout, position } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
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
	border: 0 solid ${themeGet('colors.loadingSpinner.outerColor')};
	border-left-color: ${themeGet('colors.loadingSpinner.innerColor')};
	border-radius: 50%;
	display: inline-block;
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

	${layout}

	/* Square up dimensions if necessary */
	${({ size, height, width }) =>
		// Object notation is used instead of CSS so integers will be converted to pixels
		(size || height || width) && {
			height: size || height || width,
			width: size || height || width,
		}}

	${position}
`;

Spinner.defaultProps = {
	theme,
	variant: 'small',
};
