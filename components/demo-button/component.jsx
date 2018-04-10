import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNames from 'classnames';

function getStyles(baseTheme, overridenTheme, propertyNames) {
	return classNames(
		propertyNames.reduce(
			(accumulator, currentValue) =>
				accumulator.concat([baseTheme[currentValue], (overridenTheme || {})[currentValue]]),
			[],
		),
	);
}

export default function DemoComponent(props) {
	return (
		<button
			className={getStyles(styles, props.theme, ['demoButton', props.clicked && 'clicked'])}
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
