import React, { useMemo } from 'react';
import { Box } from '../Box';
import { MultiButton } from './Button';

export function ButtonSelect({ value, options, onChange, ...buttonProps }) {
	const mappedOptions = useMemo(
		() => options.map(o => ({ ...o, onClick: () => onChange(o.value) })),
		[onChange, options],
	);

	return (
		<Box role="radiogroup">
			{mappedOptions.map(({ value: itemValue, display, ...itemProps }) => (
				<MultiButton
					{...buttonProps}
					{...itemProps}
					role="radio"
					aria-checked={value === itemValue}
					selected={value === itemValue}
					key={itemValue}
				>
					{display}
				</MultiButton>
			))}
		</Box>
	);
}
