import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { system, variant as createVariant, layout, textStyle, border } from 'styled-system';
import systemPropTypes from '@styled-system/prop-types';
import { theme } from '../../theme';
import { common, typography } from '../../theme/system';
import { resetStyles, getVariation } from '../utils';

const Input = React.forwardRef(function Input(props, ref) {
	const {
		value,
		placeholder,
		readOnly,
		type,
		autoFocus,
		onClick,
		variant,
		small,
		medium,
		large,
		inline,
		disabled,
		onEnter,
		textarea,
		forwardedRef, // eslint-disable-line react/prop-types
		...inputProps
	} = props;

	const handleKeyPress = useCallback(
		e => {
			if (onEnter && e.key === 'Enter') {
				onEnter();
			}
		},
		[onEnter],
	);

	const variation = getVariation(variant, { small, medium, large, inline, none: true });

	if (process.env.NODE_ENV !== 'production' && variation === 'inline') {
		console.warn(
			'Warning: The `inline` variation has been deprecated, and will be removed in a future release.',
		);
	}

	return (
		<StyledInput
			as={textarea && 'textarea'}
			type={type || 'text'}
			autoFocus={autoFocus}
			readOnly={readOnly}
			variant={variation}
			disabled={disabled}
			value={value !== null && value !== undefined ? value : ''}
			placeholder={placeholder || ''}
			onClick={onClick}
			onKeyPress={handleKeyPress}
			ref={ref || forwardedRef}
			textStyle={variation === 'large' ? 'ui.18' : 'ui.16'}
			underlineColor="blue4"
			{...inputProps}
		/>
	);
});

Input.defaultProps = {
	theme,
};

Input.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	placeholder: PropTypes.string,
	type: PropTypes.string,
	readOnly: PropTypes.bool,
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	onEnter: PropTypes.func,
	/** Enum with values: 'small', 'medium', 'large', and 'inline' */
	variant: PropTypes.oneOf(['small', 'medium', 'large', 'inline']),
	/** Medium variation (deprecated in favor of the variant prop) */
	medium: PropTypes.bool,
	/** Small variation (deprecated in favor of the variant prop) */
	small: PropTypes.bool,
	/** Large variation (deprecated in favor of the variant prop) */
	large: PropTypes.bool,
	size: PropTypes.number,
	/** Inline input variation */
	inline: PropTypes.bool,
	/** Textarea input variation */
	textarea: PropTypes.bool,
	...common.propTypes,
	...typography.propTypes,
	...systemPropTypes.layout,
	...systemPropTypes.border,
	textStyle: PropTypes.string,
};

export { Input };

const StyledInput = styled.input(
	({ theme, variant, styleOverrides = {} }) => css`
	${resetStyles};
	${textStyle};

	height: 32px;
	padding: ${theme.space[3]};

	border: 1px solid;
	border-radius: ${theme.radii[1]};
	border-color: ${theme.colors.inputBorderColor || theme.colors.input.borderColor};

	${'height' in styleOverrides &&
		css`
			height: ${styleOverrides.height};
		`}

	${'width' in styleOverrides &&
		css`
			width: ${styleOverrides.width};
		`}

	&:focus {
		border-color: ${theme.colors.inputFocusedBorderColor || theme.colors.input.focusedBorderColor};
		box-shadow: 0 0 0 2px ${theme.colors.inputFocusedShadowColor ||
			theme.colors.input.focusedBoxShadowColor};
		outline: 0;
		${variant === 'inline' && system({ underlineColor: { property: 'border-color', scale: 'colors' } })}
	}

	&:read-only {
		background: ${theme.colors.input.readOnlyBackgroundColor};
	}

	&::placeholder {
		color: ${theme.colors.inputPlaceholderColor || theme.colors.input.placeholderColor};
	}

	&:disabled {
		color: ${theme.colors.input.disabledTextColor};
		background-color: ${theme.colors.input.disabledBackgroundColor};
		border-color: ${theme.colors.input.disabledBorderColor};

		&::placeholder {
			color: ${theme.colors.input.disabledPlaceholderColor};
		}
	}

	${createVariant({
		variants: {
			small: {
				padding: '8px',
				height: '32px',
			},
			medium: {
				padding: '12px',
				height: '40px',
			},
			large: {
				padding: '16px',
				height: '56px',
			},
			inline: {
				backgroundColor: 'transparent',
				border: 'none',
				boxShadow: 'none',
				borderRadius: '0px',
				padding: '0px',
				borderBottom: '2px solid',
				borderColor: theme.colors.blue4,
				height: '20px',
				paddingBottom: '4px',
				lineHeight: 1,
				'&:focus': {
					boxShadow: 'none',
					outline: '0',
				},
			},
		},
	})}

	${variant === 'inline' && system({ underlineColor: { property: 'border-color', scale: 'colors' } })}

	${common};
	${typography};
	${layout};
	${border};
`,
);
