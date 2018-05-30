import { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { forbidExtraProps } from 'airbnb-prop-types';

export default class InputValidation extends Component {
	static propTypes = forbidExtraProps({
		getIsValidInput: PropTypes.func,
		help: PropTypes.node,
		isRequiredField: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		onEnter: PropTypes.func,
		renderInput: PropTypes.func.isRequired,
		validationDelay: PropTypes.number,
		validationFailureString: PropTypes.string,
		value: PropTypes.string,
	});

	static defaultProps = {
		validationDelay: 0,
		validationFailureString: 'Sorry, there a problem. Please try again.',
	};

	componentWillReceiveProps(props) {
		if (props.value !== this.props.value) {
			this.setState({ hasError: false, showValidationIndicators: false });
		}
	}

	state = {
		hasError: false,
		showValidationIndicators: false,
	};

	componentWillUnmount() {
		this.debouncedHandleChange.cancel();
	}

	debouncedHandleChange = debounce(inputValue => {
		this._inputValue = inputValue;

		this.setState({ showValidationIndicators: false });
		if (this.props.getIsValidInput != null) {
			this.props.getIsValidInput(inputValue).then(
				({ isValid, validationErrorString }) => {
					if (this._inputValue !== inputValue) {
						return;
					}

					const hasError = (this.props.isRequiredField || inputValue !== '') && !isValid;

					this.props.onChange({ hasError });
					this.setState({
						hasError,
						showValidationIndicators: true,
						validationFailure: false,
						validationErrorString,
					});
				},
				() => {
					this.props.onChange({ hasError: true });
					this.setState({
						hasError: true,
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
		let showValidationError = false;
		let showValidationSuccess = false;

		if (this.state.showValidationIndicators) {
			showValidationError = this.state.hasError;
			showValidationSuccess = !this.state.hasError;
		}

		const validationErrorString = showValidationError
			? this.state.validationFailure
				? this.props.validationFailureString
				: this.state.validationErrorString
			: null;

		return this.props.renderInput({
			help: this.props.help,
			isRequiredField: this.props.isRequiredField,
			onChange: this.handleChange,
			onKeyPress: this.handleKeyPress,
			showValidationError,
			showValidationSuccess,
			validationErrorString,
			value: this.props.value,
		});
	}
}
