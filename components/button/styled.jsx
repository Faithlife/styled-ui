import styled, { css } from 'styled-components';
import { system, layout, flexbox, position, textStyle, border, background } from 'styled-system';
import 'focus-visible';
import { common, typography } from '../../theme/system';
import { colors } from '../shared-styles';
import { resetStyles } from '../utils';

const Anchor = css`
	align-items: center;
	text-decoration: none;
	text-align: center;
`;

const systemAliases = {
	borderColor: {
		property: 'border-color',
		scale: 'colors',
	},
	backgroundColor: {
		property: 'background-color',
		scale: 'colors',
	},
	color: {
		property: 'color',
		scale: 'colors',
	},
	borderAndBackgroundColors: {
		properties: ['border-color', 'background-color'],
		scale: 'colors',
	},
	borderAndTextColors: {
		properties: ['border-color', 'color'],
		scale: 'colors',
	},
};

export const Button = styled.button`
	${common};
	${typography};
	${layout};
	${flexbox};
	${position};
	${textStyle};
	${border};
	${background};

	${resetStyles};

	cursor: pointer;

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

	${({ variant }) => {
		switch (variant) {
			case 'primary':
				return css`
					border: 1px solid;
					${system({ defaultColor: systemAliases.borderAndBackgroundColors })};
					color: #fff;

					${({ disabled }) =>
						disabled
							? css`
									${system({ disabledColor: systemAliases.borderAndBackgroundColors })};
									cursor: default;
									color: #fff;
							  `
							: css`
									@media (hover: hover) {
										&:hover {
											${system({ hoverColor: systemAliases.borderAndBackgroundColors })};
											color: #fff;
										}
									}

									&:active {
										${system({ activeColor: systemAliases.borderAndBackgroundColors })};
										color: #fff;
									}
							  `};
				`;
			case 'primaryOutline':
				return css`
					border: 1px solid;
					${system({ defaultColor: systemAliases.borderAndTextColors })};
					background: none;

					${({ disabled }) =>
						disabled
							? css`
									${system({ disabledColor: systemAliases.borderAndTextColors })};
									background: none;
									cursor: default;
							  `
							: css`
									@media (hover: hover) {
										&:hover {
											${system({ hoverColor: systemAliases.borderAndBackgroundColors })};
											color: #fff;
										}
									}

									&:active {
										${system({ activeColor: systemAliases.borderAndBackgroundColors })};
										color: #fff;
									}
							  `};
				`;
			case 'primaryTransparent':
				return css`
					border: 1px solid transparent;
					background: none;
					${system({ defaultColor: systemAliases.color })};
					padding: 0;

					${({ disabled }) =>
						disabled
							? css`
									${system({ disabledColor: systemAliases.color })};
									cursor: default;
							  `
							: css`
									@media (hover: hover) {
										&:hover {
											${system({ hoverColor: systemAliases.color })};
										}
									}

									&:active {
										${system({ activeColor: systemAliases.color })};
									}
							  `};
				`;
			case 'minor':
				return css`
					border: 1px solid;
					${system({ minorBorderColor: systemAliases.borderColor })};
					${system({ minorBackgroundColor: systemAliases.backgroundColor })};
					color: ${colors.flGray};

					${({ disabled }) =>
						disabled
							? css`
									${system({ minorDisabledBorderColor: systemAliases.borderColor })};
									${system({ minorDisabledBackgroundColor: systemAliases.backgroundColor })};
									color: ${colors.gray22};
									cursor: default;
							  `
							: css`
									@media (hover: hover) {
										&:hover {
											border: 1px solid;
											${system({ hoverColor: systemAliases.borderColor })};
											${system({ hoverColor: systemAliases.backgroundColor })};
											color: ${colors.flGray};
										}
									}

									&:active {
										border: 1px solid;
										${system({ activeColor: systemAliases.borderColor })};
										${system({ activeColor: systemAliases.backgroundColor })};
										color: ${colors.flGray};
									}
							  `};
				`;
			case 'minorTransparent':
				return css`
					border: 1px solid transparent;
					background: none;
					${system({ defaultColor: systemAliases.color })};
					padding: 0;

					${({ disabled }) =>
						disabled
							? css`
									${system({ disabledColor: systemAliases.color })};
									cursor: default;
							  `
							: css`
									@media (hover: hover) {
										&:hover {
											${system({ hoverColor: systemAliases.color })};
										}
									}

									&:active {
										${system({ activeColor: systemAliases.color })};
									}
							  `};
				`;
			default:
				return css``;
		}
	}}

	${({ size }) => {
		switch (size) {
			case 'small':
				return css`
					height: 32px;
					padding: 0 ${props => (props.condensed ? '7px' : '9px')};
				`;
			case 'medium':
				return css`
					height: 40px;
					padding: 0 ${props => (props.condensed ? '11px' : '15px')};
				`;
			case 'large':
				return css`
					height: 56px;
					padding: 0 ${props => (props.condensed ? '15px' : '23px')};
				`;
			default:
				return css``;
		}
	}}
`;
