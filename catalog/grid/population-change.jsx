import React from 'react';

export function PopulationChange({ value }) {
	return (
		<div style={{ color: value >= 0 ? 'green' : 'red' }}>{`${value >= 0 ? '+' : '-'} ${Math.abs(
			value,
		)}`}</div>
	);
}
