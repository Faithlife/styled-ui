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
					${system({
						defaultColor: { properties: ['border-color', 'background-color'], scale: 'colors' },
					})};
					/* ${system({ defaultColor: { property: 'background-color', scale: 'colors' } })}; */
					color: #fff;

					${({ disabled }) =>
						disabled
							? css`
									${system({
										disabledColor: {
											properties: ['border-color', 'background-color'],
											scale: 'colors',
										},
									})};
									cursor: default;
									color: #fff;
							  `
							: css`
									@media (hover: hover) {
										&:hover {
											${system({
												hoverColor: {
													properties: ['border-color', 'background-color'],
													scale: 'colors',
												},
											})};
											color: #fff;
										}
									}

									&:active {
										${system({
											activeColor: {
												properties: ['border-color', 'background-color'],
												scale: 'colors',
											},
										})};
										color: #fff;
									}
							  `};
				`;
			case 'primaryOutline':
				return css`
					border: 1px solid;
					${system({
						defaultColor: { properties: ['border-color', 'color'], scale: 'colors' },
					})};
					background: none;

					${({ disabled }) =>
						disabled
							? css`
									${system({
										disabledColor: { properties: ['border-color', 'color'], scale: 'colors' },
									})};
									background: none;
									cursor: default;
							  `
							: css`
									@media (hover: hover) {
										&:hover {
											${system({
												hoverColor: {
													properties: ['border-color', 'background-color'],
													scale: 'colors',
												},
											})};
											color: #fff;
										}
									}

									&:active {
										${system({
											activeColor: {
												properties: ['border-color', 'background-color'],
												scale: 'colors',
											},
										})};
										color: #fff;
									}
							  `};
				`;
			case 'primaryTransparent':
				return css`
					border: 1px solid transparent;
					background: none;
					${system({ defaultColor: { property: 'color', scale: 'colors' } })};
					padding: 0;

					${({ disabled }) =>
						disabled
							? css`
									${system({ disabledColor: { property: 'color', scale: 'colors' } })};
									cursor: default;
							  `
							: css`
									@media (hover: hover) {
										&:hover {
											${system({ hoverColor: { property: 'color', scale: 'colors' } })};
										}
									}

									&:active {
										${system({ activeColor: { property: 'color', scale: 'colors' } })};
									}
							  `};
				`;
			case 'minor':
				return css`
					border: 1px solid;
					${system({ minorBorderColor: { property: 'border-color', scale: 'colors' } })};
					${system({ minorBackgroundColor: { property: 'background-color', scale: 'colors' } })};
					color: ${colors.flGray};

					${({ disabled }) =>
						disabled
							? css`
									${system({
										minorDisabledBorderColor: { property: 'border-color', scale: 'colors' },
									})};
									${system({
										minorDisabledBackgroundColor: { property: 'background-color', scale: 'colors' },
									})};
									color: ${colors.gray22};
									cursor: default;
							  `
							: css`
									@media (hover: hover) {
										&:hover {
											border: 1px solid;
											${system({ hoverColor: { property: 'border-color', scale: 'colors' } })};
											${system({ hoverColor: { property: 'background-color', scale: 'colors' } })};
											color: ${colors.flGray};
										}
									}

									&:active {
										border: 1px solid;
										${system({ activeColor: { property: 'border-color', scale: 'colors' } })};
										${system({ activeColor: { property: 'background-color', scale: 'colors' } })};
										color: ${colors.flGray};
									}
							  `};
				`;
			case 'minorTransparent':
				return css`
					border: 1px solid transparent;
					background: none;
					${system({ defaultColor: { property: 'color', scale: 'colors' } })};
					padding: 0;

					${({ disabled }) =>
						disabled
							? css`
									${system({ disabledColor: { property: 'color', scale: 'colors' } })};
									cursor: default;
							  `
							: css`
									@media (hover: hover) {
										&:hover {
											${system({ hoverColor: { property: 'color', scale: 'colors' } })};
										}
									}

									&:active {
										${system({ activeColor: { property: 'color', scale: 'colors' } })};
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
					/* font-size: 24px; */
				`;
			default:
				return css``;
		}
	}}
`;
