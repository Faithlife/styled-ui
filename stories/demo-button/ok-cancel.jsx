import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import styles from './story-styles.less';

export default class DemoContainer extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		onClick: PropTypes.func.isRequired,
		theme: PropTypes.object,
	};

	state = {
		clicked: false,
	};

	onClick = () => {
		this.setState(state => ({
			clicked: !state.clicked,
		}));

		this.props.onClick();
	};

	render() {


		return (
			<div className={styles.demos}>
				<div className={styles.demoRow}>
					<Button
						onClick={this.onClick}
						theme={this.props.theme}
						variations={['secondary', 'large']}
					>
						Cancel
				</Button>
				</div>
				<div className={styles.demoRow}>
					<Button
						onClick={this.onClick}
						theme={this.props.theme}
						variations={['primary', 'large']}
					>
						Okay
				</Button>
				</div>
			</div >
		);
	}
}
