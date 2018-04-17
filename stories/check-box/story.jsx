import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Checkbox } from '../../components';

const Demos = styled.div`
	display: flex;
`;

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
		<Demos>
			<State
				initialState={{ isChecked: false, title: 'Check this' }}
				render={({ isChecked, title }, updateState) => (
					<Checkbox
						onClick={() => updateState({ isChecked: !isChecked })}
						isChecked={isChecked}
						title={title}
						theme={theme}
					/>
				)}
			/>
		</Demos>
	);
}

Container.propTypes = {
	theme: PropTypes.object,
};
