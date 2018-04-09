import React from 'react';
import PropTypes from 'prop-types';

import State from './state.jsx';
import styles from './styles.less';

const Checkbox = ({
	onChange,
	title,
	isChecked,
	labelClassName,
	className,
	}) => (
		<button className={`${styles.container} ${styles.buttonReset} ${className}`} onClick={() => onChange(!isChecked)}>
			<div className={styles.checkbox}>
				<div className={`${isChecked ? styles.checkedIndicator : styles.checkIndicator}`} />
			</div>
			{title && <div className={`${styles.label} ${labelClassName}`}>{title}</div>}
		</button>
);

Checkbox.propTypes = {
	onChange: PropTypes.func.isRequired,
	title: PropTypes.string,
	isChecked: PropTypes.bool,
	labelClassName: PropTypes.string,
	className: PropTypes.string,
};

export default () => (<State
	initialState={{ isChecked: false, title: 'Check this' }}
	render={({ isChecked, title }, updateState) =>
		<Checkbox onChange={(checked) => { updateState({ isChecked: checked })}} isChecked={isChecked} title={title} />}
/>);
