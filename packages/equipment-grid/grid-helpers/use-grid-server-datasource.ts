import { useRef, useEffect, useCallback, useState } from 'react';

export function useGridServerDatasource(
	requestFunction: (request: IGetRowsRequest) => Promise<[any[], boolean]>
): IServerSideDatasource {
	const [rowState, setRowState] = useState({ rowCount: 0, moreRows: true, isLoading: false });
	const datasource = useCurrentFunction(requestFunction);

	const handleRequest = useCurrentFunction(
		useCallback(
			async ({ request, successCallback, failCallback }: IServerSideGetRowsParams) => {
				setRowState(state => ({ ...state, isLoading: true }));
				try {
					const [rows, moreRows] = await datasource.current(mapAgGridRequest(request));
					if (!rows || !Array.isArray(rows)) {
						failCallback();
					}
					setRowState(({ rowCount: count }) => {
						successCallback(rows, moreRows ? -1 : count + rows.length);
						return { rowCount: count + rows.length, moreRows, isLoading: false };
					});
				} catch (error) {
					failCallback();
					console.error(error);
				}
			},
			[datasource]
		)
	);

	return {
		getRows: request => handleRequest.current(request),
		rowCount: rowState.rowCount,
		isMoreRows: rowState.moreRows,
		isLoading: rowState.isLoading,
	};
}

function useCurrentFunction(func: Function) {
	const funcRef = useRef(func);

	useEffect(() => {
		funcRef.current = func;
	}, [func]);

	return funcRef;
}

function mapAgGridRequest(request: IServerSideGetRowsRequest): IGetRowsRequest {
	return {
		startRow: request.startRow,
		endRow: request.endRow,
		rowGroupColumns: request.rowGroupCols.map(x => ({ id: x.id, fieldName: x.field })),
		valueColumns: request.valueCols.map(x => ({ id: x.id, fieldName: x.field })),
		pivotColumns: request.pivotCols.map(x => ({ id: x.id, fieldName: x.field })),
		isInPivotMode: request.pivotMode,
		groupingKeys: request.groupKeys,
		filterModel: request.filterModel,
		sortModel: request.sortModel,
	};
}

export interface IColumn {
	id: string;
	fieldName: string;
}

export interface IGetRowsRequest {
	startRow: number;
	endRow: number;
	rowGroupColumns: IColumn[];
	valueColumns: IColumn[];
	pivotColumns: IColumn[];
	isInPivotMode: boolean;
	groupingKeys: string[];
	filterModel: any;
	sortModel: any;
}

export interface IAGColumn {
	id: string;
	displayName: string;
	field: string;
	aggFunc: string;
}

export interface IServerSideDatasource {
	getRows: Function;
	rowCount: number;
	isMoreRows: boolean;
	isLoading: boolean;
}

interface IServerSideGetRowsRequest {
	rowGroupCols: IAGColumn[];
	valueCols: IAGColumn[];
	pivotCols: IAGColumn[];
	pivotMode: boolean;
	groupKeys: string[];
	filterModel: any;
	sortModel: any;
	startRow: number;
	endRow: number;
}

interface IServerSideGetRowsParams {
	request: IServerSideGetRowsRequest;
	parentNode: any;
	successCallback: (rowsThisPage: any[], lastRow: number) => void;
	failCallback: () => void;
}
