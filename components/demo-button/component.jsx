import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { themeClassNames } from '../utils';
import baseTheme from './base-theme.less';

export default function DemoComponent({ theme, variations, onClick, children, buttonProps = {} }) {
	return (
		<button
			className={themeClassNames(baseTheme, theme, variations || ['primary'])}
			onClick={onClick}
			{...buttonProps}
		>
			{children}
		</button>
	);
}

DemoComponent.propTypes = forbidExtraProps({
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	theme: PropTypes.object,
	variations: PropTypes.array,
	buttonProps: PropTypes.object,
});
