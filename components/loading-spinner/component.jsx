import React from 'react';
import PropTypes from 'prop-types';
import { applyVariations } from '../utils';
import { colors } from '../shared-styles';
import * as Styled from './styled.jsx';

/** Loading spinner, frequently displayed as a placeholder when loading data */
export function LoadingSpinner({ style, ...restProps }) {
	const { component: MappedStyledComponent, filteredProps } = applyVariations(
		Styled.Spinner,
		Styled.variationMap,
		restProps,
	);

	return <MappedStyledComponent {...filteredProps || {}} />;
}

LoadingSpinner.propTypes = {
	/** Ignored */
	style: PropTypes.object,
	/** 4px border thickness, 12px height */
	small: PropTypes.bool,
	/** 8px border thickness, 48px height*/
	medium: PropTypes.bool,
	/** 12px border thickness, 96px height */
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
