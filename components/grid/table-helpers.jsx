import React, { useState } from 'react';

export function TableHeading({
	displayName,
	fieldName,
	isSortable,
	defaultSort,
	isRightAligned,
	cellComponent,
	isLargeViewportOnly,
	sortFunction,
	suppressMenu,
	isResizable,
	width,
	minWidth,
	maxWidth,
	groupByColumn,
}) {
	return null;
}

TableHeading.defaultProps = {
	isSortable: true,
	suppressMenu: true,
	isResizable: true,
};

TableHeading.isTableHeading = true;

TableHeading.sortOptions = Object.freeze({
	none: '',
	ascending: 'asc',
	descending: 'desc',
});

export function useTableState() {
	const [gridApi, setGridApi] = useState(null);
	const [columnApi, setColumnApi] = useState(null);

	return { gridApi, setGridApi, columnApi, setColumnApi };
}
