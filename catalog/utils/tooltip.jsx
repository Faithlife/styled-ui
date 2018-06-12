/* eslint-disable no-underscore-dangle */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AnimatedTextWrapper = styled.div`
	position: absolute;
	background: white;
	border: 1px solid gray;
	border-radius: 2px;
	opacity: ${props => (props.isExpanded ? '1' : '0')};
	transition: opacity 0.2s ease-out,
		transform 0s linear ${props => (props.isExpanded ? '0s' : '0.2s')};
	transform: ${props => (props.isExpanded ? 'scaleY(1)' : 'scaleY(0)')};
	padding: 8px;
	min-width: 200px;
	box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.4);
`;

export default class Tooltip extends Component {
	static propTypes = {
		renderButton: PropTypes.func,
		children: PropTypes.node.isRequired,
	};

	state = { isExpanded: false };

	componentDidMount() {
		window.addEventListener('click', this.handleWindowClick);
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.handleWindowClick);
	}

	handleWindowClick = e => {
		if (this._ref && !this._ref.contains(e.target)) {
			this.setState({ isExpanded: false });
		}
	};

	handleButtonClick = () =>
		this.setState(prevState => ({
			isExpanded: !prevState.isExpanded,
		}));

	render() {
		return (
			<div
				ref={ref => {
					this._ref = ref;
				}}
			>
				{this.props.renderButton &&
					this.props.renderButton({ handleButtonClick: this.handleButtonClick })}
				<AnimatedTextWrapper isExpanded={this.state.isExpanded}>
					{this.props.children}
				</AnimatedTextWrapper>
			</div>
		);
	}
}
