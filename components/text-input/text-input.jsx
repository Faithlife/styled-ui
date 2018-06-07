import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Exclamation, Check } from '../icons';
import * as Styled from './styled.jsx';

/**
 * Text input control with validation indicators
 * Intended to be used with <TextInput.Validation />, but can also be used by itself.
 * Any extra props will be passed along to the underlying `input` (eg placeholder)
 */
export default class TextInput extends React.PureComponent {
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
	};

	static defaultProps = {
		theme: {
			background: 'white',
			text: 'black',
		},
	};

	focus = () => {
		this.input.focus();
	};

	render() {
		const {
			help,
			theme,
			title,
			value,
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
							innerRef={input => {
								this.input = input;
							}}
							type="text"
							value={value || ''}
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
					{validationErrorString && <Styled.ErrorTag>{validationErrorString}</Styled.ErrorTag>}
				</Styled.Label>
			</ThemeProvider>
		);
	}
}
