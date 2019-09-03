import React from 'react';
import { useGridState } from './grid-helpers';
import { BaseGrid } from './base-grid';

export function SimpleGrid(props) {
	// First separate out the props that are this grid component specific
	const { children, ...baseGridProps } = props;

	const { gridApi, setGridApi, columnApi, setColumnApi } = useGridState();

	return (
		<BaseGrid
			{...baseGridProps}
			gridApi={gridApi}
			setGridApi={setGridApi}
			columnApi={columnApi}
			setColumnApi={setColumnApi}
		>
			{children}
		</BaseGrid>
	);
}

SimpleGrid.rowSelectionOptions = BaseGrid.rowSelectionOptions;

SimpleGrid.propTypes = {
	...BaseGrid.props,
};
