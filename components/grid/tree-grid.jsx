import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useGridState } from './grid-helpers';
import { BaseGrid } from './base-grid';
import { TreeGroupColumn } from './tree-grid-group-column';

const treeGroupColumnComponent = 'treeGroupColumn';

export function TreeGrid(props) {
	// First separate out the props that are this grid component specific
	const { children, enableDragDrop, data, autoGroupExpansion, ...baseGridProps } = props;

	const { gridApi, setGridApi, columnApi, setColumnApi } = useGridState();

	const heading = React.Children.toArray(children).find(child => child && child.type.isTreeGroup);
	useEffect(() => {
		if (!heading && !enableDragDrop) {
			console.warn(
				'You are using a tree grid, but are not including a `<TreeGrid.GroupColumn> child',
			);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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

		console.log('cellComponent', cellComponent);
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
			...groupProps,
		};
	}

	useEffect(() => {
		if (gridApi) {
			gridApi.setSuppressRowDrag(!enableDragDrop);
		}
	}, [gridApi, enableDragDrop]);

	/**
	 *  getDataPath={this.state.getDataPath}
		getRowNodeId={this.state.getRowNodeId}
		autoGroupColumnDef={this.state.autoGroupColumnDef}
		onGridReady={this.onGridReady}
		onRowDragMove={this.onRowDragMove.bind(this)}
		onRowDragLeave={this.onRowDragLeave.bind(this)}
		onRowDragEnd={this.onRowDragEnd.bind(this)}
	 */

	const handleRowDrag = useCallback(event => {
		console.log(event);
	}, []);

	const treeData = useMemo(() => getRows([], '', data), [data]);

	console.log(groupColumnSettings, groupComponent);
	const gridOptions = useMemo(
		() => ({
			treeData: true,
			animateRows: true,
			getDataPath,
			onRowDragMove: handleRowDrag,
			onRowDragLeave: handleRowDrag,
			onRowDragEnd: handleRowDrag,
			groupDefaultExpanded: autoGroupExpansion || TreeGrid.expandedRowsOptions.none,
			additionalCellComponents: groupComponent,
			autoGroupColumnDef: groupColumnSettings,
		}),
		[handleRowDrag, autoGroupExpansion, groupColumnSettings, groupComponent],
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
			data={treeData}
			disableGroupUsesWholeRow
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
	// Why ag-grid?
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
			value: PropTypes.string.isRequired,
			children: PropTypes.array,
		}),
	),
	autoGroupExpansion: PropTypes.oneOf(Object.values(TreeGrid.expandedRowsOptions)),
};

function getRows(pathTo, parentId, tree) {
	const rows = [];
	let idCounter = 0;
	for (const item of tree) {
		const id = parentId ? `${parentId}.${idCounter++}` : `${idCounter++}`;
		const path = pathTo.concat(item.value);

		if (item.children && item.children.length) {
			rows.push({ id, ...item, treeNodeType: TreeGrid.rowTypes.folder, path });
			rows.push(...getRows(path, id, item.children));
		} else {
			rows.push({ id, ...item, treeNodeType: TreeGrid.rowTypes.item, path });
		}
	}

	return rows;
}

function getDataPath(data) {
	return data.path;
}

