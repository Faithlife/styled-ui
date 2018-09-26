import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { forwardClassRef } from '../utils/forwardref-wrapper.jsx';
import * as Styled from './styled.jsx';

export const Input = forwardClassRef(
	class Input extends PureComponent {
		static propTypes = {
			value: PropTypes.string,
			placeholder: PropTypes.string,
			type: PropTypes.string,
			readOnly: PropTypes.bool,
			autoFocus: PropTypes.bool,
			disabled: PropTypes.bool,
			onChange: PropTypes.func,
			onClick: PropTypes.func,
			onEnter: PropTypes.func,
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
				forwardedRef,
				value,
				placeholder,
				readOnly,
				type,
				autoFocus,
				onClick,
				disabled,
			} = this.props;

			return (
				<Styled.Input
					innerRef={forwardedRef}
					type={type || 'text'}
					autoFocus={autoFocus}
					readOnly={readOnly}
					disabled={disabled}
					value={value || ''}
					placeholder={placeholder || ''}
					onChange={this.handleChange}
					onClick={onClick}
					onKeyPress={this.handleKeyPress}
				/>
			);
		}
	},
);
