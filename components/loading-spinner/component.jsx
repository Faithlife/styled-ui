import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { system } from 'styled-system';
import { resetStyles, getVariation } from '../utils';
import { Box } from '../Box';

/** Loading spinner, frequently displayed as a placeholder when loading data */
export function LoadingSpinner({ variant, small, medium, large, height, width, ...restProps }) {
	return (
		<Spinner
			variant={getVariation(variant, { small, medium, large, none: true })}
			display="inline-block"
			width={height || width}
			height={height || width}
			marginLeft="5px"
			border="4px solid"
			borderColor="gray22"
			spinningColor="blue4"
			borderRadius="50%"
			{...restProps}
		/>
	);
}

LoadingSpinner.propTypes = {
	/** See the docs for how to override styles properly  */
	className: PropTypes.string,
	variant: PropTypes.oneOf(['small', 'medium', 'large']),
	/** 4px border thickness, 12px height */
	small: PropTypes.bool,
	/** 8px border thickness, 48px height*/
	medium: PropTypes.bool,
	/** 12px border thickness, 96px height */
	large: PropTypes.bool,
};

const spinTransform = keyframes`
0% {
	transform: rotate(0deg);
}

100% {
	transform: rotate(360deg);
}
`;

const Spinner = styled(Box)`
	${resetStyles}

	${system({ spinningColor: { property: 'border-left-color', scale: 'colors' } })};
	margin-left: 5px;
	animation: ${spinTransform} 1.1s infinite linear;

	${({ variant }) => {
		switch (variant) {
			case 'large':
				return css`
					width: ${props => props.height || '120px'};
					height: ${props => props.height || '120px'};
					border-width: ${props => props.borderWidth || '12px'};
				`;
			case 'medium':
				return css`
					width: ${props => props.height || '64px'};
					height: ${props => props.height || '64px'};
					border-width: ${props => props.borderWidth || '8px'};
				`;
			case 'small':
			default:
				return css`
					width: ${props => props.height || '20px'};
					height: ${props => props.height || '20px'};
					border-width: ${props => props.borderWidth || '4px'};
				`;
		}
	}}
`;
