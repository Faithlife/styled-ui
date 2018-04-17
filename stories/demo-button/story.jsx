import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button } from '../../components';
import styles from './story-styles.less';
import docs from './demo-button.md';

export default class DemoContainer extends Component {
	static propTypes = {
		onClick: PropTypes.func.isRequired,
		theme: PropTypes.object,
	};

	renderButtonsRow = renderButton => {
		const buttonMargins = ['small', 'medium', 'large', 'extraLarge'];
		return (
			<div className={styles.demoRow}>
				{buttonMargins.map(buttonMargin => (
					<div key={buttonMargin} className={cn(styles.buttonWrapper, styles.buttonFlex)}>
						{renderButton(buttonMargin)}
					</div>
				))}
			</div>
		);
	};

	render() {
		return (
			<div className={styles.demos}>
				{this.renderButtonsRow(marginVariation => (
					<Button
						buttonProps={{ onClick: this.props.onClick }}
						theme={this.props.theme}
						variations={['primary', marginVariation]}
					>
						Primary
					</Button>
				))}
				{this.renderButtonsRow(marginVariation => (
					<Button
						buttonProps={{ onClick: this.props.onClick, disabled: true }}
						theme={this.props.theme}
						variations={['primary', marginVariation]}
					>
						Disabled
					</Button>
				))}
				{this.renderButtonsRow(marginVariation => (
					<Button
						buttonProps={{ onClick: this.props.onClick }}
						theme={this.props.theme}
						variations={['primaryOutline', marginVariation]}
					>
						Secondary
					</Button>
				))}
				<div className={styles.documentation} dangerouslySetInnerHTML={{ __html: docs }} />
			</div>
		);
	}
}
