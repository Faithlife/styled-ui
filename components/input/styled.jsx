import styled from 'styled-components';
import { thickness, fonts, inputColors, colors } from '../shared-styles';
import { resetStyles } from '../utils';

export const Input = styled.input`
	${resetStyles};

	border-radius: 3px;
	border: 1px solid ${inputColors.inputBorderColor};

	padding: ${thickness.eight};
	height: ${props => props.styleOverrides.height || '32px'};
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
		background: ${colors.gray8};
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
	inline: component => styled(component)`
		background-color: transparent;
		border: none;
		box-shadow: none;
		border-radius: 0;
		padding: 0;
		border-bottom: solid ${thickness.two} ${({ theme }) => theme.underlineColor || colors.blueBase};
		height: ${({ styleOverrides }) => styleOverrides.fontSize || '20px'};
		padding-bottom: ${thickness.four};
		font-size: ${({ styleOverrides }) => styleOverrides.fontSize || '16px'};
		line-height: 1;
		padding-bottom: 0;

		&:focus {
			box-shadow: none;
			border: none;
			border-bottom: solid ${thickness.two}
				${({ theme }) => theme.underlineColor || colors.blueBase};
			outline: none;
		}
	`,
};
