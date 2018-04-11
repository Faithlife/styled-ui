import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DemoComponent from '../../components/demo-button/component.jsx';
import styles from './story-theme.less';

export default class DemoContainer extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		onClick: PropTypes.func,
		theme: PropTypes.object,
	};

	state = {
		clicked: false,
	};

	onChange = newState => {
		this.setState(
			{
				...newState,
			},
			this.props.onClick,
		);
	};

	render() {
		const variationExamples = [
			['primary', 'small'],
			['primary', 'large'],
			['primary', 'extraLarge'],
			['secondary', 'small'],
			['secondary', 'large'],
			['secondary', 'extraLarge'],
		];

		return (
			<div className={styles.demos}>
				{variationExamples.map((variation, index) => (
					<div key={index} className={styles.demoRow}>
						<DemoComponent
							clicked={this.state.clicked}
							onChange={this.onChange}
							theme={this.props.theme}
							variations={[...variation, this.state.clicked && 'clicked']}
						>
							{this.props.children}
						</DemoComponent>
					</div>
				))}
			</div>
		);
	}
}
