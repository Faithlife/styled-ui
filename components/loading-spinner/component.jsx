import React from 'react';
import PropTypes from 'prop-types';
import styledSystemPropTypes from '@styled-system/prop-types';
import { getVariation } from '../utils';
import { Spinner as StyledSpinner } from './styled';

/** Loading spinner, frequently displayed as a placeholder when loading data */
export function LoadingSpinner({ variant: propsVariant, small, medium, large, ...props }) {
	const variant = getVariation(propsVariant, { small, medium, large }) ?? undefined;

	return <StyledSpinner variant={variant} {...props} />;
}

LoadingSpinner.propTypes = {
	variant: PropTypes.oneOfType([
		PropTypes.oneOf(['small', 'medium', 'large']),
		PropTypes.arrayOf(PropTypes.oneOf(['small', 'medium', 'large'])),
	]),
	/** 4px border thickness, 12px height (deprecated in favor of the variant prop) */
	small: PropTypes.bool,
	/** 8px border thickness, 48px height (deprecated in favor of the variant prop) */
	medium: PropTypes.bool,
	/** 12px border thickness, 96px height (deprecated in favor of the variant prop) */
	large: PropTypes.bool,
	...styledSystemPropTypes.layout,
	...styledSystemPropTypes.position,
};
