import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { ThemeProvider } from 'styled-components';
import { Exclamation, Check } from '../icons';
import { localization } from '../utils';
import * as Styled from './styled.jsx';

// Ported from https://git/Logos/Sites.Admin/blob/db17162da13a47c82eea000cfdd6384e8a174874/src/Sites.Admin/Private/scripts/components/input/index.jsx
export default class Input extends React.PureComponent {
	static propTypes = {
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
		validationFailureString: PropTypes.string,
	};

	static defaultProps = {
		theme: {
			background: 'white',
			text: 'black',
		},
		validationDelay: 0,
		validationFailureString: localization.validationError,
	};

	state = {
		hasError: false,
		showValidationIndicators: false,
		validationFailure: false,
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
					this.setState({ hasError, showValidationIndicators: true });
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
		const {
			errorString,
			help,
			isRequiredField,
			theme,
			title,
			value,
			validationFailureString,
			...inputProps
		} = this.props;

		const { showValidationIndicators, hasError, validationFailure } = this.state;

		return (
			<ThemeProvider theme={theme}>
				<Styled.Label>
					{title && (
						<Styled.Title>
							<div>
								<span>{title}</span>
								{isRequiredField ? <Styled.Required>*</Styled.Required> : null}
							</div>
							{help && <div>{help}</div>}
						</Styled.Title>
					)}
					<Styled.InputContainer>
						<Styled.TextInput
							{...inputProps}
							ref={input => {
								this.input = input;
							}}
							type="text"
							value={value || ''}
							onChange={this.handleChange}
							onKeyPress={this.handleKeyPress}
						/>

						{showValidationIndicators &&
							hasError && (
								<Styled.StyledIcon>
									<Exclamation />
								</Styled.StyledIcon>
							)}

						{showValidationIndicators &&
							!hasError && (
								<Styled.StyledIcon>
									<Check />
								</Styled.StyledIcon>
							)}
					</Styled.InputContainer>
					{validationFailure ? (
						<Styled.ErrorTag>{validationFailureString}</Styled.ErrorTag>
					) : showValidationIndicators && hasError ? (
						<Styled.ErrorTag>{errorString}</Styled.ErrorTag>
					) : null}
				</Styled.Label>
			</ThemeProvider>
		);
	}
}
