import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import * as Styled from './styled';

export function TableHeading({
	displayName,
	fieldName,
	isSortable,
	defaultSort,
	isRightAligned,
	cellComponent,
	isLargeViewportOnly,
}) {
	return null;
}

TableHeading.isTableHeading = true;

export function useServerSideDatasource({ gridApi, getAdditionalRows, maxRowsPerPage, filter }) {
	const [rowCount, setRowCount] = useState(0);

	useEffect(() => {
		gridApi && gridApi.onFilterChanged();
	}, [gridApi, filter]);

	const getRows = useCallback(
		async ({ request, successCallback, failCallback }) => {
			try {
				console.log('search', concat);
				const { sortModel, startRow, endRow } = request;
				const concat = startRow !== 0;
				console.log(request);
				const { data, hasNext } = await getAdditionalRows({
					// sort: sortModel.length ? `${sortModel[0].colId}:${sortModel[0].sort}` : '',
					offset: startRow,
					limit: endRow - startRow,
					filter,
				});

				const newRowLength = concat ? startRow + data.length : data.length;
				setRowCount(newRowLength);

				console.log('return', newRowLength);

				console.log(data);

				successCallback(data, !hasNext ? newRowLength : null);
			} catch (error) {
				console.log(error);
				failCallback();
			}
		},
		[getAdditionalRows, filter],
	);

	const getRowsRef = useRef(getRows);

	useEffect(() => {
		getRowsRef.current = getRows;
	}, [getRows]);

	const datasource = useMemo(
		() => ({
			datasource: items => getRowsRef.current(items),
			rowCount,
		}),
		[rowCount],
	);

	return datasource;
}

export function useSortModelHandler(gridApi, filter) {
	const { columnName, sortDirection } = filter.currentSort;

	useEffect(() => {
		if (gridApi) {
			if (columnName && sortDirection) {
				gridApi.setSortModel([{ colId: columnName, sort: sortDirection }]);
			} else {
				const sortModel = gridApi.getSortModel()[0] || {};
				setCurrentSort({ columnName: sortModel.colId, sort: sortModel.sort });
			}
		}
	}, [gridApi, columnName, sortDirection]);

	const updateSort = useCallback(() => {
		if (gridApi) {
			const sortModel = gridApi.getSortModel();

			setCurrentSort({ columnName: sortModel[0].colId, sort: sortModel[0].sort });
		}
	}, [gridApi]);

	return [currentSort, updateSort];
}

const sortOptions = Object.freeze({
	none: '',
	asc: 'asc',
	desc: 'desc',
});

const sortIconOptions = Object.freeze({
	[sortOptions.none]: <Styled.UnsortedIcon />,
	[sortOptions.asc]: <Styled.ArrowUpIcon />,
	[sortOptions.desc]: <Styled.ArrowDownIcon />,
});

export function CustomHeader({ displayName, column, enableSorting, setSort, rightAligned }) {
	const [currentSort, setSortIcon] = useState(sortOptions.none);
	const isSortAscending = column.isSortAscending();
	const isSortDescending = column.isSortDescending();

	const handleSortChanged = useCallback(() => {
		if (!isSortAscending && !isSortDescending) {
			setSortIcon(sortOptions.none);
		} else {
			setSortIcon(isSortAscending ? sortOptions.asc : sortOptions.desc);
		}
	}, [isSortAscending, isSortDescending]);

	const handleSort = useCallback(() => {
		let nextOrder = sortOptions.none;
		if (currentSort === sortOptions.none) {
			nextOrder = sortOptions.desc;
		} else if (currentSort === sortOptions.desc) {
			nextOrder = sortOptions.asc;
		}

		setSort(nextOrder);
	}, [currentSort, setSort]);

	useEffect(() => {
		handleSortChanged();
		column.addEventListener('sortChanged', handleSortChanged);

		return () => column.removeEventListener('sortChanged', handleSortChanged);
	}, [column, handleSortChanged]);

	return (
		<Styled.HeaderContainer isRightAligned={rightAligned}>
			{enableSorting ? (
				<Button minorTransparent condensed onClick={handleSort} icon={sortIconOptions[currentSort]}>
					{displayName}
				</Button>
			) : (
				displayName
			)}
		</Styled.HeaderContainer>
	);
}

CustomHeader.propTypes = {
	displayName: PropTypes.string,
	column: PropTypes.object,
	enableSorting: PropTypes.bool,
	setSort: PropTypes.func,
	rightAligned: PropTypes.bool,
};

export const TableNavigationControls = () => {};
