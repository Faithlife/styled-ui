import React from 'react';
import PropTypes from 'prop-types';
import { applyVariations, getVariations } from '../utils';
import * as Styled from './styled.jsx';

function DemoComponent({ children, variations, theme, ...buttonProps }) {
	const MappedStyledComponent = applyVariations(Styled.Button, Styled.variationMap, variations);

	return (
		<MappedStyledComponent theme={theme} {...buttonProps || {}}>
			{children}
		</MappedStyledComponent>
	);
}

DemoComponent.propTypes = {
	children: PropTypes.node.isRequired,
	theme: PropTypes.object,
	variations: PropTypes.array,
};

DemoComponent.defaultProps = {
	theme: {
		default: '#278ed4',
		hover: '#6db3e2',
		active: '#1d6ca1',
		disabled: '#bedcf2',
	},
	type: 'button',
};

DemoComponent.variations = getVariations(Styled.variationMap);

export default DemoComponent;
