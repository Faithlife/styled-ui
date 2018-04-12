import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import styles from './story-styles.less';
import docs from './ok-cancel.md';

export default class DemoContainer extends Component {
	static propTypes = {
		onClick: PropTypes.func.isRequired,
		theme: PropTypes.object,
	};

	onClick = () => {
		this.setState(state => ({
			clicked: !state.clicked,
		}));

		this.props.onClick();
	};

	render() {
		return (
			<div>
				<div className={styles.demos}>
					<div className={styles.demoRow}>
						<Button
							onClick={this.onClick}
							theme={this.props.theme}
							variations={['outlinePrimary', 'medium']}
						>
							Cancel
						</Button>
					</div>
					<div className={styles.demoRow}>
						<Button
							onClick={this.onClick}
							theme={this.props.theme}
							variations={['primary', 'medium']}
						>
							Okay
						</Button>
					</div>
				</div>
				<div className={styles.documentation} dangerouslySetInnerHTML={{ __html: docs }} />
			</div>
		);
	}
}
