import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import { CustomHeader } from './table-helpers';
import * as Styled from './styled';

const rowHeight = 45;
const headerHeight = rowHeight - 5;

const serverSideDatasource = 'serverSide';
const clientSideDatasource = 'clientSide';

const rtmString =
	'See the documentation at https://faithlife.github.io/styled-ui/#/grid/documentation for examples.';

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
	/** Do not use with data prop */
	datasource,
	/** Do not use with datasource prop */
	data,
	/** IGridOptions interface from ag-grid */
	gridOptions,
}) {
	const [datasourceType, setDatasourceType] = useState(null);

	useEffect(() => {
		if (datasource && data) {
			console.warn(
				'You should never have a `datasource` and `data` prop together. If you want to use client side data specify just the `data` prop, otherwise just the `datasource` prop',
				rtmString,
			);
		} else if (!datasource && !data) {
			console.warn('You must specify either `datasource` or `data` props.', rtmString);
		} else if (!!datasource !== !!data && !datasourceType) {
			setDatasourceType(datasource ? serverSideDatasource : clientSideDatasource);
		} else if (
			(datasourceType === serverSideDatasource && data) ||
			(datasourceType === clientSideDatasource && datasource)
		) {
			console.warn('You cannot switch datasource types.', rtmString);
		}
	}, [datasource, data, datasourceType]);

	const handleGridReady = useCallback(
		({ api, columnApi }) => {
			console.log('init');
			setGridApi(api);
			setColumnApi(columnApi);

			api.sizeColumnsToFit();

			/*if (datasourceType === serverSideDatasource) {
				api.setServerSideDatasource({ getRows: datasource });
			}*/
		},
		[datasource, setGridApi, setColumnApi, datasourceType],
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

	const headings = headingChildren.map(child => ({
		headerName: child.props.displayName,
		field: child.props.fieldName,
		sortable: child.props.sortable,
		sort: child.props.defaultSort,
		cellRenderer: cellComponents[child.props.fieldName],
		headerComponent: 'customHeader',
		/* cellClass: classNames(styles.cellStyle, {
			[styles.cellStyleRightAligned]: child.props.isRightAligned,
		}), */
		headerComponentParams: { rightAligned: child.props.isRightAligned },
	}));

	console.log(cellComponents, data);
	const largeOnlyColumns = headingChildren
		.filter(child => child.props.isLargeViewportOnly)
		.map(child => child.fieldName);

	const handleGridResize = useCallback(() => {
		if (gridApi && columnApi) {
			if (largeOnlyColumns) {
				const columns = columnApi.getAllColumns();
				if (isSmallViewport) {
					const hiddenColumns = columns.filter(({ colDef }) =>
						largeOnlyColumns.includes(colDef.field),
					);

					columnApi.setColumnsVisible(hiddenColumns, false);
				} else {
					columnApi.setColumnsVisible(columns, true);
				}
			}
			gridApi.sizeColumnsToFit();
		}
	}, [gridApi, columnApi, isSmallViewport, largeOnlyColumns]);

	/* const handleSortChanged = useCallback(() => {
		setCurrentPage(0);
		updateSort();
	}, []); */

	const tableConfig = useMemo(
		() => ({
			columnDefs: headings,
			onGridReady: handleGridReady,
			onGridSizeChanged: handleGridResize,
			rowSelection: onRowClick ? 'single' : null,
			onSelectionChanged: handleSelectionChanged,
			frameworkComponents: { ...cellComponents, customHeader: CustomHeader },
			headerHeight: headerHeight,
			rowHeight: rowHeight,
			pagination: !!maxRowsPerPage,
			cacheBlockSize: maxRowsPerPage || 2000,
			paginationPageSize: maxRowsPerPage,
			rowModelType: datasourceType === serverSideDatasource ? serverSideDatasource : '',
			onPaginationChanged: onPaginationChanged,
			maxConcurrentDatasourceRequests: 1,
			suppressPaginationPanel: true,
			infiniteInitialRowCount: 1000,
			...gridOptions,
		}),
		[
			cellComponents,
			datasourceType,
			gridOptions,
			handleGridReady,
			handleGridResize,
			handleSelectionChanged,
			headings,
			maxRowsPerPage,
			onPaginationChanged,
			onRowClick,
		],
	);

	const tableHeight = (tableRowCount + 1) * rowHeight + 33;
	return (
		<Styled.GridContainer className="ag-theme-faithlife" height={tableHeight}>
			<AgGridReact gridOptions={tableConfig} rowData={data} />
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
