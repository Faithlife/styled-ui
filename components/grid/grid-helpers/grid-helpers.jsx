import React, { useState, useCallback } from 'react';

const treeGroupColumnComponent = 'treeGroupColumn';

export const dragDirections = {
	up: 'up',
	down: 'down',
};

export function useGridState() {
	const [gridApi, setGridApi] = useState(null);
	const [columnApi, setColumnApi] = useState(null);

	return { gridApi, setGridApi, columnApi, setColumnApi };
}

export function handleShowCheckbox(shouldShowCheckbox) {
	return params => {
		shouldShowCheckbox(params.node.group, params.node.data);
	};
}

export function handleIsDraggable(isDraggable) {
	return params => {
		isDraggable(params.node.group, params.node.data);
	};
}

export function getAggregationColumn({
	children,
	getShouldShowDropTarget,
	isDraggableRow,
	enableDragDrop,
}) {
	const heading = React.Children.toArray(children).find(
		child => child && child.type.isAggregationGroupColumn,
	);

	let groupComponent;
	let groupColumnSettings;
	if (heading) {
		const {
			displayName,
			cellComponent,
			isSortable,
			defaultSort,
			isResizable,
			hideChildrenCount,
			showCheckbox,
			shouldShowCheckbox,
			fieldName,
			...groupProps
		} = heading.props;

		groupComponent = cellComponent ? { [treeGroupColumnComponent]: cellComponent } : {};
		groupColumnSettings = {
			rowDrag: isDraggableRow ? handleIsDraggable(isDraggableRow) : enableDragDrop,
			headerName: displayName,
			field: fieldName,
			sortable: isSortable,
			sort: defaultSort,
			resizable: isResizable,
			cellRendererParams: {
				suppressCount: hideChildrenCount,
				innerRenderer: cellComponent ? treeGroupColumnComponent : '',
				checkbox: shouldShowCheckbox ? handleShowCheckbox(shouldShowCheckbox) : showCheckbox,
			},
			cellClass: 'ag-faithlife-cell',
			cellClassRules: {
				'ag-faithlife-drop-target-row_below': getShouldShowDropTarget(dragDirections.down),
				'ag-faithlife-drop-target-row_above': getShouldShowDropTarget(dragDirections.up),
			},
			headerClass:
				enableDragDrop || isDraggableRow
					? 'ag-faithlife-tree-group-header-with-drag'
					: 'ag-faithlife-tree-group-header',
			...groupProps,
		};
	}

	return { heading, groupComponent, groupColumnSettings };
}
