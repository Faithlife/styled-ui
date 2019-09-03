import React from 'react';
import PropTypes from 'prop-types';

export function GridHeading({
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
	hasInteractableElement,
}) {
	return <div />;
}

GridHeading.defaultProps = {
	isSortable: true,
	suppressMenu: true,
	isResizable: true,
};

GridHeading.isGridHeading = true;

GridHeading.sortOptions = Object.freeze({
	none: '',
	ascending: 'asc',
	descending: 'desc',
});

GridHeading.propTypes = {
	displayName: PropTypes.string,
	fieldName: PropTypes.string,
	isSortable: PropTypes.bool,
	defaultSort: PropTypes.oneOf(Object.values(GridHeading.sortOptions)),
	isRightAligned: PropTypes.bool,
	/** A react component to render in the cell */
	cellComponent: PropTypes.func,
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
	/** Suppress the entire row receiving the click when you have an interactable element */
	hasInteractableElement: PropTypes.bool,
};
