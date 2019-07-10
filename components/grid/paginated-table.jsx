import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTableState } from './table-helpers';
import { BaseTable } from './base-table';

export function PaginatedTable({
	onRowClick,
	maxRowsPerPage,
	children,
	isSmallViewport,
	filterText,
	sortModel,
	updateSortModel,
	initialPageNumber,
	setCurrentPageNumber,
	data,
}) {
	const { gridApi, setGridApi, columnApi, setColumnApi } = useTableState();

	const handlePaginationChanged = useCallback(() => {
		if (setCurrentPageNumber) {
			const pageNumber = gridApi.getCurrentPage();
			setCurrentPageNumber(pageNumber);
		}
	}, [gridApi, setCurrentPageNumber]);

	const gridOptions = useMemo(
		() => ({
			onPaginationChanged: handlePaginationChanged,
			pagination: true,
			paginationPageSize: maxRowsPerPage,
		}),
		[handlePaginationChanged, maxRowsPerPage],
	);

	return (
		<BaseTable
			gridApi={gridApi}
			setGridApi={setGridApi}
			columnApi={columnApi}
			setColumnApi={setColumnApi}
			onRowClick={onRowClick}
			isSmallViewport={isSmallViewport}
			maxRowsPerPage={maxRowsPerPage}
			initialPageNumber={initialPageNumber}
			filterText={filterText}
			sortModel={sortModel}
			gridOptions={gridOptions}
			updateSortModel={updateSortModel}
			data={data}
		>
			{children}
		</BaseTable>
	);
}

/*
PaginatedTable.propTypes = {
	headings: PropTypes.arrayOf(
		PropTypes.shape({
			field: PropTypes.string.isRequired,
			headerName: PropTypes.string.isRequired,
		}),
	),
	cellComponents: PropTypes.object,
	onRowClick: PropTypes.func,
	largeOnlyColumns: PropTypes.arrayOf(PropTypes.string),
	maxRowsPerPage: PropTypes.number,
	getAdditionalRows: PropTypes.func,
	rowMapper: PropTypes.func.isRequired,
	tableState: PropTypes.object.isRequired,
	referenceId: PropTypes.string,
	context: PropTypes.object,
};
*/
