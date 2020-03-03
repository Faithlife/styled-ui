import React, { useState } from 'react';
import { Button } from '@faithlife/styled-ui';
import { useCellEditor } from '@faithlife/equipment-grid';
import rawCensusData from './2010census.json';

export const censusData = rawCensusData.map((data, index) => ({ ...data, id: index }));

export function PopulationChange({ value }) {
	return (
		<div style={{ color: value >= 0 ? 'green' : 'red' }}>{`${value >= 0 ? '+' : '-'} ${Math.abs(
			value
		)}`}</div>
	);
}

export const IncrementButton = React.forwardRef(({ value }, ref) => {
	const [count, setCount] = useState(value);
	useCellEditor(ref, count, true);

	return (
		<Button variant="primaryOutline" onClick={() => setCount(c => c + 1)}>{`${count} +`}</Button>
	);
});

IncrementButton.displayName = 'IncrementButton';

export const gridRef = React.createRef();
