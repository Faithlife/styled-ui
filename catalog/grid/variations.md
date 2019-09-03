These examples use `ag-grid-react` with the Faithlife theme applied.

### Simple Table

The simplest use of the table. Each column is sortable and resizable. Leave `maxRows` blank for an infinite scroll table.

```react
showSource: true
---
<div>
	<SimpleGrid data={censusData} maxRows={10} onRowClick={row => {alert(row[0].NAME)}}>
		<GridHeading displayName="Name" fieldName="NAME" defaultSort={GridHeading.sortOptions.ascending} />
		<GridHeading displayName="Population" fieldName="CENSUS2010POP" isRightAligned />
		<GridHeading displayName="Net Population Change" fieldName="NPOPCHG2010" isRightAligned />
		<GridHeading displayName="Births" fieldName="BIRTHS2010" isRightAligned width={100} isLargeViewportOnly />
		<GridHeading displayName="Deaths" fieldName="DEATHS2010" isRightAligned width={100} isSortable={false} isLargeViewportOnly/>
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
		<GridHeading displayName="Name" fieldName="NAME" defaultSort={GridHeading.sortOptions.ascending} />
		<GridHeading displayName="Population" fieldName="CENSUS2010POP" />
		<GridHeading displayName="Net Population Change" fieldName="NPOPCHG2010" />
		<GridHeading displayName="Births" fieldName="BIRTHS2010" />
		<GridHeading displayName="Deaths" fieldName="DEATHS2010" />
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
		"NAME": "Abilene, TX",
		"LSAD": "Metropolitan Statistical Area",
		"CENSUS2010POP": 165252,
		"NPOPCHG2010": 337,
		"BIRTHS2010": 540,
		"DEATHS2010": 406
	}
]
```

### Tree Table

A table to display tree data as well as supporting drag-drop reordering.

```react
showSource: true
---
<div>
	<TreeGrid data={[
	{
		"id": 0,
		"NAME": "Abilene, TX",
		"CENSUS2010POP": 165252,
		"NPOPCHG2010": 337,
		"BIRTHS2010": 540,
		"DEATHS2010": 406,
		"path": ["Metropolitan Statistical Area", "Pop more than 100k", "Abilene, TX"]
	}
]} minHeight={'550px'} enableDragDrop>
		<GridHeading displayName="Name" fieldName="NAME" minWidth={300} />
		<GridHeading displayName="Population" fieldName="CENSUS2010POP" />
		<GridHeading displayName="Net Population Change" fieldName="NPOPCHG2010" />
		<GridHeading displayName="Births" fieldName="BIRTHS2010" />
		<GridHeading displayName="Deaths" fieldName="DEATHS2010" />
	</TreeGrid>
</div>
```

### Example data for Tree Grid

```code
land: json
---
[
	{
		"id": 0,
		"NAME": "Abilene, TX",
		"CENSUS2010POP": 165252,
		"NPOPCHG2010": 337,
		"BIRTHS2010": 540,
		"DEATHS2010": 406,
		"path": ["Metropolitan Statistical Area", "Pop &gt; 100k", "Abilene, TX"]
	}
]
```
