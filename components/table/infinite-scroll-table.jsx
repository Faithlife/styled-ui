import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { BaseTable } from './base-table';

export function InfiniteScrollTable({
	onRowClick,
	isLoading,
	children,
	isSmallViewport,
	data,
	filterText,
	sortModel,
	updateSortModel,
}) {
	const [gridApi, setGridApi] = useState(null);
	const [columnApi, setColumnApi] = useState(null);

	/*const gridOptions = useMemo(
		() => ({
			domLayout: 'autoHeight',
		}),
		[],
	);*/

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
		>
			{children}
		</BaseTable>
	);
}

/*
InfiniteScrollTable.propTypes = {
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
