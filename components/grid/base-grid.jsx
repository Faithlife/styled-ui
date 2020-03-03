import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import { Box } from '../Box';
import { handleShowCheckbox, handleIsEditable, editorComponentTag } from './grid-helpers';
import { deprecateComponent } from '../utils';

const gridHeight = 8;
const defaultRowHeight = gridHeight * 5;
const headerHeight = gridHeight * 5;
const noRowsDefaultTableHeight = 200;

/** A wrapper of ag-grid with some boilerplate code to handle initialization and sorting/ filtering */
function BaseGridComponent({
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
	showDragHandle,
	onRowDataChange,
	context,
	filters,
}) {
	const tableHeightPadding = hasPagingBar ? 42 : 2;
	const prevViewportSize = useRef(isSmallViewport);

	useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			console.warn(
				'Warning: You are using a deprecated Grid component that will be removed in the next major release of Styled UI.',
			);
		}
	}, []);

	useEffect(() => {
		if (gridApi && isSmallViewport !== prevViewportSize.current) {
			// Set proper column sizes once gridApi is available and component has mounted
			// setTimeout necessary in certain browsers (e.g. Safari) to ensure ag-grid components have mounted
			// See 'Sizing Columns By Default' here: https://www.ag-grid.com/javascript-grid-resizing/
			setTimeout(() => gridApi.sizeColumnsToFit(), 0);
			prevViewportSize.current = isSmallViewport;
		}
	}, [gridApi, isSmallViewport]);

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

	useEffect(() => {
		if (gridApi && !maxRows) {
			gridApi.setDomLayout('autoHeight');
		}
	}, [gridApi, maxRows]);

	useEffect(() => {
		if (gridApi) {
			gridApi.setFilterModel(filters);
			gridApi.onFilterChanged();
		}
	}, [gridApi, filters]);

	const handleSelectionChanged = useCallback(() => {
		if (onRowSelect) {
			const selectedRows = gridApi.getSelectedRows();
			onRowSelect(selectedRows);
		}
	}, [gridApi, onRowSelect]);

	const { headingChildren, cellComponents, suppressRowClick } = parseChildrenSettings(
		children,
		additionalCellComponents,
	);

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
			if (!event.column.colDef.hasInteractableElement && !event.column.colDef.checkboxSelection) {
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

	const handleCellEdit = useCallback(
		({ data: rowData }) => {
			onRowDataChange(rowData);
		},
		[onRowDataChange],
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

	let calculatedTableHeight;
	if (maxRows) {
		calculatedTableHeight =
			rowCount !== 0
				? (maxRows && maxRows < rowCount ? maxRows : rowCount) * (rowHeight || defaultRowHeight) +
				  tableHeightPadding +
				  currentHeaderHeight
				: noRowsDefaultTableHeight;
	} else {
		calculatedTableHeight = '100%';
	}

	return (
		<Box
			className="ag-theme-faithlife"
			height={calculatedTableHeight}
			minHeight={minHeight}
			maxHeight={maxHeight}
		>
			<AgGridReact
				rowData={data}
				context={context}
				onGridReady={handleGridReady}
				onGridSizeChanged={handleGridResize}
				onSortChanged={handleSortChanged}
				onSelectionChanged={handleSelectionChanged}
				rowSelection={
					!onRowClick && !onRowSelect
						? BaseGrid.rowSelectionOptions.none
						: rowSelectionType || BaseGrid.rowSelectionOptions.single
				}
				frameworkComponents={cellComponents}
				headerHeight={!hideHeaders ? headerHeight : 0}
				rowHeight={rowHeight || defaultRowHeight}
				suppressHorizontalScroll
				rowClass={onRowClick ? 'ag-grid-clickable-row' : ''}
				deltaRowDataMode
				getRowNodeId={handleGetRowId || getRowNodeId}
				suppressRowClickSelection={suppressRowClick}
				onCellClicked={suppressRowClick ? handleCellClicked : null}
				getRowHeight={getRowHeight}
				onRowClicked={suppressRowClick ? null : handleRowClicked}
				onCellEditingStopped={handleCellEdit}
				suppressContextMenu
				animateRows
				reactNext
				colResizeDefault="shift"
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
						isEditable,
						shouldBeEditable,
						editorComponent,
						...columnProps
					} = child.props;
					return (
						<AgGridColumn
							{...additionalColumnOptions}
							{...columnProps}
							rowDrag={showDragHandle && index === 0}
							key={fieldName}
							headerName={displayName}
							field={fieldName}
							sortable={isSortable}
							cellRenderer={cellComponent ? fieldName : null}
							cellEditor={editorComponent ? `${fieldName}${editorComponentTag}` : null}
							comparator={sortFunction}
							resizable={isResizable}
							sort={defaultSort}
							headerClass={isRightAligned && 'ag-header-right-aligned'}
							cellClass={`ag-faithlife-cell ${isRightAligned ? 'ag-cell-right-aligned' : ''}`}
							rowGroup={groupByColumn}
							hide={
								groupByColumn ||
								hide ||
								(isSmallViewport ? isLargeViewportOnly : isSmallViewportOnly)
							}
							checkboxSelection={
								shouldShowCheckbox ? handleShowCheckbox(shouldShowCheckbox) : showCheckbox
							}
							editable={shouldBeEditable ? handleIsEditable(shouldBeEditable) : isEditable}
							singleClickEdit={shouldBeEditable || isEditable}
						/>
					);
				})}
			</AgGridReact>
		</Box>
	);
}

const BaseGrid = deprecateComponent(
	BaseGridComponent,
	'This Grid component is leaving Styled-UI and is now available from the @faithlife/equipment-grid package.\nPlease see the FaithlifeEquipment repo for more details: https://git.faithlife.dev/Logos/FaithlifeEquipment',
);

BaseGrid.rowSelectionOptions = {
	none: '',
	single: 'single',
	multi: 'multiple',
};

BaseGrid.expandedRowsOptions = {
	all: -1,
	none: 0,
	topLevel: 1,
};

BaseGrid.propTypes = {
	isSmallViewport: PropTypes.bool,
	/** The Max amount of rows to show in the table. Leave blank to enable auto height/ infinite scroll */
	maxRows: PropTypes.number,
	/** An array of the data for the rows */
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		}).isRequired,
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
	/** Called with new data after the existing data has been edited. Required for dragDrop and cell editing */
	handleCellEdit: PropTypes.func,
	/** Called after a row is updated with the new row data */
	onRowDataChange: PropTypes.func,
	/** An object that will be passed to cell components */
	context: PropTypes.object,
	/** An object of filters see examples and https://www.ag-grid.com/javascript-grid-filter-provided-simple/#filterOptions */
	filters: PropTypes.object,
};

function parseChildrenSettings(children, additionalCellComponents = {}) {
	const headingChildren = React.Children.toArray(children).filter(
		child => child && child.type.isGridHeading,
	);

	const cellComponents = headingChildren
		.filter(child => !!child.props.cellComponent || !!child.props.editorComponent)
		.reduce((components, child) => {
			if (child.props.cellComponent) {
				components[child.props.fieldName] = child.props.cellComponent;
			}
			if (child.props.editorComponent) {
				components[`${child.props.fieldName}${editorComponentTag}`] = child.props.editorComponent;
			}
			return components;
		}, {});

	const suppressRowClick = headingChildren.some(
		child =>
			child.props.hasInteractableElement ||
			child.props.showCheckbox ||
			child.props.shouldShowCheckbox,
	);

	return {
		headingChildren,
		cellComponents: { ...cellComponents, ...additionalCellComponents },
		suppressRowClick,
	};
}

export { BaseGrid };
