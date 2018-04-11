import React from 'react';
import PropTypes from 'prop-types';
import { themeClassNames } from '../utils';
import baseTheme from './base-theme.less';

export default function DemoComponent(props) {
	return (
		<button
			className={themeClassNames(baseTheme, props.theme, [
				'demoButton',
				props.clicked && 'clicked',
				...(props.variations || []),
			])}
			onClick={() => props.onChange({ clicked: !props.clicked })}
		>
			{props.children}
		</button>
	);
}

DemoComponent.propTypes = {
	children: PropTypes.node.isRequired,
	onChange: PropTypes.func,
	clicked: PropTypes.bool,
	theme: PropTypes.object,
	variations: PropTypes.array,
};
