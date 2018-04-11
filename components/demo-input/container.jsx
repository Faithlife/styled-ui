import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './component.jsx';

export default class Container extends Component {
	static propTypes = {
		theme: PropTypes.object,
	};

	state = {
		inputValue: '',
		hasError: false,
		showValidationIndicators: false,
	};

	onChange = newState => {
		if (newState.inputValue != null) {
			this.setState({ inputValue: newState.inputValue });
		}
		if (newState.hasError != null) {
			this.setState({ hasError: newState.hasError });
		}
		if (newState.showValidationIndicators != null) {
			this.setState({ showValidationIndicators: newState.showValidationIndicators });
		}
	};

	renderSubText = title => `You are also editing your Faithlife Group's ${title}`;

	render() {
		return (
			<div style={{ width: '300px' }}>
				<Input
					{...this.state}
					onChange={this.onChange}
					getIsValidInput={value => value !== 'error'}
					renderSubText={this.renderSubText}
					title="location"
					autoFocus
					theme={this.props.theme}
					isRequiredField
					validationDelay={100}
					showNegativeValidationIcon
					showPositiveValidationIcon
				/>
			</div>
		);
	}
}