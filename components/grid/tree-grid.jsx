import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
	useGridState,
	AggregationGroupColumn,
	getAggregationColumn,
	dragDirections,
	dragEventTypes,
	useGridDragDrop,
	useGridHandles,
} from './grid-helpers';
import { BaseGrid } from './base-grid';

export const TreeGrid = React.forwardRef((props, ref) => {
	// First separate out the props that are this grid component specific
	const {
		children,
		enableDragDrop,
		data,
		autoGroupExpansion,
		onDataChange,
		isValidDropTarget,
		isDraggableRow,
		...baseGridProps
	} = props;

	const { gridApi, setGridApi, columnApi, setColumnApi } = useGridState();

	useGridHandles(gridApi, ref);

	const {
		previousHoveredRowNode,
		hoveredRowNode,
		draggedNode,
		dragDirection,
		getShouldShowDropTarget,
	} = useGridDragDrop(isValidDropTarget, getNewPath);

	const { heading, groupComponent, groupColumnSettings } = getAggregationColumn({
		children,
		getShouldShowDropTarget,
		isDraggableRow,
		enableDragDrop,
	});

	useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			if (!heading && !(enableDragDrop || isDraggableRow)) {
				console.warn(
					'You are using a tree grid, but are not including a `<TreeGrid.GroupColumn> child',
				);
			}
			if ((enableDragDrop || isDraggableRow) && !onDataChange) {
				console.warn(
					'You are using dragdrop for the tree grid, but did not supply a onDataChange function',
				);
			}
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (gridApi) {
			gridApi.setSuppressRowDrag(!(enableDragDrop || isDraggableRow));
		}
	}, [gridApi, enableDragDrop, isDraggableRow]);

	const rows = useMemo(() => getRowsFromTreeShape([], '', data), [data]);

	const handleRowDrag = useCallback(
		event => {
			switch (event.type) {
				case dragEventTypes.drag: {
					hoveredRowNode.current = event.overNode;
					draggedNode.current = event.node;
					dragDirection.current = event.vDirection;

					if (draggedNode.current.expanded) {
						draggedNode.current.setExpanded(false);
					}

					break;
				}
				case dragEventTypes.drop: {
					hoveredRowNode.current = null;
					draggedNode.current = event.node;
					const newParentNode = event.overNode;

					const newPath = getNewPath(newParentNode, dragDirection.current);
					if (
						draggedNode.current &&
						draggedNode.current.rowIndex !== newParentNode.rowIndex &&
						(!isValidDropTarget || isValidDropTarget(draggedNode.current.data, newPath))
					) {
						const cleanTree = getTreeWithoutId(draggedNode.current.id, data);
						const newData = insertDataIntoTree(
							draggedNode.current.data,
							newParentNode.data.id,
							dragDirection.current,
							cleanTree,
						);

						onDataChange(newData, draggedNode.current.id, draggedNode.current.data);
					}

					break;
				}
				case dragEventTypes.leave: {
					hoveredRowNode.current = null;

					break;
				}
			}

			if (gridApi) {
				const rowNodes = [];
				if (hoveredRowNode.current) {
					rowNodes.push(hoveredRowNode.current);
				}
				if (previousHoveredRowNode.current) {
					rowNodes.push(previousHoveredRowNode.current);
				}

				gridApi.refreshCells({ rowNodes });
				previousHoveredRowNode.current = hoveredRowNode.current;
			}
		},
		[gridApi, onDataChange, isValidDropTarget, data], // eslint-disable-line react-hooks/exhaustive-deps
	);

	const gridOptions = useMemo(
		() => ({
			treeData: true,
			getDataPath,
			onRowDragMove: handleRowDrag,
			onRowDragLeave: handleRowDrag,
			onRowDragEnd: handleRowDrag,
			groupDefaultExpanded: autoGroupExpansion || TreeGrid.expandedRowsOptions.none,
			autoGroupColumnDef: groupColumnSettings,
		}),
		[handleRowDrag, autoGroupExpansion, groupColumnSettings],
	);

	return (
		<BaseGrid
			{...baseGridProps}
			gridApi={gridApi}
			setGridApi={setGridApi}
			columnApi={columnApi}
			setColumnApi={setColumnApi}
			gridOptions={gridOptions}
			shouldShowDragHandles
			data={rows}
			additionalColumnOptions={{
				cellClassRules: {
					'ag-faithlife-drop-target-row_below': getShouldShowDropTarget(dragDirections.down),
					'ag-faithlife-drop-target-row_above': getShouldShowDropTarget(dragDirections.up),
				},
			}}
			additionalCellComponents={groupComponent}
		>
			{children}
		</BaseGrid>
	);
});

TreeGrid.rowSelectionOptions = BaseGrid.rowSelectionOptions;

TreeGrid.rowTypes = {
	folder: 'folder',
	item: 'item',
};

TreeGrid.expandedRowsOptions = BaseGrid.expandedRowsOptions;

TreeGrid.GroupColumn = AggregationGroupColumn;

TreeGrid.propTypes = {
	...BaseGrid.propTypes,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			value: PropTypes.string.isRequired,
			children: PropTypes.array,
		}),
	),
	/** Use one of TreeGrid.expandedRowsOptions */
	autoGroupExpansion: PropTypes.oneOf(Object.values(TreeGrid.expandedRowsOptions)),
	/** Called after a drag-drop with the updated child tree */
	onDataChange: PropTypes.func,
	/** Is the current drop target a valid parent called with the row data and the new path */
	isValidDropTarget: PropTypes.func,
	/** Optional callback called for each row to see if it should be draggable. Passes (isGroup: boolean, rowData: object) */
	isDraggableRow: PropTypes.func,
	enableDragDrop: PropTypes.bool,
};

function getRowsFromTreeShape(pathTo, parentId, tree) {
	const rows = [];
	let idCounter = 0;
	for (const item of tree) {
		const id = parentId ? `${parentId}.${idCounter++}` : `${idCounter++}`;
		const path = pathTo.concat(item.value);

		if (item.children && item.children.length) {
			rows.push({ id, ...item, treeNodeType: TreeGrid.rowTypes.folder, path });
			rows.push(...getRowsFromTreeShape(path, id, item.children));
		} else {
			rows.push({ id, ...item, treeNodeType: TreeGrid.rowTypes.item, path });
		}
	}

	return rows;
}

// depth first for now
function getTreeWithoutId(id, tree) {
	const filteredTree = tree.filter(item => item.id !== id);
	if (filteredTree.length !== tree.length) {
		return filteredTree;
	}

	return filteredTree.map(item =>
		!item.children ? item : { ...item, children: getTreeWithoutId(id, item.children) },
	);
}

function insertDataIntoTree(data, parentId, direction, tree) {
	const newTree = [...tree];
	const parentIndex = newTree.findIndex(item => item.id === parentId);
	if (parentIndex !== -1) {
		if (direction === dragDirections.up && parentIndex === 0) {
			return [data, ...tree];
		}
		newTree.splice(direction === dragDirections.up ? parentIndex : parentIndex + 1, 0, data);

		return newTree;
	}

	return newTree.map(item =>
		!item.children
			? item
			: { ...item, children: insertDataIntoTree(data, parentId, direction, item.children) },
	);
}

function getNewPath(parentNode, direction) {
	const isParentFolder = parentNode.data.treeNodeType === TreeGrid.rowTypes.folder;
	if (isParentFolder && parentNode.expanded && direction === dragDirections.down) {
		return [...parentNode.data.path];
	} else {
		return parentNode.data.path.slice(0, -1);
	}
}

function getDataPath(data) {
	return data.path;
}
