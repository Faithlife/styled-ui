import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import { handleShowCheckbox } from './grid-helpers';
import * as Styled from './styled';

const gridHeight = 8;
const defaultRowHeight = gridHeight * 5;
const headerHeight = gridHeight * 5;
const noRowsDefaultTableHeight = 200;

/** A wrapper of ag-grid with some boilerplate code to handle initialization and sorting/ filtering */
export function BaseGrid({
	gridApi,
	setGridApi,
	columnApi,
	setColumnApi,
	onRowClick,
	isSmallViewport,
	maxRows,
	maxHeight,
	minHeight,
	children,
	data,
	getRowHeight,
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
	additionalCellComponents,
	additionalColumnOptions,
	onRowSelect,
}) {
	const tableHeightPadding = hasPagingBar ? 42 : 2;

	useEffect(() => {
		if (columnApi && gridApi) {
			columnApi.resetColumnState();
			if (largeOnlyColumns && isSmallViewport) {
				columnApi.setColumnsVisible(largeOnlyColumns, false);
				columnApi.setColumnsVisible(smallOnlyColumns, true);
			} else if (smallOnlyColumns && !isSmallViewport) {
				columnApi.setColumnsVisible(largeOnlyColumns, true);
				columnApi.setColumnsVisible(smallOnlyColumns, false);
			}
			// Set proper column sizes once gridApi is available and component has mounted
			// setTimeout necessary in certain browsers (e.g. Safari) to ensure ag-grid components have mounted
			// See 'Sizing Columns By Default' here: https://www.ag-grid.com/javascript-grid-resizing/
			setTimeout(() => gridApi.sizeColumnsToFit(), 0);
		}
	}, [columnApi, gridApi, isSmallViewport, largeOnlyColumns, smallOnlyColumns]);

	useEffect(() => {
		if (gridApi) {
			gridApi.resetRowHeights();
		}
	}, [gridApi, rowHeight, getRowHeight]);

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
		onRowSelect && onRowSelect(selectedRows);
	}, [gridApi, onRowSelect]);

	const {
		headingChildren,
		cellComponents,
		largeOnlyColumns,
		smallOnlyColumns,
		suppressRowClick,
	} = parseChildrenSettings(children, additionalCellComponents);

	const handleGridResize = useCallback(() => {
		if (gridApi) {
			setTimeout(() => gridApi.sizeColumnsToFit(), 0);
		}
	}, [gridApi]);

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
				onRowClick && onRowClick(event.data);
			}
		},
		[onRowClick],
	);

	const handleRowClicked = useCallback(
		event => {
			onRowClick && onRowClick(event.data);
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
	const currentHeaderHeight = hideHeaders ? 1 : headerHeight;

	const calculatedTableHeight =
		rowCount !== 0
			? (maxRows && maxRows < rowCount ? maxRows : rowCount) * (rowHeight || defaultRowHeight) +
			  tableHeightPadding +
			  currentHeaderHeight
			: noRowsDefaultTableHeight;
	return (
		<Styled.GridContainer
			className="ag-theme-faithlife"
			height={calculatedTableHeight}
			minHeight={minHeight}
			maxHeight={maxHeight}
		>
			<AgGridReact
				rowData={data}
				onGridReady={handleGridReady}
				onGridSizeChanged={handleGridResize}
				onSortChanged={handleSortChanged}
				onSelectionChanged={handleSelectionChanged}
				rowSelection={
					!onRowClick
						? BaseGrid.rowSelectionOptions.none
						: rowSelectionType || BaseGrid.rowSelectionOptions.single
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
				getRowHeight={getRowHeight}
				onRowClicked={suppressRowClick ? null : handleRowClicked}
				reactNext
				{...gridOptions}
			>
				{headingChildren.map((child, index) => {
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
						isSmallViewportOnly,
						showCheckbox,
						shouldShowCheckbox,
						...columnProps
					} = child.props;
					return (
						<AgGridColumn
							{...additionalColumnOptions}
							{...columnProps}
							key={fieldName}
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
							checkboxSelection={
								shouldShowCheckbox ? handleShowCheckbox(shouldShowCheckbox) : showCheckbox
							}
						/>
					);
				})}
			</AgGridReact>
		</Styled.GridContainer>
	);
}

BaseGrid.rowSelectionOptions = {
	none: '',
	single: 'single',
	multi: 'multiple',
};

BaseGrid.propTypes = {
	isSmallViewport: PropTypes.bool,
	/** The Max amount of rows to show in the table */
	maxRows: PropTypes.number,
	/** An array of the data for the rows */
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		}),
	),
	/** The current sort model for the table */
	sortModel: PropTypes.object,
	/** Called when `sortModel` is updated by the table */
	updateSortModel: PropTypes.func,
	/** Text to filter the rows on */
	filterText: PropTypes.string,
	/** Whether to allow single or multi row select, Use 'GridComponent'.rowSelectionOptions */
	rowSelectionType: PropTypes.oneOf(Object.values(BaseGrid.rowSelectionOptions)),
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
	/** Called when a row is selected with a checkbox */
	onRowSelect: PropTypes.func,
};

function parseChildrenSettings(children, additionalCellComponents = {}) {
	const headingChildren = React.Children.toArray(children).filter(
		child => child && child.type.isGridHeading,
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

	const suppressRowClick = headingChildren.some(
		child =>
			child.props.hasInteractableElement ||
			child.props.showCheckbox ||
			child.props.shouldShowCheckbox,
	);

	return {
		headingChildren,
		cellComponents: { ...cellComponents, ...additionalCellComponents },
		largeOnlyColumns,
		smallOnlyColumns,
		suppressRowClick,
	};
}
