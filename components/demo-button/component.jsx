import React from 'react';
import PropTypes from 'prop-types';
import { themeClassNames } from '../utils';
import styles from './styles.less';

export default function DemoComponent(props) {
	return (
		<button
			className={themeClassNames(styles, props.theme, ['demoButton', props.clicked && 'clicked'])}
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
};
