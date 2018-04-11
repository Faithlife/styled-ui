import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './component.jsx';

export default class Container extends Component {
	static propTypes = {
		theme: PropTypes.object,
		validationDelay: PropTypes.number,
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
			<div style={{ width: '300px', fontFamily: 'sans-serif' }}>
				<Input
					{...this.state}
					onChange={this.onChange}
					getIsValidInput={value => value !== 'error'}
					title="Location"
					help={<span>Try typing 'error'</span>}
					autoFocus
					theme={this.props.theme}
					isRequiredField
					validationDelay={this.props.validationDelay}
					showNegativeValidationIcon
					showPositiveValidationIcon
				/>
			</div>
		);
	}
}
