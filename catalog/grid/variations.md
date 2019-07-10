These examples use `ag-grid-react` with the Faithlife theme applied. Some features require an enterprise license to be set.

### Simple

Member directory with sortable columns.

```react
showSource: true
---
<div>
	<SimpleTable data={censusData} maxRows={10}>
		<TableHeading displayName="Name" fieldName="NAME" defaultSort={TableHeading.sortOptions.ascending} />
		<TableHeading displayName="Area Description" fieldName="LSAD" />
		<TableHeading displayName="Population" fieldName="CENSUS2010POP" />
		<TableHeading displayName="Net Population Change" fieldName="NPOPCHG2010" />
		<TableHeading displayName="Births" fieldName="BIRTHS2010" />
		<TableHeading displayName="Deaths" fieldName="DEATHS2010" />
	</SimpleTable>
</div>
```

### Simple

Member directory with sortable columns.

```react
showSource: true
---
<div>
	<PaginatedTable data={censusData} maxRowsPerPage={10}>
		<TableHeading displayName="Name" fieldName="NAME" defaultSort={TableHeading.sortOptions.ascending} />
		<TableHeading displayName="Area Description" fieldName="LSAD" />
		<TableHeading displayName="Population" fieldName="CENSUS2010POP" />
		<TableHeading displayName="Net Population Change" fieldName="NPOPCHG2010" />
		<TableHeading displayName="Births" fieldName="BIRTHS2010" />
		<TableHeading displayName="Deaths" fieldName="DEATHS2010" />
	</PaginatedTable>
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
