import React from 'react';
import styled, { css } from 'styled-components';
import { variant, layout, flexbox, position, textStyle, border, background } from 'styled-system';
import 'focus-visible';
import { Box } from '../Box';
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

const ButtonCore = styled.button.attrs(({ active }) => ({ className: active ? 'active' : null }))`
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

const SegmentedButtonGroup = styled(Box).attrs(() => ({
	border: 1,
	borderColor: 'gray14',
	borderRadius: 1,
}))`
	${ButtonCore} {
		margin: 0;

		&:nth-child(n + 2) {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}

		&:nth-child(-n + 2) {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
	}
`;

export { Button, SegmentedButtonGroup };
