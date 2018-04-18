import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { ThemeProvider } from 'styled-components';
import { Exclamation, Check } from '../icons';
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
	};

	static defaultProps = {
		theme: {
			background: 'white',
			text: 'black',
		},
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
		const { errorString, help, isRequiredField, theme, title, value, ...inputProps } = this.props;

		const { showValidationIndicators, hasError } = this.state;

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
							!hasError &&
							value && (
								<Styled.StyledIcon>
									<Check />
								</Styled.StyledIcon>
							)}
					</Styled.InputContainer>
					{showValidationIndicators && hasError && <Styled.ErrorTag>{errorString}</Styled.ErrorTag>}
				</Styled.Label>
			</ThemeProvider>
		);
	}
}
