import styled, { css } from 'styled-components';
import { colors } from '../shared-styles';
import { resetStyles } from '../utils';

const buttonColors = {
	default: '#278ed4',
	hover: '#6db3e2',
	active: '#1d6ca1',
	disabled: '#bedcf2',
};

export const ButtonContentWrapper = styled.div.attrs({ tabIndex: '-1' })`
	display: grid;
	grid-auto-flow: column;
	grid-column-gap: 6px;
	align-items: center;
	justify-content: ${props => props.styleOverrides.justifyContent || 'center'};
	border-radius: 3px;

	white-space: nowrap;
	min-height: fit-content;
	font-size: ${props => props.styleOverrides.fontSize || '16px'};
	width: ${props => props.styleOverrides.width};
	padding: ${props => props.styleOverrides.padding};

	&:focus {
		outline: none;
	}

	> svg {
		height: 1em;
		width: 1em;
	}
`;

export const ButtonContents = styled.div`
	white-space: nowrap;
`;

const Anchor = css`
	align-items: center;
	text-decoration: none;
	text-align: center;
`;

export const Button = styled.button`
	${resetStyles};

	box-shadow: none;
	border-radius: 3px;
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

	${({ as: baseTag }) => baseTag && baseTag === 'a' && Anchor};
`;

export const variationMap = {
	primary: component => styled(component)`
		border: 1px solid ${props => props.theme.defaultColor || buttonColors.default};
		background-color: ${props => props.theme.defaultColor || buttonColors.default};
		color: #fff;

		&:hover {
			border-color: ${props => props.theme.hoverColor || buttonColors.hover};
			background-color: ${props => props.theme.hoverColor || buttonColors.hover};
			color: #fff;
		}

		&:active {
			border-color: ${props => props.theme.activeColor || buttonColors.active};
			background-color: ${props => props.theme.activeColor || buttonColors.active};
			color: #fff;
		}

		&:disabled {
			border-color: ${props => props.theme.disabledColor || buttonColors.disabled};
			background-color: ${props => props.theme.disabledColor || buttonColors.disabled};
			cursor: default;
		}
	`,
	primaryOutline: component => styled(component)`
		border: 1px solid ${props => props.theme.defaultColor || buttonColors.default};
		background: none;
		color: ${props => props.theme.defaultColor || buttonColors.default};

		&:hover {
			background-color: ${props => props.theme.hoverColor || buttonColors.hover};
			border-color: ${props => props.theme.hoverColor || buttonColors.hover};
			color: #fff;
		}

		&:active {
			background-color: ${props => props.theme.activeColor || buttonColors.active};
			border-color: ${props => props.theme.activeColor || buttonColors.active};
			color: #fff;
		}

		&:disabled {
			background: none;
			border-color: ${props => props.theme.disabledColor || buttonColors.disabled};
			color: ${props => props.theme.disabledColor || buttonColors.disabled};
			cursor: default;
		}
	`,
	minor: component => styled(component)`
		border: 1px solid ${colors.gray14};
		background: ${colors.gray4};
		color: ${colors.flGray};

		&:hover {
			background-color: ${colors.gray14};
			border: 1px solid ${colors.gray14};
			color: ${colors.flGray};
		}

		&:active {
			background-color: ${colors.gray22};
			border: 1px solid ${colors.gray22};
			color: ${colors.flGray};
		}

		&:disabled {
			background-color: #fff;
			border-color: ${colors.gray8};
			color: ${colors.gray22};
			cursor: default;
		}
	`,
	primaryTransparent: component => styled(component)`
		border: 1px solid transparent;
		background: none;
		color: ${props => props.theme.defaultColor || buttonColors.default};
		padding: 0;

		&:hover {
			color: ${props => props.theme.hoverColor || buttonColors.hover};
		}

		&:active {
			color: ${props => props.theme.activeColor || buttonColors.active};
		}

		&:disabled {
			color: ${props => props.theme.disabledColor || buttonColors.disabled};
			cursor: default;
		}
	`,
	minorTransparent: component => styled(component)`
		border: 1px solid transparent;
		background: none;
		color: ${colors.flGray};
		padding: 0;

		&:hover {
			color: ${colors.blueBase};
		}

		&:active {
			color: ${colors.blueLight};
		}

		&:disabled {
			color: ${colors.gray22};
			cursor: default;
		}
	`,
	small: component => styled(component)`
		height: 32px;
		padding: 0 ${props => (props.condensed ? '7px' : '9px')};
	`,
	medium: component => styled(component)`
		height: 40px;
		padding: 0 ${props => (props.condensed ? '11px' : '15px')};
	`,
	large: component => styled(component)`
		height: 56px;
		padding: 0 ${props => (props.condensed ? '15px' : '23px')};
		font-size: 24px;
	`,
};
