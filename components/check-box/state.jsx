import React from 'react';
import PropTypes from 'prop-types';

export default class State extends React.Component {
	static propTypes = {
		render: PropTypes.func.isRequired,
		initialState: PropTypes.object,
	}

	state = {
		childProps: this.props.initialState,
	}

	updateState = (state) => {
		this.setState(({ childProps }) => ({
			childProps: {
				...childProps,
				...state,
			}
		}));
	};

	render() {
		return this.props.render(this.state.childProps, this.updateState);
	}
}
