import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../components/check-box/component.jsx';
import styles from './story-styles.less';

class State extends React.Component {
	static propTypes = {
		render: PropTypes.func.isRequired,
		initialState: PropTypes.object,
	};

	state = {
		childProps: this.props.initialState,
	};

	updateState = state => {
		this.setState(({ childProps }) => ({
			childProps: {
				...childProps,
				...state,
			},
		}));
	};

	render() {
		return this.props.render(this.state.childProps, this.updateState);
	}
}

export default function Container({ theme }) {
	return (
		<div className={styles.demos}>
			<State
				initialState={{ isChecked: false, title: 'Check this' }}
				render={({ isChecked, title }, updateState) => (
					<Checkbox
						onChange={checked => {
							updateState({ isChecked: checked });
						}}
						isChecked={isChecked}
						title={title}
						theme={theme}
					/>
				)}
			/>
		</div>
	);
}

Container.propTypes = {
	theme: PropTypes.object,
};
