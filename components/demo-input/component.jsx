import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { forbidExtraProps } from 'airbnb-prop-types';
import { themeClassNames } from '../utils';
import { Exclamation, Check } from '../icons';
import baseTheme from './base-theme.less';

// Ported from https://git/Logos/Sites.Admin/blob/db17162da13a47c82eea000cfdd6384e8a174874/src/Sites.Admin/Private/scripts/components/input/index.jsx
export default class Input extends React.PureComponent {
	static propTypes = forbidExtraProps({
		errorString: PropTypes.string,
		getIsValidInput: PropTypes.func,
		help: PropTypes.node,
		isRequiredField: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		onEnter: PropTypes.func,
		shouldFocus: PropTypes.bool,
		theme: PropTypes.object,
		title: PropTypes.string,
		validationDelay: PropTypes.number,
		value: PropTypes.string.isRequired,
		inputProps: PropTypes.object,
	});

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
		this.handleShowValidationIndicators.cancel();
	}

	handleShowValidationIndicators = debounce(() => {
		this.setState({ showValidationIndicators: true });
	}, this.props.validationDelay);

	handleChange = event => {
		const inputValue = event.target.value;

		if (this.props.getIsValidInput != null) {
			const hasError = inputValue !== '' && !this.props.getIsValidInput(inputValue);
			this.props.onChange({ hasError, inputValue });

			if (this.props.validationDelay) {
				this.setState({ hasError, showValidationIndicators: false });
				this.handleShowValidationIndicators();
			} else {
				this.setState({ hasError, showValidationIndicators: true });
			}
		} else {
			this.props.onChange({ inputValue });
		}
	};

	handleKeyPress = e => {
		const { onEnter } = this.props;
		if (onEnter && e.key === 'Enter') {
			onEnter();
		}
	};

	render() {
		const { errorString, help, isRequiredField, theme, title, value, inputProps } = this.props;

		const { showValidationIndicators, hasError } = this.state;

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
						className={getClassName('text', hasError ? 'textError' : 'textSuccess')}
						type="text"
						value={value || ''}
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress}
						{...inputProps || {}}
					/>

					{showValidationIndicators &&
						hasError && <Exclamation className={getClassName('errorIcon')} />}

					{showValidationIndicators &&
						!hasError &&
						value && <Check className={getClassName('successIcon')} />}
				</div>
				{showValidationIndicators &&
					hasError && <div className={getClassName('errorTag', 'b4')}>{errorString}</div>}
			</label>
		);
	}
}
