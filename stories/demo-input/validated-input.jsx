import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { forbidExtraProps } from 'airbnb-prop-types';
import Input from '../../components/demo-input/component.jsx';

export default class ValidatedInput extends Component {
	static propTypes = forbidExtraProps({
		getIsValidInput: PropTypes.func,
		help: PropTypes.node,
		isRequiredField: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		onEnter: PropTypes.func,
		placeholder: PropTypes.string,
		shouldFocus: PropTypes.bool,
		theme: PropTypes.object,
		title: PropTypes.string,
		validationDelay: PropTypes.number,
		validationErrorString: PropTypes.string,
		validationFailureString: PropTypes.string,
		value: PropTypes.string,
	});

	static defaultProps = {
		validationDelay: 0,
		validationErrorString: "Sorry, this isn't a valid entry. Please try again.",
		validationFailureString: 'Sorry, there was a network problem. Please try again.',
	};

	state = {
		hasError: false,
		showValidationIndicators: false,
	};

	componentDidUpdate(prevProps) {
		const { shouldFocus } = this.props;
		const { shouldFocus: hadFocus } = prevProps;

		if (!hadFocus && shouldFocus) {
			this.input.focus();
		}
	}

	componentWillUnmount() {
		this.debouncedHandleChange.cancel();
	}

	debouncedHandleChange = debounce(inputValue => {
		this._inputValue = inputValue;

		this.setState({ showValidationIndicators: false });
		if (this.props.getIsValidInput != null) {
			this.props.getIsValidInput(inputValue).then(
				isValid => {
					if (this._inputValue !== inputValue) {
						return;
					}

					const hasError = inputValue !== '' && !isValid;

					this.props.onChange({ hasError });
					this.setState({ hasError, showValidationIndicators: true, validationFailure: false });
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
				: this.props.validationErrorString
			: null;

		return (
			<Input
				help={this.props.help}
				isRequiredField={this.props.isRequiredField}
				onChange={this.handleChange}
				onKeyPress={this.handleKeyPress}
				placeholder={this.props.placeholder}
				showValidationError={showValidationError}
				showValidationSuccess={showValidationSuccess}
				theme={this.props.theme}
				title={this.props.title}
				validationErrorString={validationErrorString}
				value={this.props.value}
			/>
		);
	}
}
