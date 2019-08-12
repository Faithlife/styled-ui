import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export const ParameterInputBox = React.forwardRef((props, ref) => {
	const {
		defaultValue,
		value,
		onChange,
		formatValue,
		width,
		accessibilityLabel,
		styleOverrides,
		theme,
		onFocus,
		onBlur,
		...inputProps
	} = props;
	const [isFocused, setIsFocused] = useState(false);

	const toggleFocus = useCallback(() => {
		setIsFocused(state => !state);
	}, []);

	const handleFocus = useCallback(() => {
		if (onFocus) {
			onFocus();
		}
		toggleFocus();
	}, [onFocus, toggleFocus]);

	const handleBlur = useCallback(() => {
		if (onBlur) {
			onBlur();
		}
		toggleFocus();
	}, [onBlur, toggleFocus]);

	const displayValue = formatValue ? formatValue(value || defaultValue) : value || defaultValue;

	return (
		<Styled.InputContainer
			width={width}
			isFocused={isFocused}
			theme={theme}
			styleOverrides={{ width, ...styleOverrides }}
		>
			<Styled.Input
				ref={ref}
				onChange={onChange}
				placeholder={defaultValue}
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={!isFocused ? displayValue : value}
				theme={theme}
				aria-label={accessibilityLabel}
				styleOverrides={{ width, ...styleOverrides }}
				{...inputProps}
			/>
		</Styled.InputContainer>
	);
});

ParameterInputBox.propTypes = {
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onChange: PropTypes.func.isRequired,
	formatValue: PropTypes.func,
	width: PropTypes.string,
	accessibilityLabel: PropTypes.string.isRequired,
	theme: PropTypes.shape({
		hoverColor: PropTypes.string,
		activeColor: PropTypes.string,
		underlineColor: PropTypes.string,
	}),
	styleOverrides: PropTypes.shape({
		fontSize: PropTypes.string,
	}),
};

ParameterInputBox.defaultProps = {
	theme: {},
	styleOverrides: {},
};
