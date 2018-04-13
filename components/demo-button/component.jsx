import React from 'react';
import PropTypes from 'prop-types';
import { themeClassNames } from '../utils';
import baseTheme from './base-theme.less';

export default function DemoComponent({ theme, variations, children, ...props }) {
	return (
		<button className={themeClassNames(baseTheme, theme, variations || ['primary'])} {...props}>
			{children}
		</button>
	);
}

DemoComponent.propTypes = {
	children: PropTypes.node.isRequired,
	theme: PropTypes.object,
	variations: PropTypes.array,
};
