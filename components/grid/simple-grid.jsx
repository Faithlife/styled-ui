import React, { useMemo } from 'react';
import { useGridState, AggregationGroupColumn, getAggregationColumn } from './grid-helpers';
import { BaseGrid } from './base-grid';

export function SimpleGrid(props) {
	// First separate out the props that are this grid component specific
	const { children, ...baseGridProps } = props;

	const { gridApi, setGridApi, columnApi, setColumnApi } = useGridState();

	const { groupComponent, groupColumnSettings } = getAggregationColumn({
		children,
		getShouldShowDropTarget() {
			return false;
		},
	});

	const gridOptions = useMemo(
		() => ({
			autoGroupColumnDef: groupColumnSettings,
		}),
		[groupColumnSettings],
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
		>
			{children}
		</BaseGrid>
	);
}

SimpleGrid.rowSelectionOptions = BaseGrid.rowSelectionOptions;

SimpleGrid.GroupColumn = AggregationGroupColumn;

SimpleGrid.propTypes = {
	...BaseGrid.props,
};
