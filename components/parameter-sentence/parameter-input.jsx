import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Input } from '../input';
import * as Styled from './styled';

export function ParameterInputBox(props) {
	const {
		defaultValue,
		value,
		onChange,
		formatValue,
		width,
		accessibilityLabel,
		styleOverrides,
		theme,
		...inputProps
	} = props;
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef();

	/**
	 * Due to a really strange firefox bug inputs with type=number will unfocus the input as soon as it is focused using the autofocus option.
	 * Possibly related to https://github.com/angular/angular.js/issues/8365 though the described fixes did not work.
	 */
	useEffect(() => {
		if (isFocused && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isFocused]);

	const toggleFocus = useCallback(() => {
		setIsFocused(state => !state);
	}, []);

	const displayValue = formatValue(value || defaultValue);

	return (
		<Box display="inline-block" position="relative" {...(isFocused ? { width } : {})}>
			{!isFocused ? (
				<Styled.Button onClick={toggleFocus} onFocus={toggleFocus}>
					<Styled.ButtonContent theme={theme} styleOverrides={styleOverrides}>
						{displayValue}
					</Styled.ButtonContent>
				</Styled.Button>
			) : (
				<Styled.InputContainer>
					<Input
						ref={inputRef}
						small
						inline
						value={value}
						onChange={onChange}
						placeholder={defaultValue}
						onEnter={toggleFocus}
						onBlur={toggleFocus}
						theme={theme}
						styleOverrides={{ width, ...styleOverrides }}
						aria-label={accessibilityLabel}
						{...inputProps}
					/>
				</Styled.InputContainer>
			)}
		</Box>
	);
}

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
