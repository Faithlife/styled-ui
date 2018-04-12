import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { themeClassNames } from '../utils';
import baseTheme from './base-theme.less';

export default function DemoComponent(props) {
	return (
		<button
			className={themeClassNames(baseTheme, props.theme, props.variations || ['primary'])}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}

DemoComponent.propTypes = forbidExtraProps({
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	theme: PropTypes.object,
	variations: PropTypes.array,
});
