import styled, { css } from 'styled-components';
import 'focus-visible';
import { colors } from '../shared-styles';
import { resetStyles } from '../utils';

const buttonColors = {
	default: '#278ed4',
	hover: '#6db3e2',
	active: '#1d6ca1',
	disabled: '#bedcf2',
};

const Anchor = css`
	align-items: center;
	text-decoration: none;
	text-align: center;
`;

export const Button = styled.button`
	${resetStyles};

	justify-content: ${props => props.styleOverrides.justifyContent || 'center'};
	padding: ${props => props.styleOverrides.padding || Button.padding};
	font-size: ${props => props.styleOverrides.fontSize || '16px'};
	width: ${props => props.styleOverrides.width};
	box-shadow: none;
	border-radius: 3px;
	cursor: pointer;
	display: inline-flex;
	background-color: transparent;
	border: none;
	transition: box-shadow 0.25s ease 0s;
	white-space: nowrap;
	align-items: center;

	&:focus:not(.focus-visible) {
		outline: none;
	}

	&.focus-visible {
		&:not(:active) {
			box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		}
	}

	&::-moz-focus-inner {
		border: 0;
	}

	> svg {
		height: 1em;
		width: 1em;
		margin-right: ${props => (props.hasChildren ? '6px' : '')};
	}

	${({ as: baseTag }) => baseTag && baseTag === 'a' && Anchor};
`;

export const variationMap = {
	primary: component => styled(component)`
		border: 1px solid ${props => props.theme.defaultColor || buttonColors.default};
		background-color: ${props => props.theme.defaultColor || buttonColors.default};
		color: #fff;

		${({ disabled }) =>
			disabled
				? css`
						border-color: ${props => props.theme.disabledColor || buttonColors.disabled};
						background-color: ${props => props.theme.disabledColor || buttonColors.disabled};
						cursor: default;
						color: #fff;
				  `
				: css`
						@media (hover: hover) {
							&:hover {
								border-color: ${props => props.theme.hoverColor || buttonColors.hover};
								background-color: ${props => props.theme.hoverColor || buttonColors.hover};
								color: #fff;
							}
						}

						&:active {
							border-color: ${props => props.theme.activeColor || buttonColors.active};
							background-color: ${props => props.theme.activeColor || buttonColors.active};
							color: #fff;
						}
				  `};
	`,
	primaryOutline: component => styled(component)`
		border: 1px solid ${props => props.theme.defaultColor || buttonColors.default};
		background: none;
		color: ${props => props.theme.defaultColor || buttonColors.default};

		${({ disabled }) =>
			disabled
				? css`
						border-color: ${props => props.theme.disabledColor || buttonColors.disabled};
						background: none;
						color: ${props => props.theme.disabledColor || buttonColors.disabled};
						cursor: default;
				  `
				: css`
						@media (hover: hover) {
							&:hover {
								border-color: ${props => props.theme.hoverColor || buttonColors.hover};
								background-color: ${props => props.theme.hoverColor || buttonColors.hover};
								color: #fff;
							}
						}

						&:active {
							border-color: ${props => props.theme.activeColor || buttonColors.active};
							background-color: ${props => props.theme.activeColor || buttonColors.active};
							color: #fff;
						}
				  `};
	`,
	minor: component => styled(component)`
		border: 1px solid ${props => props.theme.defaultColor || colors.gray14};
		background: ${props => props.theme.defaultColor || colors.gray4};
		color: ${colors.flGray};

		${({ disabled }) =>
			disabled
				? css`
						border-color: ${props => props.theme.disabledColor || colors.gray8};
						background-color: ${props => props.theme.disabledColor || `#fff`};
						color: ${colors.gray22};
						cursor: default;
				  `
				: css`
						@media (hover: hover) {
							&:hover {
								border: 1px solid ${props => props.theme.hoverColor || colors.gray14};
								background-color: ${props => props.theme.hoverColor || colors.gray14};
								color: ${colors.flGray};
							}
						}

						&:active {
							border: 1px solid ${props => props.theme.activeColor || colors.gray22};
							background-color: ${props => props.theme.activeColor || colors.gray22};
							color: ${colors.flGray};
						}
				  `};
	`,
	primaryTransparent: component => styled(component)`
		border: 1px solid transparent;
		background: none;
		color: ${props => props.theme.defaultColor || buttonColors.default};
		padding: 0;

		${({ disabled }) =>
			disabled
				? css`
						color: ${props => props.theme.disabledColor || buttonColors.disabled};
						cursor: default;
				  `
				: css`
						@media (hover: hover) {
							&:hover {
								color: ${props => props.theme.hoverColor || buttonColors.hover};
							}
						}

						&:active {
							color: ${props => props.theme.activeColor || buttonColors.active};
						}
				  `};
	`,
	minorTransparent: component => styled(component)`
		border: 1px solid transparent;
		background: none;
		color: ${props => props.theme.defaultColor || colors.flGray};
		padding: 0;

		${({ disabled }) =>
			disabled
				? css`
						color: ${props => props.theme.disabledColor || colors.gray22};
						cursor: default;
				  `
				: css`
						@media (hover: hover) {
							&:hover {
								color: ${props => props.theme.hoverColor || colors.blueBase};
							}
						}

						&:active {
							color: ${props => props.theme.activeColor || colors.blueLight};
						}
				  `};
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
