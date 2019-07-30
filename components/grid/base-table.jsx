import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import * as Styled from './styled';

const defaultRowHeight = 45;
const headerHeight = defaultRowHeight - 5;
const noRowsTableHeight = 200;

/** A wrapper of ag-grid with some boilerplate code to handle initialization and sorting/ filtering */
export function BaseTable({
	gridApi,
	setGridApi,
	columnApi,
	setColumnApi,
	onRowClick,
	isSmallViewport,
	maxRows,
	children,
	data,
	/** IGridOptions interface from ag-grid */
	gridOptions,
	sortModel,
	updateSortModel,
	filterText,
	rowSelectionType,
	hideHeaders,
	rowHeight,
	hasPagingBar,
	handleGetRowId,
}) {
	const tableHeightPadding = hasPagingBar ? 50 : 2;

	useEffect(() => {
		if (columnApi) {
			columnApi.resetColumnState();
		}
	}, [columnApi, isSmallViewport]);

	useEffect(() => {
		if (gridApi) {
			gridApi.resetRowHeights();
		}
	}, [gridApi, rowHeight]);

	useEffect(() => {
		if (gridApi) {
			gridApi.setQuickFilter(filterText);
		}
	}, [gridApi, filterText]);

	useEffect(() => {
		if (gridApi && sortModel) {
			gridApi.setSortModel(sortModel);
		}
	}, [gridApi, sortModel]);

	const handleSelectionChanged = useCallback(() => {
		const selectedRows = gridApi.getSelectedRows();
		onRowClick && onRowClick(selectedRows);
	}, [gridApi, onRowClick]);

	const headingChildren = React.Children.toArray(children).filter(
		child => child && child.type.isTableHeading,
	);

	const cellComponents = headingChildren
		.filter(child => !!child.props.cellComponent)
		.reduce((components, child) => {
			components[child.props.fieldName] = child.props.cellComponent;
			return components;
		}, {});

	const largeOnlyColumns = headingChildren
		.filter(child => child.props.isLargeViewportOnly)
		.map(child => child.props.fieldName);

	const smallOnlyColumns = headingChildren
		.filter(child => child.props.isSmallViewportOnly)
		.map(child => child.props.fieldName);

	const suppressRowClick = headingChildren.some(child => child.props.hasInteractableElement);

	const handleGridResize = useCallback(() => {
		if (gridApi && columnApi) {
			if (largeOnlyColumns) {
				if (isSmallViewport) {
					columnApi.setColumnsVisible(largeOnlyColumns, false);
					columnApi.setColumnsVisible(smallOnlyColumns, true);
				} else {
					columnApi.setColumnsVisible(largeOnlyColumns, true);
					columnApi.setColumnsVisible(smallOnlyColumns, false);
				}
			}
			gridApi.sizeColumnsToFit();
		}
	}, [gridApi, columnApi, isSmallViewport, largeOnlyColumns, smallOnlyColumns]);

	const handleSortChanged = useCallback(() => {
		if (updateSortModel) {
			const newSortModel = gridApi.getSortModel();
			updateSortModel(newSortModel);
		}
	}, [updateSortModel, gridApi]);

	const getRowNodeId = useCallback(data => data.id, []);

	const handleCellClicked = useCallback(
		event => {
			if (!event.column.colDef.hasInteractableElement) {
				onRowClick && onRowClick([event.data]);
			}
		},
		[onRowClick],
	);

	const handleGridReady = useCallback(
		({ api, columnApi }) => {
			setGridApi(api);
			setColumnApi(columnApi);

			if (sortModel) {
				api.setSortModel(sortModel);
			}
			if (filterText) {
				api.setQuickFilter(filterText);
			}
		},
		[setGridApi, setColumnApi, sortModel, filterText],
	);

	const rowCount = data ? data.length : 0;
	const currentHeaderHeight = hideHeaders ? 0 : headerHeight;
	const tableHeight =
		rowCount !== 0
			? (maxRows && maxRows < rowCount ? maxRows : rowCount) * (rowHeight || defaultRowHeight) +
			  tableHeightPadding +
			  currentHeaderHeight
			: noRowsTableHeight;
	return (
		<Styled.GridContainer className="ag-theme-faithlife" height={tableHeight}>
			<AgGridReact
				rowData={data}
				onGridReady={handleGridReady}
				onGridSizeChanged={handleGridResize}
				onSortChanged={handleSortChanged}
				onSelectionChanged={handleSelectionChanged}
				rowSelection={
					!onRowClick
						? BaseTable.rowSelectionOptions.none
						: rowSelectionType || BaseTable.rowSelectionOptions.single
				}
				frameworkComponents={cellComponents}
				headerHeight={!hideHeaders ? headerHeight : 0}
				rowHeight={rowHeight || defaultRowHeight}
				suppressHorizontalScroll
				rowClass={onRowClick ? 'ag-grid-clickable-row' : ''}
				groupUseEntireRow
				deltaRowDataMode
				getRowNodeId={handleGetRowId || getRowNodeId}
				suppressRowClickSelection={suppressRowClick}
				onCellClicked={suppressRowClick ? handleCellClicked : null}
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
						isRightAligned,
						groupByColumn,
						hide,
						isLargeViewportOnly,
						...columnProps
					} = child.props;
					return (
						<AgGridColumn
							{...columnProps}
							key={fieldName}
							colId={fieldName}
							headerName={displayName}
							field={fieldName}
							sortable={isSortable}
							cellRenderer={cellComponent ? fieldName : null}
							comparator={sortFunction}
							resizable={isResizable}
							sort={defaultSort}
							headerClass={isRightAligned && 'ag-header-right-aligned'}
							cellClass={`ag-faithlife-cell ${isRightAligned ? 'ag-cell-right-aligned' : ''}`}
							rowGroup={groupByColumn}
							hide={groupByColumn || hide}
						/>
					);
				})}
			</AgGridReact>
		</Styled.GridContainer>
	);
}

BaseTable.rowSelectionOptions = {
	none: '',
	single: 'single',
	multi: 'multiple',
};

BaseTable.propTypes = {
	isSmallViewport: PropTypes.bool,
	/** The Max amount of rows to show in the table */
	maxRows: PropTypes.number,
	/** An array of the data for the rows */
	data: PropTypes.array.isRequired,
	/** The current sort model for the table */
	sortModel: PropTypes.object,
	/** Called when `sortModel` is updated by the table */
	updateSortModel: PropTypes.func,
	/** Text to filter the rows on */
	filterText: PropTypes.string,
	/** Whether to allow single or multi row select */
	rowSelectionType: PropTypes.oneOf(Object.values(BaseTable.rowSelectionOptions)),
	/** Handler for selected rows */
	onRowClick: PropTypes.func,
	/** Hide headers */
	hideHeaders: PropTypes.bool,
	/** The height, in pixels, of non-header rows in the table.  If not provided, default is 45px */
	rowHeight: PropTypes.number,
	/** Whether component is simple table or paginated table */
	hasPagingBar: PropTypes.bool,
	/** Your data should have an id property or this handler must be included */
	handleGetRowId: PropTypes.func,
	children: PropTypes.node,
};
