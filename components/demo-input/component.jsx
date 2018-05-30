import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Exclamation, Check } from '../icons';
import * as Styled from './styled.jsx';

// Ported from https://git/Logos/Sites.Admin/blob/db17162da13a47c82eea000cfdd6384e8a174874/src/Sites.Admin/Private/scripts/components/input/index.jsx
export default class Input extends React.PureComponent {
	static propTypes = {
		help: PropTypes.node,
		isRequiredField: PropTypes.bool,
		showValidationError: PropTypes.bool,
		showValidationSuccess: PropTypes.bool,
		theme: PropTypes.object,
		title: PropTypes.string,
		validationErrorString: PropTypes.string,
		value: PropTypes.string.isRequired,
	};

	static defaultProps = {
		theme: {
			background: 'white',
			text: 'black',
		},
	};

	render() {
		const {
			help,
			isRequiredField,
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
