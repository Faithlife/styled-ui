Usage examples

### Row ID

All data must include an `id` property or `handleGetRowId` must be provided

```react
showSource: true
state: { data: null }
---
<div>
	<Button primary medium onClick={() => setState({ data: (state.data && state.data.slice(50)) || censusData.slice(50) })}>Update Data</Button>
	<SimpleGrid data={state.data || censusData} maxRows={10} handleGetRowId={data => data.NAME}>
		<GridColumn displayName="Name" fieldName="value" defaultSort={GridColumn.sortOptions.ascending} />
		<GridColumn displayName="Population" fieldName="population" isRightAligned />
		<GridColumn displayName="Net Population Change" fieldName="populationChange" isRightAligned />
		<GridColumn displayName="Births" fieldName="births" isRightAligned width={100} isLargeViewportOnly />
		<GridColumn displayName="Deaths" fieldName="deaths" isRightAligned width={100} isSortable={false} isLargeViewportOnly/>
	</SimpleGrid>
</div>
```

### Interactable Elements in the rows

The `hasInteractableElement` allows you to use interactable in rows without triggering a row click

```react
showSource: true
---
<div>
	<SimpleGrid data={censusData} maxRows={10} onRowClick={() => alert('Click')}>
		<GridColumn displayName="Name" fieldName="value" defaultSort={GridColumn.sortOptions.ascending} />
		<GridColumn displayName="Population" fieldName="population" isRightAligned />
		<GridColumn displayName="Net Population Change" fieldName="populationChange" isRightAligned />
		<GridColumn
			hasInteractableElement
			displayName=""
			fieldName="edit"
			width={100}
			cellComponent={ ({data}) =>
				(<Button primary small onClick={() => console.log(data)}>
					Edit
				</Button>)
			}
			isLargeViewportOnly
		/>
	</SimpleGrid>
</div>
```

### Simple Aggregations

```react
showSource: true
---
<div>
	<SimpleGrid data={censusData} maxRows={10}>
		<SimpleGrid.GroupColumn displayName="Name" fieldName="value" />
		<GridColumn hide fieldName="areaDesc" groupByColumn width={200} />
		<GridColumn displayName="Population" fieldName="population" />
		<GridColumn displayName="Net Population Change" fieldName="populationChange" />
	</SimpleGrid>
</div>
```

### Simple Text Filtering

```react
showSource: true
state: { filterText: 'WA' }
---
<div>
	<Input placeholder="Search" value={state.filterText} onChange={(e => setState({ filterText: e.target.value }))} />
	<SimpleGrid data={censusData} maxRows={10} onRowClick={row => {alert(row.value)}} filterText={state.filterText}>
		<GridColumn displayName="Name" fieldName="value" defaultSort={GridColumn.sortOptions.ascending} />
		<GridColumn displayName="Population" fieldName="population" isRightAligned />
		<GridColumn displayName="Net Population Change" fieldName="populationChange" isRightAligned />
		<GridColumn displayName="Births" fieldName="births" isRightAligned width={100} isLargeViewportOnly />
		<GridColumn displayName="Deaths" fieldName="deaths" isRightAligned width={100} isSortable={false} isLargeViewportOnly/>
	</SimpleGrid>
</div>
```

### Custom Cell Component

Cell components can be any valid react component. The `value` prop will be what the value of the field would be normally.

```react
showSource: true
---
<div>
	<SimpleGrid data={censusData} maxRows={10} onRowClick={row => {alert(row.value)}}>
		<GridColumn displayName="Name" fieldName="value" defaultSort={GridColumn.sortOptions.ascending} />
		<GridColumn displayName="Population" fieldName="population" isRightAligned />
		<GridColumn displayName="Net Population Change" fieldName="populationChange" cellComponent={PopulationChange} isRightAligned />
		<GridColumn displayName="Births" fieldName="births" isRightAligned width={100} isLargeViewportOnly />
		<GridColumn displayName="Deaths" fieldName="deaths" isRightAligned width={100} isSortable={false} isLargeViewportOnly/>
	</SimpleGrid>
</div>
```

```code
lang: js
---
function PopulationChange({ value }) {
	return (
		<div style={{ color: value >= 0 ? 'green' : 'red' }}>
			{`${value >= 0 ? '+' : '-'} ${Math.abs(value)}`}
		</div>
	);
}
```

### Drag and Drop

This example uses the TreeGrid, but SimpleGrid supports it as well.

```react
showSource: true
state: { }
---
<div>
	<TreeGrid
		data={state.data || censusDataFolders}
		maxRows={10}
		autoGroupExpansion={TreeGrid.expandedRowsOptions.topLevel}
		onDataChange={data => setState({ data })}
		enableDragDrop
	>
		<TreeGrid.GroupColumn displayName="Name" width={500} />
		<GridColumn displayName="Population" fieldName="population" />
		<GridColumn displayName="Net Population Change" fieldName="populationChange" />
	</TreeGrid>
</div>
```

### Checkbox Selection

Also supported by Paginated and TreeGrid.

Ref handles available when using checkboxes are `selectAllRows`, `selectFilteredRows`, `deselectAllRows`, and `deselectFilteredRows`.

```react
showSource: true
state: { selected: false }
---
<div>
	<Button
		primary
		medium
		onClick={() => {
			!state.selected ?
				gridRef.current.selectAllRows() :
				gridRef.current.deselectAllRows();
			setState({ selected: !state.selected });
			}}
	>
		Select/ Deselect
	</Button>
	<SimpleGrid
		ref={gridRef}
		data={censusData}
		maxRows={10}
		onRowClick={row => {console.log(row)}}
		onRowSelect={rows => {console.log(rows)}}
		rowSelectionType={SimpleGrid.rowSelectionOptions.multi}
	>
		<GridColumn displayName="Name" fieldName="value" defaultSort={GridColumn.sortOptions.ascending} showCheckbox />
		<GridColumn displayName="Population" fieldName="population" isRightAligned />
		<GridColumn displayName="Net Population Change" fieldName="populationChange" isRightAligned />
		<GridColumn displayName="Births" fieldName="births" isRightAligned width={100} isLargeViewportOnly />
		<GridColumn displayName="Deaths" fieldName="deaths" isRightAligned width={100} isSortable={false} isLargeViewportOnly/>
	</SimpleGrid>
</div>
```
