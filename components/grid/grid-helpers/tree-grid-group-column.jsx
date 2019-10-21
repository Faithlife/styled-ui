import React from 'react';
import PropTypes from 'prop-types';
import { GridColumn } from './grid-column';

export function TreeGroupColumn({
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
}) {
	return <div />;
}

TreeGroupColumn.defaultProps = {
	isSortable: true,
	suppressMenu: true,
	isResizable: true,
	cellComponents: false,
};

TreeGroupColumn.isTreeGroup = true;

TreeGroupColumn.sortOptions = GridColumn.sortOptions;

TreeGroupColumn.propTypes = {
	displayName: PropTypes.string,
	isSortable: PropTypes.bool,
	defaultSort: PropTypes.oneOf(Object.values(TreeGroupColumn.sortOptions)),
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
};