/*
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

export class GridExample extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			columnDefs: [
				{
					field: "dateModified",
					cellClassRules: {
						"hover-over": function(params) {
							return params.node === potentialParent;
						}
					}
				},
				{
					field: "size",
					valueFormatter: function(params) {
						return params.value ? params.value + " MB" : "";
					},
					cellClassRules: {
						"hover-over": function(params) {
							return params.node === potentialParent;
						}
					}
				}
			],
			rowData: [
				{
					id: 1,
					filePath: ["Documents"],
					type: "folder"
				},
				{
					id: 2,
					filePath: ["Documents", "txt"],
					type: "folder"
				},
				{
					id: 3,
					filePath: ["Documents", "txt", "notes.txt"],
					type: "file",
					dateModified: "May 21 2017 01:50:00 PM",
					size: 14.7
				},
				{
					id: 4,
					filePath: ["Documents", "pdf"],
					type: "folder"
				},
				{
					id: 5,
					filePath: ["Documents", "pdf", "book.pdf"],
					type: "file",
					dateModified: "May 20 2017 01:50:00 PM",
					size: 2.1
				},
				{
					id: 6,
					filePath: ["Documents", "pdf", "cv.pdf"],
					type: "file",
					dateModified: "May 20 2016 11:50:00 PM",
					size: 2.4
				},
				{
					id: 7,
					filePath: ["Documents", "xls"],
					type: "folder"
				},
				{
					id: 8,
					filePath: ["Documents", "xls", "accounts.xls"],
					type: "file",
					dateModified: "Aug 12 2016 10:50:00 AM",
					size: 4.3
				},
				{
					id: 9,
					filePath: ["Documents", "stuff"],
					type: "folder"
				},
				{
					id: 10,
					filePath: ["Documents", "stuff", "xyz.txt"],
					type: "file",
					dateModified: "Jan 17 2016 08:03:00 PM",
					size: 1.1
				},
				{
					id: 11,
					filePath: ["Music"],
					type: "folder"
				},
				{
					id: 12,
					filePath: ["Music", "mp3"],
					type: "folder"
				},
				{
					id: 13,
					filePath: ["Music", "mp3", "theme.mp3"],
					type: "file",
					dateModified: "Sep 11 2016 08:03:00 PM",
					size: 14.3
				},
				{
					id: 14,
					filePath: ["Misc"],
					type: "folder"
				},
				{
					id: 15,
					filePath: ["Misc", "temp.txt"],
					type: "file",
					dateModified: "Aug 12 2016 10:50:00 PM",
					size: 101
				}
			],
			defaultColDef: { resizable: true },
			components: { fileCellRenderer: getFileCellRenderer() },
			groupDefaultExpanded: -1,
			getDataPath: function(data) {
				return data.filePath;
			},
			getRowNodeId: function(data) {
				return data.id;
			},
			autoGroupColumnDef: {
				rowDrag: true,
				headerName: "Files",
				width: 250,
				cellRendererParams: {
					suppressCount: true,
					innerRenderer: "fileCellRenderer"
				},
				cellClassRules: {
					"hover-over": function(params) {
						return params.node === potentialParent;
					}
				}
			}
		};
	}

	onGridReady = params => {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
	};

	onRowDragMove(event) {
		setPotentialParentForNode(event.api, event.overNode);
	}
	onRowDragLeave(event) {
		setPotentialParentForNode(event.api, null);
	}
	onRowDragEnd(event) {
		if (!potentialParent) {
			return;
		}
		var movingData = event.node.data;
		var newParentPath = potentialParent.data ? potentialParent.data.filePath : [];
		var needToChangeParent = !arePathsEqual(newParentPath, movingData.filePath);
		var invalidMode = isSelectionParentOfTarget(event.node, potentialParent);
		if (invalidMode) {
			console.log("invalid move");
		}
		if (needToChangeParent && !invalidMode) {
			var updatedRows = [];
			moveToPath(newParentPath, event.node, updatedRows);
			this.gridApi.updateRowData({ update: updatedRows });
			this.gridApi.clearFocusedCell();
		}
		setPotentialParentForNode(event.api, null);
	}
	render() {
		return (
			<div style={{ width: "100%", height: "100%" }}>
				<div
					id="myGrid"
					style={{
						height: "100%",
						width: "100%"
					}}
					className="ag-theme-balham"
				>
					<AgGridReact
						columnDefs={this.state.columnDefs}
						rowData={this.state.rowData}
						defaultColDef={this.state.defaultColDef}
						components={this.state.components}
						treeData={true}
						animateRows={true}
						groupDefaultExpanded={this.state.groupDefaultExpanded}
						getDataPath={this.state.getDataPath}
						getRowNodeId={this.state.getRowNodeId}
						autoGroupColumnDef={this.state.autoGroupColumnDef}
						onGridReady={this.onGridReady}
						onRowDragMove={this.onRowDragMove.bind(this)}
						onRowDragLeave={this.onRowDragLeave.bind(this)}
						onRowDragEnd={this.onRowDragEnd.bind(this)}
					/>
				</div>
			</div>
		);
	}
}

var potentialParent = null;
function moveToPath(newParentPath, node, allUpdatedNodes) {
	var oldPath = node.data.filePath;
	var fileName = oldPath[oldPath.length - 1];
	var newChildPath = newParentPath.slice();
	newChildPath.push(fileName);
	node.data.filePath = newChildPath;
	allUpdatedNodes.push(node.data);
	if (node.childrenAfterGroup) {
		node.childrenAfterGroup.forEach(function(childNode) {
			moveToPath(newChildPath, childNode, allUpdatedNodes);
		});
	}
}
function isSelectionParentOfTarget(selectedNode, targetNode) {
	var children = selectedNode.childrenAfterGroup;
	for (var i = 0; i < children.length; i++) {
		if (targetNode && children[i].key === targetNode.key) return true;
		isSelectionParentOfTarget(children[i], targetNode);
	}
	return false;
}
function arePathsEqual(path1, path2) {
	if (path1.length !== path2.length) {
		return false;
	}
	var equal = true;
	path1.forEach(function(item, index) {
		if (path2[index] !== item) {
			equal = false;
		}
	});
	return equal;
}
function setPotentialParentForNode(api, overNode) {
	var newPotentialParent;
	if (overNode) {
		newPotentialParent = overNode.data.type === "folder" ? overNode : overNode.parent;
	} else {
		newPotentialParent = null;
	}
	var alreadySelected = potentialParent === newPotentialParent;
	if (alreadySelected) {
		return;
	}
	var rowsToRefresh = [];
	if (potentialParent) {
		rowsToRefresh.push(potentialParent);
	}
	if (newPotentialParent) {
		rowsToRefresh.push(newPotentialParent);
	}
	potentialParent = newPotentialParent;
	refreshRows(api, rowsToRefresh);
}
function refreshRows(api, rowsToRefresh) {
	var params = {
		rowNodes: rowsToRefresh,
		force: true
	};
	api.refreshCells(params);
}
function getFileCellRenderer() {
	function FileCellRenderer() {}
	FileCellRenderer.prototype.init = function(params) {
		var tempDiv = document.createElement("div");
		var value = params.value;
		var icon = getFileIcon(params.value);
		tempDiv.innerHTML = icon ? '<i class="' + icon + '"/>' + '<span class="filename">' + value + "</span>" : value;
		this.eGui = tempDiv.firstChild;
	};
	FileCellRenderer.prototype.getGui = function() {
		return this.eGui;
	};
	return FileCellRenderer;
}
function getFileIcon(filename) {
	return filename.endsWith(".mp3") || filename.endsWith(".wav")
		? "fa fa-file-audio-o"
		: filename.endsWith(".xls")
		? "fa fa-file-excel-o"
		: filename.endsWith(".txt")
		? "fa fa fa-file-o"
		: filename.endsWith(".pdf")
		? "fa fa-file-pdf-o"
		: "fa fa-folder";
}
*/
