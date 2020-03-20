import styled from 'styled-components';
import { mediaSizes } from './shared-styles';

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
	font-family: inherit;

	color: ${({ styleOverrides }) => styleOverrides.toggleButtonColor || 'initial'};

	path {
		fill: ${({ styleOverrides }) => styleOverrides.toggleButtonColor || 'initial'};
	}

	&:hover {
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

	@media (min-width: ${mediaSizes.tablet}) {
		display: inline;
		margin-left: ${({ styleOverrides }) => styleOverrides.toggleTextLeftMargin || '4px'};
		font-size: ${({ styleOverrides }) => styleOverrides.toggleTextFontSize || '16px'};
	}
`;
