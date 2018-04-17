import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Button } from '../../components';
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
		this.setState({ inputValue: newState.inputValue, hasError: newState.hasError });
	};

	render() {
		return (
			<div className={styles.demos}>
				<div className={styles.demoRow}>
					<TextInput
						value={this.state.inputValue}
						onChange={this.onChange}
						getIsValidInput={this.props.demoValidation ? value => value !== 'error' : null}
						title="Location"
						help={<span>Try typing 'error'</span>}
						theme={this.props.theme}
						inputProps={{ placeholder: 'Bellingham' }}
						isRequiredField
						validationDelay={this.props.validationDelay}
						errorString="Sorry, that location could not be validated."
					/>
				</div>
				<div className={styles.demoRow}>
					<Button
						buttonProps={{ disabled: this.state.hasError }}
						variations={[Button.variations.primary, Button.variations.medium]}
					>
						Save
					</Button>
				</div>
			</div>
		);
	}
}
