import React from 'react';
import { useGridState } from './grid-helpers';
import { BaseGrid } from './base-grid';

export function SimpleGrid({
	onRowClick,
	children,
	isSmallViewport,
	data,
	filterText,
	sortModel,
	updateSortModel,
	maxRows,
	maxHeight,
	minHeight,
	rowSelectionType,
	hideHeaders,
	rowHeight,
	handleGetRowId,
	getRowHeight,
}) {
	const { gridApi, setGridApi, columnApi, setColumnApi } = useGridState();

	return (
		<BaseGrid
			gridApi={gridApi}
			setGridApi={setGridApi}
			columnApi={columnApi}
			setColumnApi={setColumnApi}
			onRowClick={onRowClick}
			isSmallViewport={isSmallViewport}
			sortModel={sortModel}
			data={data}
			updateSortModel={updateSortModel}
			filterText={filterText}
			maxRows={maxRows}
			maxHeight={maxHeight}
			minHeight={minHeight}
			rowSelectionType={rowSelectionType}
			hideHeaders={hideHeaders}
			rowHeight={rowHeight}
			handleGetRowId={handleGetRowId}
			getRowHeight={getRowHeight}
		>
			{children}
		</BaseGrid>
	);
}

SimpleGrid.rowSelectionOptions = BaseGrid.rowSelectionOptions;

SimpleGrid.propTypes = {
	...BaseGrid.props,
};
