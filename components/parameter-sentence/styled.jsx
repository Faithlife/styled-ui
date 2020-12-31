import styled, { css } from 'styled-components';
import { layout, typography } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { resetStyles } from '../utils';

const selectStyling = css`
	white-space: nowrap;
	min-height: fit-content;
	/* font-size: ${({ styleOverrides }) => styleOverrides.fontSize || '16px'}; */
	/* width: ${({ styleOverrides }) => styleOverrides.width}; */
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

export const InputContainer = styled.div`
	display: inline-block;
	position: relative;
	height: ${({ fontSize }) => fontSize || '16px'};

	${selectStyling};

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

	${layout}
	${typography}
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
