These examples use `ag-grid-react` with the Faithlife theme applied.

### Simple Table

The simplest use of the table. Each column is sortable and resizable. Leave `maxRows` blank for an infinite scroll table.

```react
showSource: true
---
<div>
	<SimpleGrid data={censusData} maxRows={10} onRowClick={row => {alert(row[0].NAME)}}>
		<GridColumn displayName="Name" fieldName="value" defaultSort={GridColumn.sortOptions.ascending} />
		<GridColumn displayName="Population" fieldName="population" isRightAligned />
		<GridColumn displayName="Net Population Change" fieldName="populationChange" isRightAligned />
		<GridColumn displayName="Births" fieldName="births" isRightAligned width={100} isLargeViewportOnly />
		<GridColumn displayName="Deaths" fieldName="deaths" isRightAligned width={100} isSortable={false} isLargeViewportOnly/>
	</SimpleGrid>
</div>
```

### Paginated Table

Simple table with pagination.

```react
showSource: true
---
<div>
	<PaginatedGrid data={censusData} maxRows={10}>
		<GridColumn displayName="Name" fieldName="value" defaultSort={GridColumn.sortOptions.ascending} />
		<GridColumn displayName="Population" fieldName="population" />
		<GridColumn displayName="Net Population Change" fieldName="populationChange" />
		<GridColumn displayName="Births" fieldName="births" />
		<GridColumn displayName="Deaths" fieldName="deaths" />
	</PaginatedGrid>
</div>
```

### Example data for Simple and Paginated Table

```code
land: json
---
[
	{
		"id": 0,
		"value": "Abilene, TX",
		"areaDesc": "Metropolitan Statistical Area",
		"population": 165252,
		"populationChange": 337,
		"births": 540,
		"deaths": 406
	}
]
```

### Tree Table

A table to display tree data as well as supporting drag-drop reordering.

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

### Example data for Tree Grid

```code
land: json
---
[
	{
		"id": 1,
		"value": "Metropolitan Statistical Area",
		children: [
			{
				"id": 2,
				"value": "Pop more than 100k",
				children: [
					{
						"id": 3,
						"value": "Abilene, TX",
						"population": 165252,
						"populationChange": 337,
						"births": 540,
						"deaths": 406,
						"path": ["Metropolitan Statistical Area", "Pop more than 100k", "Abilene, TX"]
					},
					{
						"id": 4,
						"value":"Bellingham, WA",
						"population":201140,
						"births":608,
						"deaths":356
					}
				]
			}
		]
	}
]
```
