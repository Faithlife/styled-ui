import React from 'react';
import PropTypes from 'prop-types';
import { getVariation } from '../utils';
import { colors } from '../shared-styles';
import { Spinner as StyledSpinner } from './styled';

/** Loading spinner, frequently displayed as a placeholder when loading data */
export function LoadingSpinner({
	variant: propsVariant,
	small,
	medium,
	large,
	theme: overrides,
	...props
}) {
	const variant =
		getVariation(propsVariant, {
			small,
			medium,
			large,
		}) ?? undefined;

	return <StyledSpinner variant={variant} overrides={overrides} {...props} />;
}

LoadingSpinner.propTypes = {
	className: PropTypes.string,
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
	/** Use this to override the height */
	height: PropTypes.number,
	/** Spinner colors */
	theme: PropTypes.shape({
		innerColor: PropTypes.string,
		outerColor: PropTypes.string,
	}),
};

LoadingSpinner.defaultProps = {
	theme: {
		innerColor: colors.blueDark,
		outerColor: colors.gray22,
	},
};
