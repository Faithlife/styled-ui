import styled, { css } from 'styled-components';
import { colors, thickness } from '../shared-styles';
import { resetStyles } from '../utils';

const inputOffset = '-6px';

const selectStyling = css`
	white-space: nowrap;
	min-height: fit-content;
	font-size: ${({ styleOverrides }) => styleOverrides.fontSize || '16px'};
	width: ${({ styleOverrides }) => styleOverrides.width};
	border-bottom: dashed ${thickness.two} ${({ theme }) => theme.underlineColor || colors.blueBase};
	font-weight: bold;
	color: ${colors.gray66};
	${props => `color: ${props.isOpen ? colors.blueActive : colors.gray66}`};

	&:hover {
		&:not(:focus) {
			color: ${({ theme }) => theme.hoverColor || colors.blueBase};
		}
	}

	&:active {
		color: ${({ theme }) => theme.activeColor || colors.blueActive};
	}

	&:focus {
		outline: none;
	}
`;

export const Button = styled.button`
	${resetStyles};

	box-shadow: none;
	cursor: pointer;
	display: inline-block;
	background-color: transparent;
	padding: 0;
	border: none;
	outline: none;

	transition: box-shadow 0.25s ease 0s;

	&:focus {
		&:not(:active) {
			box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		}
		outline: none;
	}
`;

export const ButtonContent = styled.div.attrs({ tabIndex: '-1' })`
	${selectStyling};
`;

export const Container = styled.div`
	display: inline-block;
	position: relative;
	width: ${props => props.width};
`;

export const InputContainer = styled.div`
	z-index: 0;
	position: absolute;
	bottom: ${inputOffset};

	&& > input::-webkit-outer-spin-button, /* Safari Chrome */
	input::-webkit-inner-spin-button {
		appearance: none;
		margin: 0;
	}

	&& > input[type='number'] {
		appearance: textfield; /* Firefox */
	}
`;

export const ParameterSentence = styled.form.attrs({
	role: props => (props.isSearchForm ? 'search' : 'form'),
	'aria-labelledby': ({ labelledBy }) => labelledBy,
})`
	/* stylelint-disable no-empty-block https://github.com/stylelint/stylelint/issues/3494 */
`;

export const Fieldset = styled.fieldset`
	border: none;
	padding: 0;
	margin: 0;
`;

export const Select = styled.select`
	appearance: none;
	user-select: none;
	cursor: pointer;
	border: none;
	background-color: transparent;
	text-align-last: center;

	&::-ms-expand: {
		display: none;
	}

	${selectStyling};

	transition: box-shadow 0.25s ease 0s;

	&:focus {
		&:not(:active) {
			box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		}
		outline: none;
	}
`;
