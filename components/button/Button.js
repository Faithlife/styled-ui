import React from 'react';
import styled, { css } from 'styled-components';
import { variant, layout, flexbox, position, textStyle, border, background } from 'styled-system';
import 'focus-visible';
import { Box } from '../Box';
import { common, typography } from '../../theme/system';
import { buttonSizes, buttons } from '../../theme/buttons';
import { theme } from '../../theme';
import { LoadingSpinner } from '../loading-spinner';
import { deprecateComponent } from '../utils';

const sizeVariant = variant({
	prop: 'size',
	scale: 'buttonSizes',
	variants: buttonSizes,
});

const buttonVariant = variant({
	prop: 'variant',
	scale: 'buttons',
	variants: buttons,
});

const ButtonCore = styled.button.attrs(({ active }) => ({ className: active ? 'active' : null }))`
	position: relative;
	box-sizing: border-box;
	font-family: inherit;
	background: transparent;
	border: none;
	padding: 0;
	color: inherit;
	text-decoration: none;
	box-shadow: none;
	white-space: nowrap;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	outline: none;

	cursor: ${x => x.cursor || (x.disabled ? 'default' : 'pointer')};

	&.focus-visible {
		${({ theme }) => css`
			border: 1px solid ${theme.colors.button.focusBorder};
			box-shadow: 0 0 0 2px ${theme.colors.button.focusShadow};
		`}
	}

	&::-moz-focus-inner {
		border: 0;
	}

	&:disabled {
		pointer-events: none;
	}

	> svg {
		margin-right: ${props => props.hasChildren && props.theme.space[2]};
	}

	${({ isLoading }) =>
		isLoading &&
		css`
			color: transparent !important;
			& > :not(:first-child) {
				visibility: hidden;
			}
		`}

	${sizeVariant}
	${buttonVariant}
	${textStyle}

	${common}
	${typography}
	${layout}
	${flexbox}
	${position}
	${border}
	${background}
`;

ButtonCore.defaultProps = {
	theme,
	size: 'medium',
	variant: 'primary',
};

export const Button = React.forwardRef(
	(
		{
			children,
			icon,
			disabled,
			loading,
			size = ButtonCore.defaultProps.size, // temporary workaround for #393
			...props
		},
		ref,
	) => (
		<ButtonCore
			ref={ref}
			size={size}
			{...props}
			hasChildren={!!children}
			isLoading={loading}
			disabled={loading || disabled}
		>
			{loading && <LoadingSpinner position="absolute" />}
			{icon}
			{children}
		</ButtonCore>
	),
);

export const MultiButton = styled(Button).attrs(({ variant, border, borderColor }) => ({
	variant: variant ?? 'transparent',
	border: border ?? 1,
	borderColor: borderColor ?? 'button.multi.border',
}))`
	${({ selected, theme }) =>
		selected &&
		css`
			&& {
				border: none;
				background-color: ${theme.colors.button.multi.selectedBackground};
				color: ${theme.colors.button.multi.selectedForeground};
				font-weight: bold;
			}
		`}

	&:not(:first-child) {
		border-left: ${({ borderLeft }) => borderLeft ?? 'none'};
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	&:not(:last-child) {
		border-right: ${({ borderRight }) => borderRight ?? 'none'};
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
`;

MultiButton.defaultProps = { theme };

export const SegmentedButtonGroup = deprecateComponent(
	styled(Box).attrs(({ border }) => ({
		border: border ?? 1,
		borderColor: 'button.segmentedButtonGroupBorder',
		borderRadius: 1,
		backgroundColor: 'button.segmentedButtonGroupBackground',
	}))`
		display: flex;

		${ButtonCore} {
			margin: 0;
			border-radius: 2px; /* 1 less than borderRadius: 1 so the inner radius fits the outer */
		}

		> *:nth-child(n + 2) {
			&,
			${ButtonCore} {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
		}

		> *:not(:last-child) {
			&,
			${ButtonCore} {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
		}
	`,
	'SegmentedButtonGroup is deprecated in favor of MultiButton or ButtonSelect',
);
