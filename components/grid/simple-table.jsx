import React from 'react';
import PropTypes from 'prop-types';
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
			maxRowsPerPage={maxRows}
		>
			{children}
		</BaseTable>
	);
}

/*
SimpleTable.propTypes = {
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
