import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
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
		...inputProps
	} = props;
	const [isFocused, setIsFocused] = useState(false);

	const toggleFocus = useCallback(() => {
		setIsFocused(state => !state);
	}, []);

	const displayValue = formatValue(value || defaultValue);

	return (
		<Styled.Container {...(isFocused ? { width } : {})}>
			{!isFocused ? (
				<Styled.Button onClick={toggleFocus} onFocus={toggleFocus}>
					<Styled.ButtonContent theme={{}} styleOverrides={{}}>
						{displayValue}
					</Styled.ButtonContent>
				</Styled.Button>
			) : (
				<Styled.InputContainer>
					<Input
						value={value}
						onChange={onChange}
						placeholder={defaultValue}
						onEnter={toggleFocus}
						onBlur={toggleFocus}
						autoFocus
						styleOverrides={{ width, useBorderBox: true }}
						aria-label={accessibilityLabel}
						{...inputProps}
					/>
				</Styled.InputContainer>
			)}
		</Styled.Container>
	);
}

ParameterInputBox.propTypes = {
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onChange: PropTypes.func.isRequired,
	formatValue: PropTypes.func,
	width: PropTypes.string,
	accessibilityLabel: PropTypes.string.isRequired,
};
