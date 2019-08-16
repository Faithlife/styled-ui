import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { system, variant, layout, textStyle, border } from 'styled-system';
import systemPropTypes from '@styled-system/prop-types';
import { theme } from '../../theme';
import { common, typography } from '../../theme/system';
import { forwardClassRef, resetStyles, getVariation } from '../utils';
import { inputColors, colors } from '../shared-styles';

/** Standard text input with no validation */
export const Input = forwardClassRef(
	class Input extends PureComponent {
		static propTypes = {
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
			...common.propTypes,
			...typography.propTypes,
			...systemPropTypes.layout,
			...systemPropTypes.border,
			textStyle: PropTypes.string,
		};

		static defaultProps = {
			theme: theme,
		};

		handleChange = () => {
			const { onChange } = this.props;
			if (onChange) {
				onChange();
			}
		};

		handleKeyPress = e => {
			const { onEnter } = this.props;
			if (onEnter && e.key === 'Enter') {
				onEnter();
			}
		};

		render() {
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
				forwardedRef, // eslint-disable-line react/prop-types
				...inputProps
			} = this.props;

			return (
				<StyledInput
					type={type || 'text'}
					autoFocus={autoFocus}
					readOnly={readOnly}
					variant={getVariation(variant, { small, medium, large, inline, none: true })}
					disabled={disabled}
					value={value || ''}
					placeholder={placeholder || ''}
					onChange={this.handleChange}
					onClick={onClick}
					onKeyPress={this.handleKeyPress}
					ref={forwardedRef}
					height="32px"
					padding={3}
					textStyle={variant === 'large' || large ? 'ui.18' : 'ui.16'}
					border={1}
					borderColor="inputBorderColor"
					borderRadius={1}
					underlineColor="blue4"
					{...inputProps}
				/>
			);
		}
	},
);

const StyledInput = styled.input`
	${common};
	${typography};
	${layout};
	${textStyle};
	${border};

	${resetStyles};

	&:focus {
		border-color: ${inputColors.inputFocusedBorderColor};
		box-shadow: 0 0 0 2px ${inputColors.inputFocusedShadowColor};
		outline: 0;
		${({ variant }) =>
			variant === 'inline' &&
			system({ underlineColor: { property: 'border-color', scale: 'colors' } })}
	}

	&:disabled {
		opacity: 0.5;
	}

	&:read-only {
		background: ${colors.gray8};
	}

	${variant({
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
				height: '20px',
				paddingBottom: '4px',
				'&:focus': {
					boxShadow: 'none',
					outline: '0',
				},
			},
		},
	})}

	${({ variant }) =>
		variant === 'inline' &&
		system({ underlineColor: { property: 'border-color', scale: 'colors' } })}
`;
