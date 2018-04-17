import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { forbidExtraProps } from 'airbnb-prop-types';
import styled from 'styled-components';
import { Exclamation, Check } from '../icons';
import { thickness, fonts, colors, inputColors } from '../shared-styles';

const Label = styled.label`
	display: block;
	margin-bottom: ${thickness.four}
	width: 100%;
`;

const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${thickness.two};
`;

const Required = styled.span`
	margin-left: ${thickness.two};
`;

const InputContainer = styled.div`
	position: relative;
`;

const textWithError = `
	border-color: ${colors.red};
	padding-right: ${thickness.five};
`;

const textWithSuccess = `
	padding-right: ${thickness.five};
`;

const TextInput = styled.input`
	display: flex;
	box-sizing: border-box;
	border: solid 1px ${colors.borderColor};
	border-radius: 3px;
	padding: ${thickness.two};
	width: 100%;
	background-color: ${colors.shade0};

	&:focus {
		box-shadow: 0px 0px 0px 2px ${inputColors.inputFocusedShadowColor};
		border-color: ${inputColors.inputFocusedBorderColor};
		outline: none;
		margin-bottom: 0px;

		& + .input__faithlife-tag {
			visibility: visible;
		}
	}

	&:disabled {
		opacity: 0.5;
	}

	&::placeholder {
		color: ${colors.shade35};
		font-style: italic;
	}

	${props => (props.hasError ? textWithError : textWithSuccess)};
`;

const StyledIcon = styled.div`
	& svg {
		position: absolute;
		top: 50%;
		right: 4px;
		transform: translateY(-50%);
	}
`;

const ErrorTag = styled.div`
	margin-top: ${thickness.two}
	color: ${colors.red};
	${fonts.b4};
`;

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

		return (
			<Label>
				{title && (
					<Title>
						<div>
							<span>{title}</span>
							{isRequiredField ? <Required>*</Required> : null}
						</div>
						{help && <div>{help}</div>}
					</Title>
				)}
				<InputContainer>
					<TextInput
						ref={input => {
							this.input = input;
						}}
						type="text"
						value={value || ''}
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress}
						{...inputProps || {}}
					/>

					{showValidationIndicators &&
						hasError && (
							<StyledIcon>
								<Exclamation />
							</StyledIcon>
						)}

					{showValidationIndicators &&
						!hasError &&
						value && (
							<StyledIcon>
								<Check />
							</StyledIcon>
						)}
				</InputContainer>
				{showValidationIndicators && hasError && <ErrorTag>{errorString}</ErrorTag>}
			</Label>
		);
	}
}
