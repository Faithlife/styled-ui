import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { applyVariations } from '../utils';
import * as Styled from './styled.jsx';

function DemoComponent({ children, variations, buttonProps, theme }) {
	const MappedStyledComponent = applyVariations(Styled.Button, Styled.variationMap, variations);

	return (
		<MappedStyledComponent theme={theme} {...buttonProps || {}}>
			{children}
		</MappedStyledComponent>
	);
}

DemoComponent.propTypes = forbidExtraProps({
	children: PropTypes.node.isRequired,
	theme: PropTypes.object,
	variations: PropTypes.array,
	buttonProps: PropTypes.object,
});

DemoComponent.defaultProps = {
	theme: {
		default: '#278ed4',
		hover: '#6db3e2',
		active: '#1d6ca1',
		disabled: '#bedcf2',
	},
};

export default DemoComponent;
