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
---
<div>
	<TreeGrid data={censusDataFolders} maxRows={15} shouldAutoExpandGroups>
		<GridColumn displayName="Name" groupByColumn />
		<GridColumn displayName="Population" fieldName="population" />
		<GridColumn displayName="Net Population Change" fieldName="populationChange" />
		<GridColumn displayName="Births" fieldName="births" />
		<GridColumn displayName="Deaths" fieldName="deaths" />
	</TreeGrid>
</div>
```

### Example data for Tree Grid

```code
land: json
---
[
	enableDragDrop shouldExpandGroups
	{
		"value": "Metropolitan Statistical Area",
		children: [
			{
				"value": "Pop more than 100k",
				children: [
					{
						"value": "Abilene, TX",
						"population": 165252,
						"populationChange": 337,
						"births": 540,
						"deaths": 406,
						"path": ["Metropolitan Statistical Area", "Pop more than 100k", "Abilene, TX"]
					},
					{
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
