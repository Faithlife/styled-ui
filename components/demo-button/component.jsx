import React from 'react';
import PropTypes from 'prop-types';
import { applyVariations } from '../utils';
import * as Styled from './styled.jsx';

function Button({ children, theme, ...buttonProps }) {
	const { component: MappedStyledComponent, filteredProps } = applyVariations(
		Styled.Button,
		Styled.variationMap,
		buttonProps,
	);

	return (
		<MappedStyledComponent theme={theme} {...filteredProps || {}}>
			{children}
		</MappedStyledComponent>
	);
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	theme: PropTypes.object,
	primary: PropTypes.bool,
	primaryOutline: PropTypes.bool,
	medium: PropTypes.bool,
	small: PropTypes.bool,
	large: PropTypes.bool,
	extraLarge: PropTypes.bool,
};

Button.defaultProps = {
	theme: {
		default: '#278ed4',
		hover: '#6db3e2',
		active: '#1d6ca1',
		disabled: '#bedcf2',
	},
	type: 'button',
};

export default Button;
