import styled, { css } from 'styled-components';
import { colors, thickness } from '../shared-styles';
import { resetStyles } from '../utils';

const selectStyling = css`
	white-space: nowrap;
	min-height: fit-content;
	font-size: ${({ styleOverrides }) => styleOverrides.fontSize || '16px'};
	width: ${({ styleOverrides }) => styleOverrides.width};
	border-bottom: dashed ${thickness.two} ${({ theme }) => theme.underlineColor || colors.blueBase};
	font-weight: bold;
	color: ${colors.gray66};
	${props => `color: ${props.isOpen ? colors.blueActive : colors.gray66}`};
	font-family: inherit;
	border-radius: 0;
	line-height: 1;
	padding-bottom: 2px;

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

export const ButtonContent = styled.div.attrs(() => ({ tabIndex: '-1' }))`
	${selectStyling};
`;

export const Container = styled.div`
	display: inline-block;
	position: relative;
	width: ${props => props.width};
`;

export const ParameterSentence = styled.form.attrs(({ isSearchForm, labelledBy }) => ({
	role: isSearchForm ? 'search' : 'form',
	'aria-labelledby': labelledBy,
}))`
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

	${selectStyling};

	transition: box-shadow 0.25s ease 0s;

	&:focus {
		&:not(:active) {
			box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		}
		outline: none;
	}
`;

export const InputContainer = styled.div`
	display: inline-block;
	position: relative;
	width: ${props => props.width};

	${selectStyling};

	border-bottom: ${({ isFocused }) => (isFocused ? 'solid' : 'dashed')} ${thickness.two}
		${({ theme }) => theme.underlineColor || colors.blueBase};

	height: ${({ styleOverrides }) => styleOverrides.fontSize || '16px'};

	&& > input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		appearance: none;
		margin: 0;
	}

	&& > input[type='number'] {
		appearance: textfield; /* Firefox */
	}
`;

export const Input = styled.input`
	&& {
		${resetStyles};

		padding: 0;
		padding-bottom: 0;

		width: ${props => props.styleOverrides.width};
		height: ${({ styleOverrides }) =>
			styleOverrides.fontSize ? `calc(2px + ${styleOverrides.fontSize})` : '18px'};
		line-height: 1;
		font-size: ${({ styleOverrides }) => styleOverrides.fontSize || '16px'};
		font-weight: 600;
		border-radius: 0;

		background-color: transparent;
		border: none;
		box-shadow: none;
		outline: none;

		&:disabled {
			opacity: 0.5;
		}

		&:read-only {
			background: ${colors.gray8};
		}

		&:focus,
		&:focus-within,
		&:focus-visible {
			padding: 0;
			padding-bottom: 0;
			background-color: transparent;
			border: none;
			box-shadow: none;
			outline: none;
		}
	}
`;
