import styled, { css } from 'styled-components';
import {
	system,
	variant,
	layout,
	flexbox,
	position,
	textStyle,
	border,
	background,
} from 'styled-system';
import 'focus-visible';
import { common, typography } from '../../theme/system';
import { resetStyles } from '../utils';

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

const Anchor = css`
	align-items: center;
	text-decoration: none;
	text-align: center;
`;

export const Button = styled.button`
	${resetStyles};
	border-radius: ${props => props.theme.radii[1]};
	border: ${props => props.theme.borders[1]};

	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

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

	&:disabled {
		pointer-events: none;
	}

	> svg {
		height: 1em;
		width: 1em;
		margin-right: ${props => (props.hasChildren ? '6px' : '')};
	}

	${({ as: baseTag }) => baseTag && baseTag === 'a' && Anchor};

		${({ disabled }) =>
			variant({
				variants: {
					primary: {
						border: '1px solid',
						color: 'white',
						'@media (hover: hover)': {
							'&:hover': {
								color: 'white',
							},
						},
					},
					primaryOutline: {
						border: '1px solid',
						background: 'none',
						'@media (hover: hover)': {
							'&:hover': {
								color: disabled ? 'blue2' : 'white',
							},
						},
						'&:active': {
							color: disabled || 'white',
						},
					},
					primaryTransparent: {
						border: '1px solid transparent',
						background: 'none',
						padding: '0px',
					},
					minor: {
						border: '1px solid',
						color: disabled ? 'gray22' : 'gray66',
						'@media (hover: hover)': {
							'&:hover': {
								color: disabled ? 'gray22' : 'gray66',
							},
						},
					},
					minorTransparent: {
						border: '1px solid transparent',
						background: 'none',
						padding: '0px',
					},
				},
			})}

	${({ variant }) => {
		switch (variant) {
			case 'primary':
				return css`
					${system({ defaultColor: systemAliases.borderAndBackgroundColors })};

					${({ disabled }) =>
						disabled
							? css`
									${system({ disabledColor: systemAliases.borderAndBackgroundColors })};
							  `
							: css`
									@media (hover: hover) {
										&:hover {
											${system({ hoverColor: systemAliases.borderAndBackgroundColors })};
										}
									}

									&:active {
										${system({ activeColor: systemAliases.borderAndBackgroundColors })};
									}
							  `};
				`;
			case 'primaryOutline':
				return css`
					${system({ defaultColor: systemAliases.borderAndTextColors })};

					${({ disabled }) =>
						disabled
							? css`
									${system({ disabledColor: systemAliases.borderAndTextColors })};
							  `
							: css`
									@media (hover: hover) {
										&:hover {
											${system({ hoverColor: systemAliases.borderAndBackgroundColors })};
										}
									}

									&:active {
										${system({ activeColor: systemAliases.borderAndBackgroundColors })};
									}
							  `};
				`;
			case 'primaryTransparent':
			case 'minorTransparent':
				return css`
					${system({ defaultColor: systemAliases.color })};

					${({ disabled }) =>
						disabled
							? css`
									${system({ disabledColor: systemAliases.color })};
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
					${system({ minorBorderColor: systemAliases.borderColor })};
					${system({ minorBackgroundColor: systemAliases.backgroundColor })};

					${({ disabled }) =>
						disabled
							? css`
									${system({ minorDisabledBorderColor: systemAliases.borderColor })};
									${system({ minorDisabledBackgroundColor: systemAliases.backgroundColor })};
							  `
							: css`
									@media (hover: hover) {
										&:hover {
											${system({ hoverColor: systemAliases.borderColor })};
											${system({ hoverColor: systemAliases.backgroundColor })};
										}
									}

									&:active {
										${system({ activeColor: systemAliases.borderColor })};
										${system({ activeColor: systemAliases.backgroundColor })};
									}
							  `};
				`;
		}
	}}

	${({ condensed }) =>
		variant({
			prop: 'size',
			variants: {
				small: {
					height: '32px',
					paddingX: condensed ? '6px' : '8px',
					'> svg': {
						height: '18px',
						width: '18px',
					},
				},
				medium: {
					height: '40px',
					paddingX: condensed ? '10px' : '14px',
					'> svg': {
						height: '18px',
						width: '18px',
					},
				},
				large: {
					height: '56px',
					paddingX: condensed ? '14px' : '22px',
					'> svg': {
						height: '24px',
						width: '24px',
					},
				},
			},
		})}

	${textStyle};
	${common};
	${typography};
	${layout};
	${flexbox};
	${position};
	${border};
	${background};
`;
