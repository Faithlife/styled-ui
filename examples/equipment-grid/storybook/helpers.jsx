import React, { useState } from 'react';
import { Button } from '@faithlife/styled-ui';
import { useCellEditor, useGridServerDatasource } from '@faithlife/equipment-grid';
import rawCensusData from './2010census.json';

export let gridRequest;
async function fakeServer(request) {
	gridRequest = request;
	gridRequest.filterModel.filters = undefined;
	const nameFiltered = request.filterModel.filterText
		? censusData.filter(data =>
				data.value.toLowerCase().includes(request.filterModel.filterText.toLowerCase())
		  )
		: censusData;
	const filteredData = request.filterModel.filters
		? nameFiltered.filter(x =>
				request.filterModel.filters.population.filterKind === 'greaterThan'
					? x.population > request.filterModel.filters.population.filter
					: x.population < request.filterModel.filters.population.filter
		  )
		: nameFiltered;
	await new Promise(resolve => setTimeout(resolve, 500));
	const response = [
		filteredData.slice(request.startRow, request.endRow),
		filteredData.length >= request.endRow,
	];
	return response;
}

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

export function ServerSideWrapper({ children, initialState }) {
	const [state, setState] = useState(initialState);
	const datasource = useGridServerDatasource(fakeServer);

	return children(state, setState, datasource);
}

IncrementButton.displayName = 'IncrementButton';

export const gridRef = React.createRef();
