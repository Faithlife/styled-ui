import styled from 'styled-components';
import { colors, thickness, fonts } from '../shared-styles';
import { clearButtonStyles } from '../utils';

export const DropdownItem = styled.button`
	${clearButtonStyles};

	${fonts.ui16};
	width: 100%;
	color: ${({ theme, localTheme }) =>
		localTheme.textColor
			? localTheme.textColor
			: (theme.childrenTheme && theme.childrenTheme.textColor) || colors.gray66};
	padding: ${({ styleOverrides }) => styleOverrides.padding || thickness.eight};
	cursor: pointer;
	text-align: left;

	&:hover {
		background-color: ${({ theme, localTheme }) =>
			localTheme.hoverBackgroudColor
				? localTheme.hoverBackgroudColor
				: (theme.childrenTheme && theme.childrenTheme.hoverBackgroudColor) || colors.gray4};
		color: ${({ theme, localTheme }) =>
			localTheme.hoverTextColor || localTheme.textColor
				? localTheme.hoverTextColor || localTheme.textColor
				: (theme.childrenTheme &&
						(theme.childrenTheme.hoverTextColor || theme.childrenTheme.textColor)) ||
				  colors.gray66};
	}

	&:focus {
		background-color: ${({ theme, localTheme }) =>
			localTheme.hoverBackgroudColor
				? localTheme.hoverBackgroudColor
				: (theme.childrenTheme && theme.childrenTheme.hoverBackgroudColor) || colors.gray4};
		outline: none;
	}
`;
