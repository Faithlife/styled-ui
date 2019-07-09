import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { BaseTable } from './base-table';
import { useServerSideDatasource } from './table-helpers';

export function InfiniteScrollTable({
	onRowClick,
	getAdditionalRows,
	isLoading,
	children,
	isSmallViewport,
	filter,
	data,
}) {
	const [gridApi, setGridApi] = useState(null);
	const [columnApi, setColumnApi] = useState(null);

	const { datasource, rowCount } = useServerSideDatasource({ gridApi, getAdditionalRows, filter });

	const tableRowCount = 1;

	const gridOptions = useMemo(
		() => ({
			domLayout: 'autoHeight',
		}),
		[],
	);

	return (
		<BaseTable
			gridApi={gridApi}
			setGridApi={setGridApi}
			columnApi={columnApi}
			setColumnApi={setColumnApi}
			datasource={datasource}
			onRowClick={onRowClick}
			isSmallViewport={isSmallViewport}
			tableRowCount={tableRowCount}
			filter={filter}
			data={data}
			gridOptions={gridOptions}
		>
			{children}
		</BaseTable>
	);
}

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
