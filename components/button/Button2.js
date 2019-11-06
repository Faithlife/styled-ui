import React from 'react';
import styled, { css } from 'styled-components';
import { variant, layout, flexbox, position, textStyle, border, background } from 'styled-system';
import 'focus-visible';
import { common, typography } from '../../theme/system';
import { buttonSizes, buttons } from '../../theme/buttons';
import { theme } from '../../theme';

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

const ButtonCore = styled.button`
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

	cursor: ${x => x.cursor || (x.disabled ? 'default' : 'pointer')};

	&:focus:not(.focus-visible) {
		outline: none;
	}

	&.focus-visible {
		&:not(:active) {
			${({ theme }) => css`
				outline: none;
				border: 1px solid ${theme.colors.button.focusBorder};
				box-shadow: 0 0 0 2px ${theme.colors.button.focusShadow};
			`}
		}
	}

	&::-moz-focus-inner {
		border: 0;
	}

	> svg {
		height: 1em;
		width: 1em;
		margin-right: ${props => (props.hasChildren ? props.theme.space[2] : '')};
	}

	${sizeVariant}
	${buttonVariant}
	${textStyle};

	${common};
	${typography};
	${layout};
	${flexbox};
	${position};
	${border};
	${background};
`;

ButtonCore.defaultProps = {
	theme,
	size: 'medium',
	variant: 'primary',
};

const Button = React.forwardRef(({ children, icon, ...props }, ref) => (
	<ButtonCore ref={ref} {...props} hasChildren={!!children}>
		{icon}
		{children}
	</ButtonCore>
));

export { Button };
