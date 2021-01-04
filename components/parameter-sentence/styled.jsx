import styled, { css } from 'styled-components';
import { layout, typography } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { resetStyles } from '../utils';

const selectStyling = css`
	white-space: nowrap;
	min-height: fit-content;
	border-bottom: dashed ${themeGet('space.1')} ${themeGet('colors.parameterSentence.border')};
	font-weight: bold;
	color: ${({ isOpen }) =>
		isOpen
			? themeGet('colors.parameterSentence.active')
			: themeGet('colors.parameterSentence.closed')};
	font-family: inherit;
	border-radius: 0;
	line-height: 1;
	padding-bottom: 2px;

	&:hover {
		&:not(:focus) {
			color: ${themeGet('colors.parameterSentence.border')};
		}
	}

	&:active {
		color: ${themeGet('colors.parameterSentence.active')};
	}

	&:focus {
		outline: none;
	}

	${layout}
	${typography}
`;

export const Button = styled.button`
	${resetStyles}

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
	${selectStyling}
`;

export const Container = styled.div`
	display: inline-block;
	position: relative;
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

	${selectStyling}

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
	height: ${({ fontSize }) => fontSize || '16px'};

	${selectStyling}

	border-bottom: ${({ isFocused }) => (isFocused ? 'solid' : 'dashed')} ${themeGet('space.1')}
		${themeGet('colors.parameterSentence.border')};

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
		${resetStyles}

		padding: 0;
		padding-bottom: 0;

		${({ width }) => width && `width: ${width};`}
		height: ${({ fontSize }) => (fontSize ? `calc(2px + ${fontSize})` : '18px')};
		line-height: 1;
		font-size: ${({ fontSize }) => fontSize || '16px'};
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
			background: ${themeGet('colors.parameterSentence.readonly')};
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
