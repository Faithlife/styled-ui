import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useGridState } from './grid-helpers';
import { BaseGrid } from './base-grid';

export function PaginatedGrid({
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
	hideHeaders,
	rowHeight,
	handleGetRowId,
}) {
	const { gridApi, setGridApi, columnApi, setColumnApi } = useGridState();

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
		<BaseGrid
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
			hideHeaders={hideHeaders}
			rowHeight={rowHeight}
			hasPagingBar
			handleGetRowId={handleGetRowId}
		>
			{children}
		</BaseGrid>
	);
}

PaginatedGrid.rowSelectionOptions = BaseGrid.rowSelectionOptions;

PaginatedGrid.propTypes = {
	...BaseGrid.propTypes,
	currentPageNumber: PropTypes.number,
	onPageNumberChange: PropTypes.func,
};
