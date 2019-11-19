import React, { useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
	useGridState,
	AggregationGroupColumn,
	getAggregationColumn,
	useGridDragDrop,
	dragDirections,
	dragEventTypes,
	useGridHandles,
} from './grid-helpers';
import { BaseGrid } from './base-grid';

export const SimpleGrid = React.forwardRef((props, ref) => {
	// First separate out the props that are this grid component specific
	const {
		children,
		autoGroupExpansion,
		groupSelectsChildren,
		groupSelectsFilteredChildren,
		isValidDropTarget,
		enableDragDrop,
		isDraggableRow,
		onDataChange,
		data,
		...baseGridProps
	} = props;

	const { gridApi, setGridApi, columnApi, setColumnApi } = useGridState();

	useGridHandles(gridApi, ref);

	useEffect(() => {
		if (gridApi) {
			gridApi.setSuppressRowDrag(!(enableDragDrop || isDraggableRow));
		}
	}, [gridApi, enableDragDrop, isDraggableRow]);

	const {
		previousHoveredRowNode,
		hoveredRowNode,
		draggedNode,
		dragDirection,
		getShouldShowDropTarget,
	} = useGridDragDrop(isValidDropTarget, getNewPath);

	const { heading, groupComponent, groupColumnSettings, rowClickSelects } = getAggregationColumn({
		children,
		getShouldShowDropTarget,
		enableDragDrop,
		isDraggableRow,
	});

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
						(!isValidDropTarget ||
							isValidDropTarget(
								!draggedNode.current.group
									? draggedNode.current.data
									: {
											isGroup: true,
											groupName: draggedNode.current.groupData['ag-Grid-AutoColumn'],
									  },
								newPath,
							))
					) {
						const newData = updateRowLocation(
							data,
							newParentNode,
							draggedNode.current,
							dragDirection.current,
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
			autoGroupColumnDef: groupColumnSettings,
			groupDefaultExpanded: autoGroupExpansion || SimpleGrid.expandedRowsOptions.none,
			groupSelectsChildren: groupSelectsChildren,
			groupSelectsFiltered: groupSelectsFilteredChildren,
			onRowDragMove: handleRowDrag,
			onRowDragLeave: handleRowDrag,
			onRowDragEnd: handleRowDrag,
			// HACK ag-grid will currently not respect the new order of dragged rows with deltaRowMode
			deltaRowDataMode: !(enableDragDrop || isDraggableRow),
			rememberGroupStateWhenNewData: true,
			...(!rowClickSelects && { suppressRowClickSelection: true }),
		}),
		[
			groupColumnSettings,
			autoGroupExpansion,
			groupSelectsChildren,
			groupSelectsFilteredChildren,
			rowClickSelects,
			handleRowDrag,
			enableDragDrop,
			isDraggableRow,
		],
	);

	return (
		<BaseGrid
			{...baseGridProps}
			gridApi={gridApi}
			setGridApi={setGridApi}
			columnApi={columnApi}
			setColumnApi={setColumnApi}
			gridOptions={gridOptions}
			additionalCellComponents={groupComponent}
			data={data}
			showDragHandle={(enableDragDrop || isDraggableRow) && !heading}
			additionalColumnOptions={{
				cellClassRules: {
					'ag-faithlife-drop-target-row_below': getShouldShowDropTarget(dragDirections.down),
					'ag-faithlife-drop-target-row_above': getShouldShowDropTarget(dragDirections.up),
				},
			}}
		>
			{children}
		</BaseGrid>
	);
});

SimpleGrid.rowSelectionOptions = BaseGrid.rowSelectionOptions;

SimpleGrid.expandedRowsOptions = BaseGrid.expandedRowsOptions;

SimpleGrid.GroupColumn = AggregationGroupColumn;

SimpleGrid.defaultProps = {
	groupSelectsChildren: true,
};

SimpleGrid.propTypes = {
	...BaseGrid.props,
	/** Use one of SimpleGrid.expandedRowsOptions */
	autoGroupExpansion: PropTypes.oneOf(Object.values(SimpleGrid.expandedRowsOptions)),
	/** If you select a group it will select all its children */
	groupSelectsChildren: PropTypes.bool,
	/** Only works if groupSelectsChildren is true. Groups will only select children that are present after a filter is applied */
	groupSelectsFilteredChildren: PropTypes.bool,
	/** Is the current drop target a valid parent called with the row data and the new path */
	isValidDropTarget: PropTypes.func,
	/** Called after a drag-drop with the updated child tree */
	onDataChange: PropTypes.func,
	/** Optional callback called for each row to see if it should be draggable. Passes (isGroup: boolean, rowData: object) */
	isDraggableRow: PropTypes.func,
	enableDragDrop: PropTypes.bool,
};

function getNewPath(parentNode, direction) {
	if (parentNode.group) {
		if (!parentNode.expanded || direction === dragDirections.up) {
			return [];
		} else {
			return [parentNode.groupData['ag-Grid-AutoColumn']];
		}
	} else {
		return parentNode.parent.field ? [parentNode.data[parentNode.parent.field]] : [];
	}
}

function updateRowLocation(data, newParentNode, draggedNode, direction) {
	const parentIndex = newParentNode.group
		? data.findIndex(
				row => row[newParentNode.field] === newParentNode.groupData['ag-Grid-AutoColumn'],
		  )
		: data.findIndex(row => row.id === newParentNode.id);

	if (draggedNode.group) {
		const aggName = draggedNode.field;

		const newData = data.filter(
			row => row[aggName] !== draggedNode.groupData['ag-Grid-AutoColumn'],
		);

		if (parentIndex === 0 && direction === dragDirections.up) {
			return [...draggedNode.childrenAfterGroup.map(row => row.data), ...newData];
		}

		newData.splice(
			direction === dragDirections.up ? parentIndex : parentIndex + 1,
			0,
			...draggedNode.childrenAfterGroup.map(row => row.data),
		);

		return newData;
	}

	const aggName =
		draggedNode.parent.field ||
		(newParentNode.group ? newParentNode.field : newParentNode.parent.field);
	const newData = data.filter(row => row.id !== draggedNode.id);
	const newRowData = { ...draggedNode.data };

	if (newParentNode.group) {
		if (
			direction === dragDirections.up ||
			(direction === dragDirections.down && !newParentNode.expanded)
		) {
			delete newRowData[aggName];
		} else {
			newRowData[aggName] = newParentNode.groupData['ag-Grid-AutoColumn'];
		}
	} else {
		newRowData[aggName] = newParentNode.data[aggName];
	}

	if (parentIndex === 0 && direction === dragDirections.up) {
		return [newRowData, ...newData];
	}

	newData.splice(direction === dragDirections.up ? parentIndex : parentIndex + 1, 0, newRowData);

	return newData;
}
