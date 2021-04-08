import React from 'react';
import { Box } from '../Box';
import { MultiButton } from './Button';

export function ButtonSelect({ value, options, onChange, ...buttonProps }) {
	return (
		<Box>
			{options.map(({ value: itemValue, display, ...itemProps }) => (
				<MultiButton
					{...buttonProps}
					{...itemProps}
					selected={value === itemValue}
					onClick={() => onChange(itemValue)}
					key={itemValue}
				>
					{display}
				</MultiButton>
			))}
		</Box>
	);
}
