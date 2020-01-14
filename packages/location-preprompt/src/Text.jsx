import React from 'react';
import PropTypes from 'prop-types';
import { Text as StyledUiText } from '@faithlife/styled-ui';

Text.propTypes = {
	children: PropTypes.node.isRequired,
};
export function Text(props) {
	const { children } = props;
	return (
		<StyledUiText textAlign="center" textStyle="c.16" color="gray66" fontWeight="normal">
			{children}
		</StyledUiText>
	);
}
