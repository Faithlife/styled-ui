import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { themeClassNames } from '../utils';
import { Exclamation, Check } from '../icons';
import baseTheme from './base-theme.less';

// Ported from https://git/Logos/Sites.Admin/blob/db17162da13a47c82eea000cfdd6384e8a174874/src/Sites.Admin/Private/scripts/components/input/index.jsx
export default class Input extends React.PureComponent {
	static propTypes = {
		autoFocus: PropTypes.bool,
		errorString: PropTypes.string,
		getIsValidInput: PropTypes.func,
		hasError: PropTypes.bool,
		help: PropTypes.node,
		inputValue: PropTypes.string,
		isRequiredField: PropTypes.bool,
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onEnter: PropTypes.func,
		onFocus: PropTypes.func,
		placeholder: PropTypes.string,
		title: PropTypes.string,
		validationDelay: PropTypes.number,
		isDisabled: PropTypes.bool,
		shouldFocus: PropTypes.bool,
		theme: PropTypes.object,
	};

	state = {
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
		this.handleShowValidationIndicators.cancel();
	}

	validateInput = (getIsValidInput, inputValue) => {
		const { validationDelay } = this.props;
		const hasError = inputValue && !getIsValidInput(inputValue);
		if (validationDelay) {
			this.props.onChange({ hasError });
			this.setState({ showValidationIndicators: false });
			this.handleShowValidationIndicators();
		} else {
			this.props.onChange({ hasError });
			this.setState({ showValidationIndicators: true });
		}
	};

	handleShowValidationIndicators = debounce(() => {
		this.setState({ showValidationIndicators: true });
	}, this.props.validationDelay);

	handleChange = event => {
		const inputValue = event.target.value;
		this.validateInput(this.props.getIsValidInput, inputValue);
		this.props.onChange({ inputValue });
	};

	handleKeyPress = e => {
		const { onEnter } = this.props;
		if (onEnter && e.key === 'Enter') {
			onEnter();
		}
	};

	handleOnBlur = event => {
		const { onBlur } = this.props;
		if (onBlur) {
			onBlur(event.target.value);
		}
	};

	render() {
		const {
			title,
			autoFocus,
			placeholder,
			errorString,
			help,
			isRequiredField,
			isDisabled,
			onFocus,
			hasError,
			inputValue,
			theme,
		} = this.props;

		const { showValidationIndicators } = this.state;

		const getClassName = (...classNames) => themeClassNames(baseTheme, theme, classNames);

		return (
			<label className={getClassName('input')}>
				{title && (
					<div className={getClassName('title')}>
						<div>
							<span>{title}</span>
							{isRequiredField ? <span className={getClassName('required')}>*</span> : null}
						</div>
						{help && <div>{help}</div>}
					</div>
				)}
				<div className={getClassName('inputContainer')}>
					<input
						ref={input => {
							this.input = input;
						}}
						autoFocus={autoFocus}
						className={getClassName('text', hasError ? 'textError' : 'textSuccess')}
						type="text"
						placeholder={placeholder || ''}
						value={inputValue || ''}
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress}
						onBlur={this.handleOnBlur}
						onFocus={onFocus}
						disabled={isDisabled}
					/>

					{showValidationIndicators &&
						hasError && <Exclamation className={getClassName('errorIcon')} />}

					{showValidationIndicators &&
						!hasError &&
						inputValue && <Check className={getClassName('successIcon')} />}
				</div>
				{showValidationIndicators &&
					hasError && <div className={getClassName('errorTag', 'b4')}>{errorString}</div>}
			</label>
		);
	}
}
