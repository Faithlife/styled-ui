import React, { useState, useCallback, useEffect } from 'react';
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
	sortFunction,
	suppressMenu,
	isResizable,
	width,
	minWidth,
	maxWidth,
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

const sortIconOptions = Object.freeze({
	[TableHeading.sortOptions.none]: <Styled.UnsortedIcon />,
	[TableHeading.sortOptions.asc]: <Styled.ArrowUpIcon />,
	[TableHeading.sortOptions.desc]: <Styled.ArrowDownIcon />,
});
/*
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
*/
export const TableNavigationControls = () => {};
