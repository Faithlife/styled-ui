import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '.';

/**
 * A valided input component, which uses <TextInput.Input /> a render prop.
 */
export default class ValidatedInput extends Component {
	static propTypes = {
		/** Function that returns a validation result, or a Promise for the validation result, in the shape of:
		 * {
		 *   isValid: (true|false),
		 *   validationErrorString: (string), // Error message to show if validation failed
		 */
		getIsValidInput: PropTypes.func,
		/** Function that returns the value without waiting for validation. */
		onChange: PropTypes.func.isRequired,
		/** Function that returns an object with the validated input. isValid and inputValue won't be set at the same time, because of input debouncing
		 * {
		 *   isValid: (true|false),
		 *   inputValue: (string),
		 * }
		 */
		onValidationChange: PropTypes.func.isRequired,
		/** A generic error to display if the validation promise was rejected. */
		validationFailureString: PropTypes.string,
		/** The controlled input value. */
		value: PropTypes.string,
	};

	static defaultProps = {
		validationFailureString: 'Sorry, there a problem. Please try again.',
	};

	componentWillReceiveProps(props) {
		if (props.value !== this.props.value) {
			this.setState({ showValidationIndicators: false, validationFailure: false });
		}
	}

	state = {
		isValid: false,
		showValidationIndicators: false,
	};

	handleChange = inputValue => {
		if (this.props.onChange) {
			this.props.onChange(inputValue);
		}
		this._inputValue = inputValue;

		this.setState({ showValidationIndicators: false });
		if (this.props.getIsValidInput != null) {
			const valdiationResult = this.props.getIsValidInput(inputValue);
			const validationPromise =
				typeof valdiationResult.then === 'function'
					? valdiationResult
					: Promise.resolve(valdiationResult);

			validationPromise.then(
				({ isValid, validationErrorString }) => {
					if (this._inputValue !== inputValue) {
						return;
					}

					this.props.onValidationChange({ isValid, inputValue });
					this.setState({
						isValid,
						showValidationIndicators: inputValue !== '' || !isValid,
						validationFailure: false,
						validationErrorString,
					});
				},
				() => {
					this.props.onValidationChange({ isValid: false, inputValue });
					this.setState({
						isValid: false,
						showValidationIndicators: true,
						validationFailure: true,
					});
				},
			);
		}
	};

	render() {
		let showValidationSuccess = false;
		let showValidationError = false;

		const {
			getIsValidInput /* eslint-disable-line no-unused-vars */,
			onChange /* eslint-disable-line no-unused-vars */,
			validationFailureString /* eslint-disable-line no-unused-vars */,
			onValidationChange /* eslint-disable-line no-unused-vars */,
			...inputProps
		} = this.props;

		if (this.state.showValidationIndicators) {
			showValidationSuccess = this.state.isValid;
			showValidationError = !this.state.isValid;
		}

		const validationErrorString = showValidationError
			? this.state.validationFailure
				? this.props.validationFailureString
				: this.state.validationErrorString
			: null;

		return (
			<Input
				{...inputProps}
				onChange={this.handleChange}
				showValidationSuccess={showValidationSuccess}
				showValidationError={showValidationError}
				validationErrorString={validationErrorString}
			/>
		);
	}
}
