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
		<GridColumn displayName="Area Description" fieldName="areaDesc" groupByColumn width={200} />
		<GridColumn displayName="Name" fieldName="value" defaultSort={GridColumn.sortOptions.ascending} />
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
	<SimpleGrid data={censusData} maxRows={10} onRowClick={row => {alert(row[0].NAME)}} filterText={state.filterText}>
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
	<SimpleGrid data={censusData} maxRows={10} onRowClick={row => {alert(row[0].NAME)}}>
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
