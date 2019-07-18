import { useState } from 'react';

export function useTableState() {
	const [gridApi, setGridApi] = useState(null);
	const [columnApi, setColumnApi] = useState(null);

	return { gridApi, setGridApi, columnApi, setColumnApi };
}
