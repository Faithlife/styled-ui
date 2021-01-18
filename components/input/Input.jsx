import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { system, variant as createVariant, layout, textStyle, border } from 'styled-system';
import systemPropTypes from '@styled-system/prop-types';
import { theme } from '../../theme';
import { common, typography } from '../../theme/system';
import { resetStyles, getVariation } from '../utils';

const Input = React.memo(
	React.forwardRef(function Input(props, ref) {
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
			disabled,
			onEnter,
			onFocus,
			selectOnFocus,
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

		const variation = getVariation(variant, { small, medium, large, none: true });

		const handleFocus = useMemo(() => {
			if (!selectOnFocus) {
				return onFocus;
			}

			return e => {
				if (onFocus) {
					onFocus(e);
				}

				if (!e.defaultPrevented) {
					e.target.select();
				}
			};
		}, [onFocus, selectOnFocus]);

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
				onFocus={handleFocus}
				ref={ref || forwardedRef}
				textStyle={variation === 'large' ? 'c.18' : 'c.16'}
				underlineColor="blue4"
				{...inputProps}
			/>
		);
	}),
);

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
	/** Enum with values: 'small', 'medium', 'large' */
	variant: PropTypes.oneOfType([
		PropTypes.oneOf(['small', 'medium', 'large']),
		PropTypes.arrayOf(PropTypes.oneOf(['small', 'medium', 'large'])),
	]),
	/** Medium variation (deprecated in favor of the variant prop) */
	medium: PropTypes.bool,
	/** Small variation (deprecated in favor of the variant prop) */
	small: PropTypes.bool,
	/** Large variation (deprecated in favor of the variant prop) */
	large: PropTypes.bool,
	size: PropTypes.number,
	/**
	 * Whether focusing the input should select _all_ of its text, regardless of where it was clicked.
	 */
	selectOnFocus: PropTypes.bool,
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
	({ theme, variant }) => css`
		${resetStyles}
		${textStyle}

		height: 32px;
		padding: ${theme.space[2]} ${theme.space[3]};

		background-color: ${theme.colors.input.background};
		border: 1px solid;
		border-radius: ${theme.radii[1]};
		border-color: ${theme.colors.input.border};
		color: ${theme.colors.input.foreground};

		${system({ resize: true })}

		box-shadow: none;

		&:focus {
			border-color: ${theme.colors.input.borderFocused};
			box-shadow: 0 0 0 2px ${theme.colors.input.shadowFocused};
			outline: 0;
		}

		&:disabled {
			opacity: 0.5;
		}

		&:read-only {
			background: ${theme.colors.input.backgroundReadOnly};
		}

		&::placeholder {
			color: ${theme.colors.input.placeholderForeground};
		}

		${createVariant({
			variants: {
				small: {
					paddingX: 3,
					paddingY: 2,
					height: '32px',
				},
				medium: {
					paddingX: 4,
					paddingY: 3,
					height: '40px',
				},
				large: {
					paddingX: 5,
					paddingY: 4,
					height: '56px',
				},
			},
		})}

		${common}
		${typography}
		${layout}
		${border}
	`,
);

StyledInput.defaultProps = {
	theme,
};
