import styled from 'styled-components';
import { thickness, fonts, colors, inputColors } from '../shared-styles';

export const Label = styled.label`
	display: block;
	margin-bottom: ${thickness.four};
	width: 100%;
`;

export const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${thickness.four};
`;

export const InputContainer = styled.div`
	position: relative;
`;

export const textWithError = `
	border-color: ${colors.redBase};
	padding-right: ${thickness.twentyfour};
`;

export const textWithSuccess = `
	padding-right: ${thickness.twentyfour};
`;

export const TextInput = styled.input`
	display: flex;
	box-sizing: border-box;
	border: solid 1px ${colors.borderColor};
	border-radius: 3px;
	padding: ${thickness.four};
	width: 100%;
	color: ${props => props.theme.text};
	background-color: ${props => props.theme.background};

	&:focus {
		box-shadow: 0px 0px 0px 2px ${inputColors.inputFocusedShadowColor};
		border-color: ${inputColors.inputFocusedBorderColor};
		outline: none;
		margin-bottom: 0px;
	}

	&:disabled {
		opacity: 0.5;
	}

	&::placeholder {
		color: ${colors.gray35};
		font-style: italic;
	}

	${props => (props.hasError ? textWithError : textWithSuccess)};
`;

export const StyledIcon = styled.div`
	& svg {
		position: absolute;
		top: 50%;
		right: 4px;
		transform: translateY(-50%);
	}
`;

export const ErrorTag = styled.div`
	margin-top: ${thickness.four};
	color: ${colors.redBase};
	${fonts.b4};
`;
