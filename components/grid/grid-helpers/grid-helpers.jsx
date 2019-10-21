import { useState } from 'react';

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
