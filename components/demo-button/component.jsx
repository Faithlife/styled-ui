import React from 'react';
import PropTypes from 'prop-types';
import { applyVariations } from '../utils';
import * as Styled from './styled.jsx';

/** Standard button with transition styles */
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
	/** The text of the button */
	children: PropTypes.node.isRequired,
	/** An optional theme */
	theme: PropTypes.object,
	/** Primary button variation */
	primary: PropTypes.bool,
	/** Primary outline variation */
	primaryOutline: PropTypes.bool,
	/** Medium variation */
	medium: PropTypes.bool,
	/** Small variation */
	small: PropTypes.bool,
	/** Large variation */
	large: PropTypes.bool,
	/** Extra large variation */
	extraLarge: PropTypes.bool,
	/** The type of button (for instance, submit) */
	type: PropTypes.string,
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
