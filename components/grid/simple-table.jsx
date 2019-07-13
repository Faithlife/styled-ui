import React from 'react';
import { useTableState } from './table-helpers';
import { BaseTable } from './base-table';

export function SimpleTable({
	onRowClick,
	children,
	isSmallViewport,
	data,
	filterText,
	sortModel,
	updateSortModel,
	maxRows,
	rowSelectionType,
	hideHeaders,
}) {
	const { gridApi, setGridApi, columnApi, setColumnApi } = useTableState();

	return (
		<BaseTable
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
			rowSelectionType={rowSelectionType}
			hideHeaders={hideHeaders}
		>
			{children}
		</BaseTable>
	);
}

SimpleTable.rowSelectionOptions = BaseTable.rowSelectionOptions;

SimpleTable.propTypes = {
	...BaseTable.props,
};
