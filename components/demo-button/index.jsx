import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';
import classNames from 'classnames';

export default class DemoButton extends Component {
	propTypes = {
		children: PropTypes.node.isRequired,
		onClick: PropTypes.func,
	};

	state = {
		clicked: false,
	};

	handleClick = () => {
		this.setState(
			state => ({
				clicked: !state.clicked,
			}),
			this.props.onClick,
		);
	};

	render() {
		return (
			<button
				className={classNames(styles.demoButton, this.state.clicked && styles.clicked)}
				onClick={this.handleClick}
			>
				{this.props.children}
			</button>
		);
	}
}
