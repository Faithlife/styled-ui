import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from '../../components';
import styles from './story-styles.less';

export default class Container extends Component {
	static propTypes = {
		theme: PropTypes.object,
		validationDelay: PropTypes.number,
		demoValidation: PropTypes.bool,
	};

	state = {
		inputValue: '',
		hasError: false,
	};

	onChange = newState => {
		if (newState.inputValue != null) {
			this.setState({ inputValue: newState.inputValue });
		}
		if (newState.hasError != null) {
			this.setState({ hasError: newState.hasError });
		}
	};

	render() {
		return (
			<div className={styles.demos}>
				<div className={styles.demoRow}>
					<Input
						inputValue={this.state.inputValue}
						onChange={this.onChange}
						getIsValidInput={this.props.demoValidation ? value => value !== 'error' : null}
						title="Location"
						help={<span>Try typing 'error'</span>}
						autoFocus
						theme={this.props.theme}
						isRequiredField
						validationDelay={this.props.validationDelay}
						errorString="Sorry, that location could not be validated."
					/>
				</div>
				<div className={styles.demoRow}>
					<Button buttonProps={{ disabled: this.state.hasError }} onClick={() => {}}>
						Save
					</Button>
				</div>
			</div>
		);
	}
}
