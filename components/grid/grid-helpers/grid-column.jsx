import React from 'react';
import PropTypes from 'prop-types';

export function GridColumn({
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
	showCheckbox,
	shouldShowCheckbox,
	isEditable,
	shouldBeEditable,
	editorComponent,
	filter,
}) {
	return <div />;
}

GridColumn.defaultProps = {
	isSortable: true,
	suppressMenu: true,
	isResizable: true,
};

GridColumn.isGridHeading = true;

GridColumn.sortOptions = Object.freeze({
	none: '',
	ascending: 'asc',
	descending: 'desc',
});

GridColumn.filterByOptions = Object.freeze({
	text: 'agTextColumnFilter',
	number: 'agNumberColumnFilter',
	date: 'agDateColumnFilter',
});

GridColumn.propTypes = {
	displayName: PropTypes.string,
	fieldName: PropTypes.string,
	isSortable: PropTypes.bool,
	defaultSort: PropTypes.oneOf(Object.values(GridColumn.sortOptions)),
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
	showCheckbox: PropTypes.bool,
	/** Expects boolean return. Called with (isGroup: bool, rowData: object) */
	shouldShowCheckbox: PropTypes.func,
	/** Makes the rows in this column editable */
	isEditable: PropTypes.bool,
	/** Expects boolean return. Called with (isGroup: bool, rowData: object) */
	shouldBeEditable: PropTypes.func,
	/** What to filter by in this column */
	filter: PropTypes.oneOf(Object.values(GridColumn.filterByOptions)),
};
