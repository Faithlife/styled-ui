import React from 'react';
import PropTypes from 'prop-types';

export function TableHeading({
	displayName,
	fieldName,
	isSortable,
	defaultSort,
	isRightAligned,
	cellComponent,
	isLargeViewportOnly,
	isSmallViewportOnly,
	suppressMenu,
	isResizable,
	width,
	minWidth,
	maxWidth,
	groupByColumn,
}) {
	return <div />;
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

TableHeading.propTypes = {
	displayName: PropTypes.string,
	fieldName: PropTypes.string,
	isSortable: PropTypes.bool,
	defaultSort: PropTypes.oneOf(Object.values(TableHeading.sortOptions)),
	isRightAligned: PropTypes.bool,
	/** A react component to render in the cell */
	cellComponent: PropTypes.function,
	/** Whether the column should only show on larger viewports */
	isLargeViewportOnly: PropTypes.bool,
	/** Whether the column should only show on small viewports */
	isSmallViewportOnly: PropTypes.bool,
	/** Where to hide the ag-grid options menu */
	suppressMenu: PropTypes.bool,
	/** Allows the column to be resized */
	isResizable: PropTypes.bool,
	width: PropTypes.number,
	minWidth: PropTypes.number,
	maxWidth: PropTypes.number,
	/** Whether to use the column properties as a group */
	groupByColumn: PropTypes.bool,
};
