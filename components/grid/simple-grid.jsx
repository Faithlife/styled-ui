import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useGridState, AggregationGroupColumn, getAggregationColumn } from './grid-helpers';
import { BaseGrid } from './base-grid';

export function SimpleGrid(props) {
	// First separate out the props that are this grid component specific
	const {
		children,
		autoGroupExpansion,
		groupSelectsChildren,
		groupSelectsFilteredChildren,
		...baseGridProps
	} = props;

	const { gridApi, setGridApi, columnApi, setColumnApi } = useGridState();

	const { groupComponent, groupColumnSettings, rowClickSelects } = getAggregationColumn({
		children,
		getShouldShowDropTarget() {
			return false;
		},
	});

	const gridOptions = useMemo(
		() => ({
			autoGroupColumnDef: groupColumnSettings,
			groupDefaultExpanded: autoGroupExpansion || SimpleGrid.expandedRowsOptions.none,
			groupSelectsChildren: groupSelectsChildren,
			groupSelectsFiltered: groupSelectsFilteredChildren,
			...(!rowClickSelects && { suppressRowClickSelection: true }),
		}),
		[
			groupColumnSettings,
			autoGroupExpansion,
			groupSelectsChildren,
			groupSelectsFilteredChildren,
			rowClickSelects,
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
		>
			{children}
		</BaseGrid>
	);
}

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
};
