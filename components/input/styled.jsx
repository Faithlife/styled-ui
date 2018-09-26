import styled from 'styled-components';
import { thickness, fonts, inputColors, colors } from '../shared-styles';
import { resetStyles } from '../utils';

export const Input = styled.input`
	${resetStyles};

	${fonts.ui16};
	border-radius: 3px;
	border: 1px solid ${inputColors.inputBorderColor};
	padding: ${thickness.eight};

	&:focus {
		border-color: ${inputColors.inputFocusedBorderColor};
		box-shadow: 0 0 0 2px ${inputColors.inputFocusedShadowColor};
		outline: 0;
	}

	&:disabled {
		opacity: 0.5;
	}

	&:read-only {
		background: ${colors.gray22};
	}
`;
