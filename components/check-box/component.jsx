import React from 'react';
import PropTypes from 'prop-types';
import { themeClassNames } from '../utils';

import styles from './styles.less';

export default function Checkbox({ onChange, title, isChecked, theme }) {
	const getClassName = (...classNames) => themeClassNames(styles, theme, classNames);

	return (
		<button
			className={getClassName('container', 'buttonReset')}
			onClick={() => onChange(!isChecked)}
		>
			<div className={getClassName('checkbox')}>
				<div className={getClassName(isChecked ? 'checkedIndicator' : 'checkIndicator')} />
			</div>
			{title && <div className={getClassName('label')}>{title}</div>}
		</button>
	);
}

Checkbox.propTypes = {
	onChange: PropTypes.func.isRequired,
	title: PropTypes.string,
	isChecked: PropTypes.bool,
	theme: PropTypes.string,
};
