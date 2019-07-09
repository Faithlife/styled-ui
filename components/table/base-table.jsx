import React, { useEffect, useCallback } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import { CustomHeader } from './table-helpers';
import * as Styled from './styled';

const rowHeight = 45;
const headerHeight = rowHeight - 5;

/** A wrapper of ag-grid with some boilerplate code to handle initialization and sorting/ filtering */
export function BaseTable({
	gridApi,
	setGridApi,
	columnApi,
	setColumnApi,
	onRowClick,
	isSmallViewport,
	onPaginationChanged,
	tableRowCount,
	maxRowsPerPage,
	children,
	data,
	/** IGridOptions interface from ag-grid */
	gridOptions,
	sortModel,
	updateSortModel,
	filterText,
}) {
	useEffect(() => {
		if (gridApi) {
			gridApi.setQuickFilter(filterText);
		}
	}, [gridApi, filterText]);

	const handleGridReady = useCallback(
		({ api, columnApi }) => {
			console.log('init');
			setGridApi(api);
			setColumnApi(columnApi);

			api.sizeColumnsToFit();

			if (sortModel) {
				api.setSortModel(sortModel);
			}
			if (filterText) {
				api.setQuickFilter(filterText);
			}
		},
		[setGridApi, setColumnApi, sortModel, filterText],
	);

	const handleSelectionChanged = useCallback(() => {
		const selectedRows = gridApi.getSelectedRows();
		onRowClick && onRowClick(selectedRows[0].id);
	}, [gridApi, onRowClick]);

	const headingChildren = React.Children.toArray(children).filter(
		child => child && child.type.isTableHeading,
	);

	const cellComponents = headingChildren
		.filter(child => !!child.props.cellRenderer)
		.reduce(
			(components, child) => (components[child.props.fieldName] = child.props.cellComponent),
			{},
		);

	console.log(cellComponents, data);
	const largeOnlyColumns = headingChildren
		.filter(child => child.props.isLargeViewportOnly)
		.map(child => child.fieldName);

	const handleGridResize = useCallback(() => {
		if (gridApi && columnApi) {
			if (largeOnlyColumns) {
				// const columns = columnApi.getAllColumns();
				if (isSmallViewport) {
					/* const hiddenColumns = columns.filter(({ colDef }) =>
						largeOnlyColumns.includes(colDef.field),
					); */

					columnApi.setColumnsVisible(largeOnlyColumns, false);
				} else {
					columnApi.setColumnsVisible(largeOnlyColumns, true);
				}
			}
			gridApi.sizeColumnsToFit();
		}
	}, [gridApi, columnApi, isSmallViewport, largeOnlyColumns]);

	const handleSortChanged = useCallback(() => {
		const newSortModel = gridApi.getSortModel();
		updateSortModel(newSortModel);
	}, [updateSortModel, gridApi]);

	const tableHeight = (data ? data.length + 1 : 1) * rowHeight + 33;
	return (
		<Styled.GridContainer className="ag-theme-faithlife" height={tableHeight}>
			<AgGridReact
				rowData={data}
				onGridReady={handleGridReady}
				onGridSizeChanged={handleGridResize}
				onSortChanged={handleSortChanged}
				onSelectionChanged={handleSelectionChanged}
				frameworkComponents={cellComponents}
				headerHeight={headerHeight}
				rowHeight={rowHeight}
				reactNext
				{...gridOptions}
			>
				{headingChildren.map(child => {
					const {
						fieldName,
						displayName,
						isSortable,
						cellComponent,
						sortFunction,
						isResizable,
						defaultSort,
						...columnProps
					} = child.props;
					return (
						<AgGridColumn
							{...columnProps}
							key={fieldName}
							field={fieldName}
							headerName={displayName}
							sortable={isSortable}
							cellRenderer={cellComponent ? fieldName : null}
							comparator={sortFunction}
							resizable={isResizable}
							sort={defaultSort}
						/>
					);
				})}
			</AgGridReact>
		</Styled.GridContainer>
	);
}

/* BaseTable.propTypes = {
	headings: PropTypes.arrayOf(
		PropTypes.shape({
			field: PropTypes.string.isRequired,
			headerName: PropTypes.string.isRequired,
		})
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
}; */

BaseTable.defaultProps = {
	sortModel: {},
};

/**
 * 
 * onGridReady={handleGridReady}
				onGridSizeChanged={handleGridResize}
				onSortChanged={handleSortChanged}
				rowSelection={onRowClick ? 'single' : null}
				onSelectionChanged={handleSelectionChanged}
				frameworkComponents={{ ...cellComponents, customHeader: CustomHeader }}
				headerHeight={headerHeight}
				rowHeight={rowHeight}
				pagination={!!maxRowsPerPage}
				cacheBlockSize={maxRowsPerPage || 2000}
				paginationPageSize={maxRowsPerPage}
				onPaginationChanged={onPaginationChanged}
				maxConcurrentDatasourceRequests={1}
				suppressPaginationPanel
				infiniteInitialRowCount={1000}
				reactNext
				{...gridOptions}
				rowData={data}
 */
