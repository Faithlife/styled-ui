import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { LicenseManager } from 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import { Box, LoadingSpinner, Text } from '@faithlife/styled-ui';
import { handleShowCheckbox, handleIsEditable, editorComponentTag } from './grid-helpers';

LicenseManager.setLicenseKey(
	'Faithlife_Corporation_MultiApp_4Devs_3Deployment_26_September_2020__MTYwMTA3NDgwMDAwMA==39f1a3354b35f48186eec1739954e621'
);

const gridHeight = 8;
const defaultRowHeight = gridHeight * 5;
const headerHeight = gridHeight * 5;
const noRowsDefaultTableHeight = 200;
const defaultFetchLimit = 100;
const loadingCellComponent = 'loadingCellComponent';
const serverSideRowModel = 'serverSide';
const clientSideRowModel = 'clientSide';

const defaultLocalization = {
	noRowsMessage: 'No Rows to Show',
	loadingRows: 'Loading...',
	pageControls: {
		to: 'to',
		of: 'of',
		page: 'Page',
	},
};

export const filterTextField = 'baseGridFilterText';

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
	showDragHandle,
	onRowDataChange,
	context,
	filters,
	localization,
}) {
	const tableHeightPadding = hasPagingBar ? 42 : 2;
	const prevViewportSize = useRef(isSmallViewport);

	const [rowModelType] = useState(determineRowModelType(data));
	const [hasWarned, setHasWarned] = useState(false);
	const [datasourceProps, setDatasourceProps] = useState();
	useEffect(() => {
		if (process.env.environment !== 'production' && !hasWarned) {
			if (!rowModelType) {
				console.error(
					'The supplied datasource is invalid.',
					'It must be of type Array or IServerSideDatasource.'
				);
				setHasWarned(true);
			}

			if (rowModelType !== determineRowModelType(data)) {
				console.error('You cannot currently switch datasource types after one is set.');
				setHasWarned(true);
			}
		}

		if (!datasourceProps && determineRowModelType(data) === serverSideRowModel) {
			setDatasourceProps({
				rowModelType,
				cacheBlockSize: data.fetchLimit || maxRows || defaultFetchLimit,
				maxBlocksInCache: data.maxPagesToCache,
			});
		}
	}, [gridApi, data, hasWarned, rowModelType, datasourceProps, maxRows]);

	useEffect(() => {
		if (rowModelType === clientSideRowModel) {
			setDatasourceProps({ rowData: data });
		}
	}, [data, rowModelType]);

	const prevIsLoading = useRef(false);
	useEffect(() => {
		if (gridApi && rowModelType === serverSideRowModel) {
			if (data.totalRowCount === 0 && !data.isMoreRows) {
				gridApi.showNoRowsOverlay();
				prevIsLoading.current = false;
			} else {
				gridApi.hideOverlay();
				prevIsLoading.current = false;
			}
		}
	}, [gridApi, rowModelType, data]);

	useEffect(() => {
		if (gridApi && rowModelType === serverSideRowModel) {
			const filterModel = gridApi.getFilterModel();
			gridApi.setFilterModel({
				...filterModel,
				[filterTextField]: { type: '', filter: filterText },
			});
		}
	}, [gridApi, rowModelType, filterText]);

	// Additional options are here: https://www.ag-grid.com/javascript-grid-internationalisation/
	const localeText = useMemo(
		() => ({
			noRowsToShow:
				(localization && localization.noRowsMessage) || defaultLocalization.noRowsMessage,
			to: (localization && localization.pageControls.to) || defaultLocalization.pageControls.to,
			from:
				(localization && localization.pageControls.from) || defaultLocalization.pageControls.from,
			page:
				(localization && localization.pageControls.page) || defaultLocalization.pageControls.page,
			loadingRows: (localization && localization.loadingRows) || defaultLocalization.loadingRows,
		}),
		[localization]
	);

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
		if (gridApi && rowModelType === clientSideRowModel) {
			gridApi.setQuickFilter(filterText);
		}
	}, [gridApi, filterText, rowModelType]);

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
			const filterModel = gridApi.getFilterModel();
			const { [filterTextField]: filterText } = filterModel;
			gridApi.setFilterModel({ ...filters, [filterTextField]: filterText });
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
		additionalCellComponents
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
				onRowClick && event.data && onRowClick(event.data);
			}
		},
		[onRowClick]
	);

	const handleRowClicked = useCallback(
		event => {
			onRowClick && event.data && onRowClick(event.data);
		},
		[onRowClick]
	);

	const handleCellEdit = useCallback(
		({ data: rowData }) => {
			onRowDataChange(rowData);
		},
		[onRowDataChange]
	);

	const handleGridReady = useCallback(
		({ api, columnApi }) => {
			setGridApi(api);
			setColumnApi(columnApi);

			if (sortModel) {
				api.setSortModel(sortModel);
			}

			if (filterText) {
				if (rowModelType === clientSideRowModel) {
					api.setQuickFilter(filterText);
				} else if (rowModelType === serverSideRowModel) {
					const filterModel = api.getFilterModel();
					api.setFilterModel({
						...filterModel,
						[filterTextField]: { type: '', filter: filterText },
					});
					api.onFilterChanged();
				}
			}

			if (rowModelType === serverSideRowModel) {
				api.setServerSideDatasource(data);
			}
		},
		[setGridApi, setColumnApi, sortModel, filterText, rowModelType, data]
	);

	let totalRowCount = null;
	if (rowModelType === clientSideRowModel) {
		totalRowCount = data ? data.length : 0;
	} else if (rowModelType === serverSideRowModel) {
		totalRowCount = data.totalRowCount;
	}

	let calculatedTableHeight = '100%';
	if (totalRowCount === 0) {
		calculatedTableHeight = noRowsDefaultTableHeight;
	} else if (maxRows) {
		const currentHeaderHeight = hideHeaders ? 1 : headerHeight;
		const visibleRowCount = Math.min(maxRows, totalRowCount || Infinity);
		calculatedTableHeight =
			visibleRowCount * (rowHeight || defaultRowHeight) + tableHeightPadding + currentHeaderHeight;
	}

	if (!datasourceProps) {
		return null;
	}
	return (
		<Box
			className="ag-theme-faithlife"
			height={calculatedTableHeight}
			minHeight={minHeight}
			maxHeight={maxHeight}
		>
			<AgGridReact
				{...datasourceProps}
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
				localeText={localeText}
				loadingCellRendererParams={{ loadingMessage: localeText.loadingRows }}
				loadingCellRenderer={loadingCellComponent}
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
						filterParams,
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
							filterParams={{
								...filterParams,
								values: (filterParams && filterParams.values) || ['wat'],
							}}
						/>
					);
				})}
				<AgGridColumn field={filterTextField} hide filter="agTextColumnFilter" />
			</AgGridReact>
		</Box>
	);
}

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
	/** The datasource for the rows */
	data: PropTypes.oneOfType(
		[
			PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
				})
			),
		],
		PropTypes.shape({
			getRows: PropTypes.func,
		})
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
	/** Localization options */
	localization: PropTypes.shape({
		noRowsMessage: PropTypes.string,
		loadingRows: PropTypes.string,
		pageControls: PropTypes.shape({
			to: PropTypes.string,
			of: PropTypes.string,
			page: PropTypes.string,
		}),
	}),
};

function LoadingCell({ loadingMessage }) {
	return (
		<Box display="flex" alignItems="center" paddingY={3}>
			<LoadingSpinner small />
			<Text textStyle="ui.16" paddingLeft={3}>
				{loadingMessage}
			</Text>
		</Box>
	);
}

function parseChildrenSettings(children, additionalCellComponents = {}) {
	const headingChildren = React.Children.toArray(children).filter(
		child => child && child.type.isGridHeading
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
			child.props.shouldShowCheckbox
	);

	return {
		headingChildren,
		cellComponents: {
			[loadingCellComponent]: LoadingCell,
			...cellComponents,
			...additionalCellComponents,
		},
		suppressRowClick,
	};
}

function determineRowModelType(data) {
	if (!data || Array.isArray(data)) {
		return clientSideRowModel;
	}

	if (data && !!data.getRows) {
		return serverSideRowModel;
	}

	return null;
}
