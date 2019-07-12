These examples use `ag-grid-react` with the Faithlife theme applied.

### Simple Table

The simplest use of the table. Each column is sortable and resizable. Leave `maxRows` blank for an infinite scroll table.

```react
showSource: true
---
<div>
	<SimpleTable data={censusData} maxRows={10} onRowClick={row => {alert(row[0].NAME)}}>
		<TableHeading displayName="Name" fieldName="NAME" defaultSort={TableHeading.sortOptions.ascending} />
		<TableHeading displayName="Population" fieldName="CENSUS2010POP" isRightAligned />
		<TableHeading displayName="Net Population Change" fieldName="NPOPCHG2010" isRightAligned />
		<TableHeading displayName="Births" fieldName="BIRTHS2010" isRightAligned width={100} />
		<TableHeading displayName="Deaths" fieldName="DEATHS2010" isRightAligned width={100} isSortable={false} />
	</SimpleTable>
</div>
```

### Paginated Table

Simple table with pagination.

```react
showSource: true
---
<div>
	<PaginatedTable data={censusData} maxRowsPerPage={10}>
		<TableHeading displayName="Name" fieldName="NAME" defaultSort={TableHeading.sortOptions.ascending} />
		<TableHeading displayName="Population" fieldName="CENSUS2010POP" />
		<TableHeading displayName="Net Population Change" fieldName="NPOPCHG2010" />
		<TableHeading displayName="Births" fieldName="BIRTHS2010" />
		<TableHeading displayName="Deaths" fieldName="DEATHS2010" />
	</PaginatedTable>
</div>
```

### Simple Aggregations

```react
showSource: true
---
<div>
	<SimpleTable data={censusData} maxRows={10}>
		<TableHeading displayName="Area Description" fieldName="LSAD" groupByColumn width={200} />
		<TableHeading displayName="Name" fieldName="NAME" defaultSort={TableHeading.sortOptions.ascending} />
		<TableHeading displayName="Population" fieldName="CENSUS2010POP" />
		<TableHeading displayName="Net Population Change" fieldName="NPOPCHG2010" />
	</SimpleTable>
</div>
```

### Example data

```code
land: json
---
[
	{
		"NAME": "Abilene, TX",
		"LSAD": "Metropolitan Statistical Area",
		"CENSUS2010POP": 165252,
		"NPOPCHG2010": 337,
		"BIRTHS2010": 540,
		"DEATHS2010": 406
	}
]
```
