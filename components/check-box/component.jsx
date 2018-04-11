import React from 'react';
import PropTypes from 'prop-types';
import { themeClassNames } from '../utils';
import baseTheme from './base-theme.less';

// Ported from https://git/Logos/Sites.Admin/blob/db17162da13a47c82eea000cfdd6384e8a174874/src/Sites.Admin/Private/scripts/components/checkbox/checkbox.jsx
export default function Checkbox({ onChange, title, isChecked, theme }) {
	const getClassName = (...classNames) => themeClassNames(baseTheme, theme, classNames);

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
	theme: PropTypes.object,
};
