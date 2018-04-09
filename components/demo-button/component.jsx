import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNames from 'classnames';

export default function DemoComponent(props) {
	return (
		<button
			className={classNames(styles.demoButton, props.clicked && styles.clicked)}
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
};
