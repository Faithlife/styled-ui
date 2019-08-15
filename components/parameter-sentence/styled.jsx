import styled from 'styled-components';
import { system, layout, textStyle, border } from 'styled-system';
import { common, typography } from '../../theme/system';
import { resetStyles } from '../utils';
import { Box } from '../Box';
import { Text } from '../Text';

const inputOffset = '-6px';

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

export const ButtonContent = styled(Text).attrs({ tabIndex: '-1' })`
	&:hover {
		&:not(:focus) {
			${system({ hoverColor: { property: 'color', scale: 'colors' } })};
		}
	}

	&:active {
		${system({ activeColor: { property: 'color', scale: 'colors' } })};
	}

	&:focus {
		${system({ focusOutline: { property: 'outline' } })};
	}
`;

export const InputContainer = styled(Box)`
	z-index: 0;
	position: absolute;
	bottom: ${inputOffset};

	&& > input::-webkit-outer-spin-button,
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
	${common};
	${typography};
	${layout};
	${textStyle};
	${border};

	appearance: none;
	user-select: none;
	cursor: pointer;
	text-align-last: center;

	&:hover {
		&:not(:focus) {
			${system({ hoverColor: { property: 'color', scale: 'colors' } })};
		}
	}

	&:active {
		${system({ activeColor: { property: 'color', scale: 'colors' } })};
	}

	&:focus {
		&:not(:active) {
			${system({ focusBoxShadow: { property: 'box-shadow', scale: 'shadows' } })};
		}
		${system({ focusOutline: { property: 'outline' } })};
	}
`;
