import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import * as Styled from './styled';

const rowHeight = 45;
const headerHeight = rowHeight - 5;
const tableHeightPadding = 42;

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
}) {
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

	const handleGridReady = useCallback(
		({ api, columnApi }) => {
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

	const handleGridResize = useCallback(() => {
		if (gridApi && columnApi) {
			if (largeOnlyColumns) {
				if (isSmallViewport) {
					columnApi.setColumnsVisible(largeOnlyColumns, false);
				} else {
					columnApi.setColumnsVisible(largeOnlyColumns, true);
				}
			}
			gridApi.sizeColumnsToFit();
		}
	}, [gridApi, columnApi, isSmallViewport, largeOnlyColumns]);

	const handleSortChanged = useCallback(() => {
		if (updateSortModel) {
			const newSortModel = gridApi.getSortModel();
			updateSortModel(newSortModel);
		}
	}, [updateSortModel, gridApi]);

	const rowCount = data ? data.length : 1;
	const currentHeaderHeight = hideHeaders ? 0 : headerHeight;
	const tableHeight =
		(maxRows && maxRows < rowCount ? maxRows : rowCount) * rowHeight +
		tableHeightPadding +
		currentHeaderHeight;
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
				rowHeight={rowHeight}
				suppressHorizontalScroll
				rowClass={onRowClick ? 'ag-grid-clickable-row' : ''}
				groupUseEntireRow
				deltaRowDataMode
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
	children: PropTypes.node,
};
