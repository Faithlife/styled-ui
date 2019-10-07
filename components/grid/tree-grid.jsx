import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useGridState } from './grid-helpers';
import { BaseGrid } from './base-grid';
import { TreeGroupColumn } from './tree-grid-group-column';

const treeGroupColumnComponent = 'treeGroupColumn';

const dragDirections = {
	up: 'up',
	down: 'down',
};

const dragEventTypes = {
	drag: 'rowDragMove',
	drop: 'rowDragEnd',
	leave: 'rowDragLeave',
};

export function TreeGrid(props) {
	// First separate out the props that are this grid component specific
	const {
		children,
		enableDragDrop,
		data,
		autoGroupExpansion,
		onDataChange,
		isValidDropTarget,
		...baseGridProps
	} = props;

	const { gridApi, setGridApi, columnApi, setColumnApi } = useGridState();

	// For styling the drop target rows
	const previousHoveredRowNode = useRef();
	const hoveredRowNode = useRef();
	const draggedNode = useRef();
	const dragDirection = useRef();

	const heading = React.Children.toArray(children).find(child => child && child.type.isTreeGroup);
	useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			if (!heading && !enableDragDrop) {
				console.warn(
					'You are using a tree grid, but are not including a `<TreeGrid.GroupColumn> child',
				);
			}
			if (enableDragDrop && !onDataChange) {
				console.warn(
					'You are using dragdrop for the tree grid, but did not supply a onDataChange function',
				);
			}
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getShouldShowDropTarget = useCallback(
		onDirection => ({ rowIndex }) => {
			if (
				isValidDropTarget &&
				!isValidDropTarget(
					draggedNode.current.node.data,
					getNewPath(hoveredRowNode.current.node, dragDirection.current),
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
		[isValidDropTarget],
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
			...groupProps
		} = heading.props;

		groupComponent = cellComponent ? { [treeGroupColumnComponent]: cellComponent } : {};
		groupColumnSettings = {
			rowDrag: enableDragDrop,
			headerName: heading.props.displayName,
			sortable: isSortable,
			sort: defaultSort,
			resizable: isResizable,
			cellRendererParams: {
				suppressCount: hideChildrenCount,
				innerRenderer: cellComponent ? treeGroupColumnComponent : '',
			},
			cellClass: 'ag-faithlife-cell',
			cellClassRules: {
				'ag-faithlife-drop-target-row_below': getShouldShowDropTarget(dragDirections.down),
				'ag-faithlife-drop-target-row_above': getShouldShowDropTarget(dragDirections.up),
			},
			headerClass: enableDragDrop
				? 'ag-faithlife-tree-group-header-with-drag'
				: 'ag-faithlife-tree-group-header',
			...groupProps,
		};
	}

	useEffect(() => {
		if (gridApi) {
			gridApi.setSuppressRowDrag(!enableDragDrop);
		}
	}, [gridApi, enableDragDrop]);

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
						(!isValidDropTarget || isValidDropTarget(draggedNode.data, newPath))
					) {
						const cleanTree = getTreeWithoutId(draggedNode.current.id, data);
						const newData = insertDataIntoTree(
							draggedNode.current.data,
							newParentNode.data.id,
							dragDirection.current,
							cleanTree,
						);

						onDataChange(newData);
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
		[gridApi, onDataChange, isValidDropTarget, data],
	);

	const gridOptions = useMemo(
		() => ({
			treeData: true,
			animateRows: true,
			getDataPath,
			onRowDragMove: handleRowDrag,
			onRowDragLeave: handleRowDrag,
			onRowDragEnd: handleRowDrag,
			groupDefaultExpanded: autoGroupExpansion || TreeGrid.expandedRowsOptions.none,
			autoGroupColumnDef: groupColumnSettings,
			groupUseEntireRow: false,
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
}

TreeGrid.rowSelectionOptions = BaseGrid.rowSelectionOptions;

TreeGrid.rowTypes = {
	folder: 'folder',
	item: 'item',
};

TreeGrid.expandedRowsOptions = {
	all: -1,
	none: 0,
	topLevel: 1,
};

TreeGrid.GroupColumn = TreeGroupColumn;

TreeGrid.propTypes = {
	...BaseGrid.propTypes,
	currentPageNumber: PropTypes.number,
	onPageNumberChange: PropTypes.func,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			value: PropTypes.string.isRequired,
			children: PropTypes.array,
		}),
	),
	autoGroupExpansion: PropTypes.oneOf(Object.values(TreeGrid.expandedRowsOptions)),
	/** Called after a drag-drop */
	onDataChange: PropTypes.func,
	/** Is the current drop target a valid parent calls with the row data and the new path */
	isValidDropTarget: PropTypes.func,
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
