import React from 'react';
import PropTypes from 'prop-types';
import { GridColumn } from './grid-column';

// This is maintained separately from the GridColumn because while there is overlap they do have some differences.
export function AggregationGroupColumn({
	displayName,
	isSortable,
	defaultSort,
	cellComponent,
	suppressMenu,
	isResizable,
	width,
	minWidth,
	maxWidth,
	cellComponents,
	fieldName,
	isEditable,
	shouldBeEditable,
	editComponent,
}) {
	return <div />;
}

AggregationGroupColumn.defaultProps = {
	isSortable: true,
	suppressMenu: true,
	isResizable: true,
	cellComponents: false,
};

AggregationGroupColumn.isAggregationGroupColumn = true;

AggregationGroupColumn.sortOptions = GridColumn.sortOptions;

AggregationGroupColumn.propTypes = {
	displayName: PropTypes.string,
	/** Not used in TreeGrid */
	fieldName: PropTypes.string,
	isSortable: PropTypes.bool,
	defaultSort: PropTypes.oneOf(Object.values(AggregationGroupColumn.sortOptions)),
	/** A react component to render in the cell */
	cellComponent: PropTypes.func,
	/** Where to hide the ag-grid options menu */
	suppressMenu: PropTypes.bool,
	/** Allows the column to be resized */
	isResizable: PropTypes.bool,
	width: PropTypes.number,
	minWidth: PropTypes.number,
	maxWidth: PropTypes.number,
	/** Do not show the number of children */
	hideChildrenCount: PropTypes.bool,
	showCheckbox: PropTypes.bool,
	shouldShowCheckbox: PropTypes.func,
	isEditable: PropTypes.bool,
	editComponent: PropTypes.bool,
};
