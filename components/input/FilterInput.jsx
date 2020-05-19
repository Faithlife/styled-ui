import React, { useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { DefaultThemeProvider } from '../DefaultThemeProvider';
import { Box } from '../Box';
import { Button } from '../button';
import { Input } from './Input';
import { Search } from '../icons';
import { X as Close } from '../icons/18px';
import { useCopyRefs } from '../shared-hooks/use-copy-refs';

const FilterInput = React.forwardRef(function FilterInput(
	{ value, onChange, onClear, variant, border, borderColor, borderWidth, placeholder, ...props },
	ref,
) {
	if (!onClear) {
		throw new Error('onClear prop is required.');
	}

	const input = useRef();
	const flattenedRef = useCopyRefs(useMemo(() => [ref, input], [ref]));

	const handleClear = useCallback(
		e => {
			e.preventDefault();
			onClear();
			input.current.focus();
		},
		[onClear],
	);

	return (
		<DefaultThemeProvider>
			<Wrapper position="relative" display="inline-block" {...props}>
				<Input
					ref={flattenedRef}
					variant={variant}
					placeholder={placeholder}
					value={value}
					border={border}
					borderColor={borderColor}
					borderWidth={borderWidth}
					onChange={onChange}
					width="100%"
					paddingRight={6}
				/>
				<Button
					variant="link"
					size="small"
					disabled={!value}
					icon={value ? <Close /> : <Search />}
					position="absolute"
					right={0}
					paddingX={variant === 'small' ? 3 : 4}
					height="100%"
					border={0}
					onMouseDown={handleClear}
				/>
			</Wrapper>
		</DefaultThemeProvider>
	);
});

FilterInput.propTypes = {
	...Input.propTypes,
	onClear: PropTypes.func.isRequired,
};

const Wrapper = styled(Box)`
	${({ theme }) => css`
		path {
			fill: ${theme.colors.input.icon};
		}

		&:focus-within {
			path {
				fill: ${theme.colors.input.iconFocused};
			}
		}
	`}
`;

export { FilterInput };
