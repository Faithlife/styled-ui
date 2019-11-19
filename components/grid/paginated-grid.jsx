import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useGridState, useGridHandles } from './grid-helpers';
import { BaseGrid } from './base-grid';

export const PaginatedGrid = React.forwardRef((props, ref) => {
	// First separate out the props that are this grid component specific
	const { children, currentPageNumber, onPageNumberChange, maxRows, ...baseGridProps } = props;

	const { gridApi, setGridApi, columnApi, setColumnApi } = useGridState();

	useGridHandles(gridApi, ref);

	useEffect(() => {
		if (gridApi && currentPageNumber !== null && currentPageNumber !== undefined) {
			gridApi.paginationGoToPage(currentPageNumber);
		}
	}, [gridApi, currentPageNumber]);

	const handlePaginationChanged = useCallback(() => {
		if (gridApi) {
			gridApi.sizeColumnsToFit();
			if (onPageNumberChange) {
				const pageNumber = gridApi.paginationGetCurrentPage();
				onPageNumberChange(pageNumber);
			}
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
			{...baseGridProps}
			gridApi={gridApi}
			setGridApi={setGridApi}
			columnApi={columnApi}
			setColumnApi={setColumnApi}
			gridOptions={gridOptions}
			maxRows={maxRows}
			hasPagingBar
		>
			{children}
		</BaseGrid>
	);
});

PaginatedGrid.rowSelectionOptions = BaseGrid.rowSelectionOptions;

PaginatedGrid.propTypes = {
	...BaseGrid.propTypes,
	currentPageNumber: PropTypes.number,
	onPageNumberChange: PropTypes.func,
};
