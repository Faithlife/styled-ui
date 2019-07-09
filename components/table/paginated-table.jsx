import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { BaseTable } from './base-table';
import { TableNavigationControls } from './table-helpers';
import { useServerSideDatasource } from './table-helpers';

export function PaginatedTable({
	onRowClick,
	maxRowsPerPage,
	getAdditionalRows,
	isLoading,
	children,
	isSmallViewport,
}) {
	const [gridApi, setGridApi] = useState(null);
	const [columnApi, setColumnApi] = useState(null);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	const { datasource, nextToken, rowCount } = useServerSideDatasource(
		gridApi,
		getAdditionalRows,
		maxRowsPerPage,
	);

	const handlePaginationChanged = useCallback(() => {
		if (gridApi) {
			setTotalPages(gridApi.paginationGetTotalPages());
		}
	}, [gridApi, setTotalPages]);

	const handleNavNextPage = useCallback(() => {
		gridApi.paginationGoToNextPage();
		setCurrentPage(prevTotal => prevTotal + 1);
	}, [gridApi]);

	const handleNavPrevPage = useCallback(() => {
		gridApi.paginationGoToPreviousPage();
		setCurrentPage(prevTotal => prevTotal - 1);
	}, [gridApi]);

	const canNavNextPage = !isLoading && (!!nextToken || totalPages - 1 > currentPage);
	const canNavPrevPage = currentPage > 0;
	const tableRowCount =
		maxRowsPerPage && (nextToken || maxRowsPerPage < rowCount) ? maxRowsPerPage : rowCount;

	return (
		<React.Fragment>
			<BaseTable
				gridApi={gridApi}
				setGridApi={setGridApi}
				columnApi={columnApi}
				setColumnApi={setColumnApi}
				datasource={datasource}
				onRowClick={onRowClick}
				isSmallViewport={isSmallViewport}
				onPaginationChanged={handlePaginationChanged}
				tableRowCount={tableRowCount}
				maxRowsPerPage={maxRowsPerPage}
			>
				{children}
			</BaseTable>
			<TableNavigationControls
				isLoading={isLoading}
				onNavigateNext={handleNavNextPage}
				onNavigatePrev={handleNavPrevPage}
				canNavigateNext={canNavNextPage}
				canNavigatePrev={canNavPrevPage}
			/>
		</React.Fragment>
	);
}

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
