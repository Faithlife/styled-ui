import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { applyVariations } from '../utils';
import * as Styled from './styled';

/** Standard text input with no validation */
export class Input extends PureComponent {
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
		/** Medium variation */
		medium: PropTypes.bool,
		/** Small variation */
		small: PropTypes.bool,
		/** Large variation */
		large: PropTypes.bool,
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
				{...filteredProps || {}}
			/>
		);
	}
}
