import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import styles from './story-styles.less';
import docs from './demo-button.md';

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
			['outlinePrimary', 'small'],
			['secondary', 'small'],
			['outlineSecondary', 'small'],
			['minor', 'small'],

			['primary', 'medium'],
			['outlinePrimary', 'medium'],
			['secondary', 'medium'],
			['outlineSecondary', 'medium'],
			['minor', 'medium'],
			
			['primary', 'large'],
			['outlinePrimary', 'large'],
			['secondary', 'large'],
			['outlineSecondary', 'large'],
			['minor', 'large'],

			['primary', 'super'],
			['outlinePrimary', 'super'],
			['secondary', 'super'],
			['outlineSecondary', 'super'],
			['minor', 'super'],		
		];

		return (
			<div>
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
				<div className={styles.documentation} dangerouslySetInnerHTML={{ __html: docs }} />
			</div>
		);
	}
}
