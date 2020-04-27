import { useRef, useMemo, useEffect, useCallback, useState } from 'react';
import { filterTextField } from '../base-grid';

const initialState: {
	rowCount: number;
	moreRows: boolean;
	isLoading: boolean;
	filterText: string | number;
} = {
	rowCount: 0,
	moreRows: true,
	isLoading: false,
	filterText: '',
};

export function useGridServerDatasource(
	requestFunction: (request: GetRowsRequest) => Promise<[any[], boolean]>,
	options?: Options
): ServerSideDatasource {
	const [rowState, setRowState] = useState(initialState);
	const datasource = useCurrentFunction(requestFunction);

	const abortController: React.MutableRefObject<AbortController | null> = useRef(null);

	useEffect(() => {
		return () => {
			if (abortController.current) {
				abortController.current.abort();
			}
		};
	}, []);

	const handleRequest = useCurrentFunction(
		useCallback(
			async ({ request, successCallback, failCallback }: ServerSideGetRowsParams) => {
				if (abortController.current) {
					abortController.current.abort();
				}
				abortController.current = new AbortController();
				const currentAbortController = abortController.current;

				const { [filterTextField]: filterTextObject } = request.filterModel;
				const filterText = (filterTextObject && filterTextObject.filter) || '';
				setRowState(state => ({
					...state,
					isLoading: true,
					rowCount: filterText === state.filterText ? state.rowCount : 0,
					filterText,
				}));

				try {
					const response = await datasource.current(
						mapAgGridRequest(request),
						currentAbortController.signal
					);
					if (currentAbortController.signal.aborted) {
						return;
					}

					if (response) {
						const [rows, moreRows] = response;
						if (!rows || !Array.isArray(rows)) {
							failCallback();
						}
						setRowState(state => {
							successCallback(rows, moreRows ? -1 : state.rowCount + rows.length);
							return {
								...state,
								rowCount: state.rowCount + rows.length,
								moreRows,
								isLoading: false,
							};
						});
					}
				} catch (error) {
					failCallback();
					console.error(error);
				}
			},
			[datasource]
		)
	);

	const setFilterText = useCallback(filterText => {
		setRowState(state => ({ ...state, filterText, moreRows: true, rowCount: 0 }));
	}, []);

	const { rowCount, moreRows, isLoading } = rowState;
	const { fetchLimit, maxPagesToCache } = options || {};
	const serverDatasource = useMemo(
		() => ({
			getRows: request => handleRequest.current(request),
			rowCount: rowCount,
			isMoreRows: moreRows,
			isLoading: isLoading,
			fetchLimit,
			maxPagesToCache,
		}),
		[rowCount, moreRows, isLoading, setFilterText, fetchLimit, maxPagesToCache] //eslint-disable-line react-hooks/exhaustive-deps
	);

	return serverDatasource;
}

function useCurrentFunction(func: Function) {
	const funcRef = useRef(func);

	useEffect(() => {
		funcRef.current = func;
	}, [func]);

	return funcRef;
}

function mapAgGridRequest(request: ServerSideGetRowsRequest): GetRowsRequest {
	const { [filterTextField]: filterTextObject, ...restFilters } = request.filterModel;
	const filterModel: FilterModel = {
		filterText: filterTextObject && filterTextObject.filter,
		filters: null,
	};
	if (restFilters) {
		for (const [key, filter] of Object.entries(restFilters)) {
			filterModel.filters = filterModel.filters || {};
			filterModel.filters[key] = {
				filterType: filter.filterType,
				filterKind: filter.type,
				filter: filter.filter,
				filterTo: filter.filterTo,
			};
		}
	}

	return {
		startRow: request.startRow,
		endRow: request.endRow,
		rowGroupColumns: request.rowGroupCols.map(x => ({ id: x.id, fieldName: x.field })),
		valueColumns: request.valueCols.map(x => ({ id: x.id, fieldName: x.field })),
		pivotColumns: request.pivotCols.map(x => ({ id: x.id, fieldName: x.field })),
		isInPivotMode: request.pivotMode,
		groupingKeys: request.groupKeys,
		filterModel,
		sortModel: request.sortModel.map(x => ({ fieldName: x.colId, sort: x.sort })),
	};
}

interface Options {
	fetchLimit?: number;
	maxPagesToCache?: number;
}

interface Column {
	id: string;
	fieldName: string;
}

interface FilterModel {
	filterText: string | number | undefined;
	filters: {
		[key: string]: {
			filterType: string;
			filterKind: string;
			filter: string | number;
			filterTo: string | number;
		};
	} | null;
}

interface SortModel {
	fieldName: string;
	sort: 'asc' | 'desc';
}

interface GetRowsRequest {
	startRow: number;
	endRow: number;
	rowGroupColumns: Column[];
	valueColumns: Column[];
	pivotColumns: Column[];
	isInPivotMode: boolean;
	groupingKeys: string[];
	filterModel: FilterModel;
	sortModel: SortModel[];
}

interface AGColumn {
	id: string;
	displayName: string;
	field: string;
	aggFunc: string;
}

interface ServerSideDatasource {
	getRows: Function;
	rowCount: number;
	isMoreRows: boolean;
	isLoading: boolean;
}

interface ServerSideGetRowsRequest {
	rowGroupCols: AGColumn[];
	valueCols: AGColumn[];
	pivotCols: AGColumn[];
	pivotMode: boolean;
	groupKeys: string[];
	filterModel: { [key: string]: AGFilter };
	sortModel: any;
	startRow: number;
	endRow: number;
}

interface ServerSideGetRowsParams {
	request: ServerSideGetRowsRequest;
	parentNode: any;
	successCallback: (rowsThisPage: any[], lastRow: number) => void;
	failCallback: () => void;
}

interface AGFilter {
	filterType: string;
	type: string;
	filter: string | number;
	filterTo: string | number;
}