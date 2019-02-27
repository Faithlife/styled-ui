import styled from 'styled-components';
import { thickness, fonts, inputColors, colors } from '../shared-styles';
import { resetStyles } from '../utils';

export const Input = styled.input`
	${resetStyles};

	border-radius: 3px;
	border: 1px solid ${inputColors.inputBorderColor};

	padding: ${thickness.eight};
	height: 32px;
	${fonts.ui16};

	width: ${props => props.styleOverrides.width};

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

export const variationMap = {
	small: component => styled(component)`
		padding: ${thickness.eight};
		height: 32px;
		${fonts.ui16};
	`,
	medium: component => styled(component)`
		padding: 12px;
		height: 40px;
		${fonts.ui16};
	`,
	large: component => styled(component)`
		padding: 16px;
		height: 56px;
		${fonts.ui18};
	`,
};
