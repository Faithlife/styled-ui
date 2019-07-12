import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTableState } from './table-helpers';
import { BaseTable } from './base-table';

export function PaginatedTable({
	onRowClick,
	maxRows,
	children,
	isSmallViewport,
	filterText,
	sortModel,
	updateSortModel,
	currentPageNumber,
	onPageNumberChange,
	data,
	rowSelectionType,
}) {
	const { gridApi, setGridApi, columnApi, setColumnApi } = useTableState();

	useEffect(() => {
		if (gridApi && currentPageNumber !== null && currentPageNumber !== undefined) {
			gridApi.paginationGoToPage(currentPageNumber);
		}
	}, [gridApi, currentPageNumber]);

	const handlePaginationChanged = useCallback(() => {
		if (gridApi && onPageNumberChange) {
			const pageNumber = gridApi.paginationGetCurrentPage();
			onPageNumberChange(pageNumber);
		}
	}, [gridApi, onPageNumberChange]);

	const gridOptions = useMemo(
		() => ({
			onPaginationChanged: handlePaginationChanged,
			pagination: true,
			paginationPageSize: maxRows,
		}),
		[handlePaginationChanged, maxRows],
	);

	return (
		<BaseTable
			gridApi={gridApi}
			setGridApi={setGridApi}
			columnApi={columnApi}
			setColumnApi={setColumnApi}
			onRowClick={onRowClick}
			isSmallViewport={isSmallViewport}
			maxRows={maxRows}
			filterText={filterText}
			sortModel={sortModel}
			gridOptions={gridOptions}
			updateSortModel={updateSortModel}
			rowSelectionType={rowSelectionType}
			data={data}
		>
			{children}
		</BaseTable>
	);
}

PaginatedTable.rowSelectionOptions = BaseTable.rowSelectionOptions;

PaginatedTable.propTypes = {
	...BaseTable.propTypes,
	currentPageNumber: PropTypes.number,
	onPageNumberChange: PropTypes.func,
};
