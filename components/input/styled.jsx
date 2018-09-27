import styled from 'styled-components';
import { thickness, fonts, inputColors, colors } from '../shared-styles';
import { resetStyles } from '../utils';

export const Input = styled.input`
	${resetStyles};

	${fonts.ui16};
	border-radius: 3px;
	border: 1px solid ${inputColors.inputBorderColor};
	padding: ${thickness.eight} 0 ${thickness.eight} ${thickness.eight};

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
	small: component => component.extend`
		${fonts.ui14};
		padding: 6px 0 6px ${thickness.eight};
`,
	medium: component => component.extend`
		${fonts.ui16};
`,
	large: component => component.extend`
		padding: 13px 0 11px 12px;
		${fonts.ui16};
`,
};
