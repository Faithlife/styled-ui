import styled from 'styled-components';
import { mediaSizes } from '../shared-styles';

export const ProductDrawer = styled.div`
	position: relative;
	font-family: 'Source Sans Pro', sans-serif;
`;

export const ProductDrawerToggle = styled.button`
	display: flex;
	padding: 0;
	align-items: center;
	cursor: pointer;
	background: transparent;
	border: none;

	color: ${({ styleOverrides }) => styleOverrides.toggleButtonColor || 'initial'};

	path {
		fill: ${({ styleOverrides }) => styleOverrides.toggleButtonColor || 'initial'};
	}

	&:hover > * {
		color: ${({ styleOverrides }) => styleOverrides.toggleButtonHoverColor || 'initial'};

		path {
			fill: ${({ styleOverrides }) => styleOverrides.toggleButtonHoverColor || 'initial'};
		}
	}

	&:focus {
		outline: none;
	}
`;

export const ProductDrawerToggleText = styled.span`
	display: none;
	font-family: ${({ styleOverrides }) => styleOverrides.toggleTextFontFamily || 'inherit'};
	font-size: ${({ styleOverrides }) => styleOverrides.toggleTextFontSize || 'inherit'};
	color: ${({ styleOverrides }) => styleOverrides.toggleTextColor || 'inherit'};

	@media (min-width: ${mediaSizes.phone}) {
		display: inline;
		margin-left: 8px;
	}
`;
