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
		const variationExamples = [
			['primary', 'small'],
			['primary', 'large'],
			['primary', 'extraLarge'],
			['primary', 'primaryDisabled', 'small'],
			['primary', 'primaryDisabled', 'large'],
			['primary', 'primaryDisabled', 'extraLarge'],
			['secondary', 'small'],
			['secondary', 'large'],
			['secondary', 'extraLarge'],
		];

		return (
			<div className={styles.demos}>
				{variationExamples.map((variation, index) => (
					<div key={index} className={styles.demoRow}>
						<Button
							onClick={this.onClick}
							theme={this.props.theme}
							variations={[...variation, this.state.clicked && 'clicked']}
						>
							{this.props.children}
						</Button>
					</div>
				))}
			</div>
		);
	}
}
