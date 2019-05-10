import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { applyVariations, forwardClassRef } from '../utils';
import * as Styled from './styled';

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
			/** Medium variation */
			medium: PropTypes.bool,
			/** Small variation */
			small: PropTypes.bool,
			/** Large variation */
			large: PropTypes.bool,
			styleOverrides: PropTypes.shape({
				width: PropTypes.string,
			}),
			size: PropTypes.number,
			/** Inline input variation */
			inline: PropTypes.bool,
		};

		static defaultProps = {
			styleOverrides: {},
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
				disabled,
				onEnter,
				forwardedRef, // eslint-disable-line react/prop-types
				...inputProps
			} = this.props;

			const { component: MappedStyledComponent, filteredProps } = applyVariations(
				Styled.Input,
				Styled.variationMap,
				inputProps,
			);

			return (
				<MappedStyledComponent
					type={type || 'text'}
					autoFocus={autoFocus}
					readOnly={readOnly}
					disabled={disabled}
					value={value || ''}
					placeholder={placeholder || ''}
					onChange={this.handleChange}
					onClick={onClick}
					onKeyPress={this.handleKeyPress}
					ref={forwardedRef}
					{...filteredProps || {}}
				/>
			);
		}
	},
);
