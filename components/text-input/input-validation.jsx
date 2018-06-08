import { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

/**
 * A valided input component, which uses <TextInput.Input /> a render prop.
 */
export default class Validation extends Component {
	static propTypes = {
		/** Function that returns a validation result, or a Promise for the validation result, in the shape of:
		 * {
		 *   isValid: (true|false),
		 *   validationErrorString: (string), // Error message to show if validation failed
		 */
		getIsValidInput: PropTypes.func,
		/** Function that returns an object. isValid and inputValue won't be set at the same time, because of input debouncing
		 * {
		 *   isValid: (true|false),
		 *   inputValue: (string),
		 * }
		 */
		onChange: PropTypes.func.isRequired,
		/** Called if the 'Enter' key is pressed */
		onEnter: PropTypes.func,
		/** Function that returns <TextInput.Input {...props} /> with the provided props, combined with any input-specific props */
		renderInput: PropTypes.func.isRequired,
		/** Milliseconds to wait before validating the changed input. Defaults to 0 */
		validationDelay: PropTypes.number,
		/** A generic error to display if the validation promise was rejected. */
		validationFailureString: PropTypes.string,
		/** The controlled input value. */
		value: PropTypes.string,
	};

	static defaultProps = {
		validationDelay: 0,
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

	componentWillUnmount() {
		this.debouncedHandleChange.cancel();
	}

	debouncedHandleChange = debounce(inputValue => {
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

					this.props.onChange({ isValid });
					this.setState({
						isValid,
						showValidationIndicators: inputValue !== '' || !isValid,
						validationFailure: false,
						validationErrorString,
					});
				},
				() => {
					this.props.onChange({ isValid: false });
					this.setState({
						isValid: false,
						showValidationIndicators: true,
						validationFailure: true,
					});
				},
			);
		}
	}, this.props.validationDelay);

	handleChange = event => {
		this.props.onChange({ inputValue: event.target.value });
		this.debouncedHandleChange(event.target.value);
	};

	handleKeyPress = e => {
		const { onEnter } = this.props;
		if (onEnter && e.key === 'Enter') {
			onEnter();
		}
	};

	render() {
		let showValidationSuccess = false;
		let showValidationError = false;

		if (this.state.showValidationIndicators) {
			showValidationSuccess = this.state.isValid;
			showValidationError = !this.state.isValid;
		}

		const validationErrorString = showValidationError
			? this.state.validationFailure
				? this.props.validationFailureString
				: this.state.validationErrorString
			: null;

		return this.props.renderInput({
			onChange: this.handleChange,
			onKeyPress: this.handleKeyPress,
			showValidationSuccess,
			showValidationError,
			validationErrorString,
			value: this.props.value,
		});
	}
}
