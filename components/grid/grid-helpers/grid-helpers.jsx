import React, { useImperativeHandle, useState, useCallback, useRef } from 'react';

const treeGroupColumnComponent = 'treeGroupColumn';

export const editorComponentTag = 'Editor';

export const dragDirections = {
	up: 'up',
	down: 'down',
};

export const dragEventTypes = {
	drag: 'rowDragMove',
	drop: 'rowDragEnd',
	leave: 'rowDragLeave',
};

export function useGridState() {
	const [gridApi, setGridApi] = useState(null);
	const [columnApi, setColumnApi] = useState(null);

	return { gridApi, setGridApi, columnApi, setColumnApi };
}

export function useGridHandles(gridApi, ref) {
	useImperativeHandle(
		ref,
		() => ({
			selectAllRows() {
				if (gridApi) {
					gridApi.selectAll();
				}
			},
			deselectAllRows() {
				if (gridApi) {
					gridApi.deselectAll();
				}
			},
			selectFilteredRows() {
				if (gridApi) {
					gridApi.selectAllFiltered();
				}
			},
			deselectFilteredRows() {
				if (gridApi) {
					gridApi.deselectAllFiltered();
				}
			},
		}),
		[gridApi],
	);
}

export function handleShowCheckbox(shouldShowCheckbox) {
	return params =>
		shouldShowCheckbox(
			params.node.group,
			params.node.data ||
				(params.node.groupData && {
					isGroup: true,
					groupName: params.node.groupData['ag-Grid-AutoColumn'],
				}),
			params,
		);
}

export function handleIsDraggable(isDraggable) {
	return params =>
		isDraggable(
			params.node.group,
			params.node.data ||
				(params.node.groupData && {
					isGroup: true,
					groupName: params.node.groupData['ag-Grid-AutoColumn'],
				}),
			params,
		);
}

export function handleIsEditable(shouldBeEditable) {
	return params =>
		shouldBeEditable(
			params.node.group,
			params.node.data ||
				(params.node.groupData && {
					isGroup: true,
					groupName: params.node.groupData['ag-Grid-AutoColumn'],
				}),
			params,
		);
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

	const groupComponent = {};
	let groupColumnSettings;
	let rowClickSelects;
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
			isEditable,
			shouldBeEditable,
			editComponent,
			...groupProps
		} = heading.props;

		rowClickSelects = !showCheckbox && !shouldShowCheckbox;

		if (cellComponent) {
			groupComponent[treeGroupColumnComponent] = cellComponent;
		}
		if (editComponent) {
			groupComponent[`${treeGroupColumnComponent}${editorComponentTag}`] = editComponent;
		}

		groupColumnSettings = {
			rowDrag: isDraggableRow ? handleIsDraggable(isDraggableRow) : enableDragDrop,
			headerName: displayName,
			field: fieldName,
			sortable: isSortable,
			sort: defaultSort,
			resizable: isResizable,
			editable: shouldBeEditable ? handleIsEditable(shouldBeEditable) : isEditable,
			singleClickEdit: shouldBeEditable || isEditable,
			cellEditor: editComponent ? `${treeGroupColumnComponent}${editorComponentTag}` : null,
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

	return { heading, groupComponent, groupColumnSettings, rowClickSelects };
}

export function useGridDragDrop(isValidDropTarget, getNewPath) {
	const previousHoveredRowNode = useRef();
	const hoveredRowNode = useRef();
	const draggedNode = useRef();
	const dragDirection = useRef();

	const getShouldShowDropTarget = useCallback(
		onDirection => ({ rowIndex }) => {
			if (
				draggedNode.current &&
				hoveredRowNode.current &&
				isValidDropTarget &&
				!isValidDropTarget(
					draggedNode.current.data
						? draggedNode.current.data
						: { isGroup: true, groupName: draggedNode.current.groupData['ag-Grid-AutoColumn'] },
					getNewPath(hoveredRowNode.current, dragDirection.current),
				)
			) {
				return false;
			}
			return (
				hoveredRowNode.current &&
				hoveredRowNode.current.rowIndex === rowIndex &&
				draggedNode.current.rowIndex !== hoveredRowNode.current.rowIndex &&
				dragDirection.current === onDirection
			);
		},
		[isValidDropTarget, getNewPath],
	);

	return {
		previousHoveredRowNode,
		hoveredRowNode,
		draggedNode,
		dragDirection,
		getShouldShowDropTarget,
	};
}

export function useCellEditor(ref, cellValue, isPopover = true) {
	const [showAsPopover] = useState(isPopover);

	useImperativeHandle(
		ref,
		() => ({
			getValue() {
				return cellValue;
			},
			isPopup() {
				return showAsPopover;
			},
		}),
		[cellValue, showAsPopover],
	);
}
