import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import debounce from 'lodash.debounce';
import { Exclamation, Check } from '../icons';
import * as Styled from './styled.jsx';

/**
 * Text input control with validation indicators
 * Intended to be used with <TextInput.Validation />, but can also be used by itself.
 * Any extra props will be passed along to the underlying `input` (eg placeholder)
 */
export default class Input extends React.Component {
	static propTypes = {
		/** Inline help text to display next to the title */
		help: PropTypes.node,
		/** Show the validation error icon */
		showValidationError: PropTypes.bool,
		/** Show the validation success icon */
		showValidationSuccess: PropTypes.bool,
		/** Customizable theme properties */
		theme: PropTypes.object,
		/** Title string, appears above the input */
		title: PropTypes.string,
		/** An error message to show when validation fails */
		validationErrorString: PropTypes.string,
		/** The input value, converts to empty string if null or undefined */
		value: PropTypes.string.isRequired,
		/** Returns a string with the current input value */
		onChange: PropTypes.func.isRequired,
		/** Milliseconds to wait before validating the changed input. Defaults to 0 */
		debounce: PropTypes.number,
	};

	static defaultProps = {
		theme: {
			background: 'white',
			text: 'black',
		},
		debounce: 0,
	};

	state = {
		value: this.props.value || '',
	};

	componentWillUnmount() {
		this.debouncedHandleChange.cancel();
	}

	debouncedHandleChange = debounce(inputValue => {
		this.props.onChange(inputValue);
	}, this.props.debounce);

	focus = () => {
		this.input.focus();
	};

	handleChange = event => {
		this.setState({ value: event.target.value });
		this.debouncedHandleChange(event.target.value);
	};

	render() {
		const {
			help,
			theme,
			title,
			validationErrorString,
			showValidationSuccess,
			showValidationError,
			...inputProps
		} = this.props;

		return (
			<ThemeProvider theme={theme}>
				<Styled.Label>
					{title && (
						<Styled.Title>
							<div>
								<span>{title}</span>
							</div>
							{help && <div>{help}</div>}
						</Styled.Title>
					)}
					<Styled.InputContainer>
						<Styled.TextInput
							{...inputProps}
							onChange={this.handleChange}
							innerRef={input => {
								this.input = input;
							}}
							type="text"
							value={this.state.value || ''}
						/>

						{showValidationError && (
							<Styled.StyledIcon>
								<Exclamation />
							</Styled.StyledIcon>
						)}

						{showValidationSuccess && (
							<Styled.StyledIcon>
								<Check />
							</Styled.StyledIcon>
						)}
					</Styled.InputContainer>
					{showValidationError &&
						validationErrorString && <Styled.ErrorTag>{validationErrorString}</Styled.ErrorTag>}
				</Styled.Label>
			</ThemeProvider>
		);
	}
}
