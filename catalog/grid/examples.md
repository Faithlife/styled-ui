Usage examples

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

### Simple Text Filtering

```react
showSource: true
state: { filterText: 'WA' }
---
<div>
	<Input placeholder="Search" value={state.filterText} onChange={(e => setState({ filterText: e.target.value }))} />
	<SimpleTable data={censusData} maxRows={10} onRowClick={row => {alert(row[0].NAME)}} filterText={state.filterText}>
		<TableHeading displayName="Name" fieldName="NAME" defaultSort={TableHeading.sortOptions.ascending} />
		<TableHeading displayName="Population" fieldName="CENSUS2010POP" isRightAligned />
		<TableHeading displayName="Net Population Change" fieldName="NPOPCHG2010" isRightAligned />
		<TableHeading displayName="Births" fieldName="BIRTHS2010" isRightAligned width={100} isLargeViewportOnly />
		<TableHeading displayName="Deaths" fieldName="DEATHS2010" isRightAligned width={100} isSortable={false} isLargeViewportOnly/>
	</SimpleTable>
</div>
```

### Custom Cell Component

Cell components can be any valid react component. The `value` prop will be what the value of the field would be normally.

```react
showSource: true
---
<div>
	<SimpleTable data={censusData} maxRows={10} onRowClick={row => {alert(row[0].NAME)}}>
		<TableHeading displayName="Name" fieldName="NAME" defaultSort={TableHeading.sortOptions.ascending} />
		<TableHeading displayName="Population" fieldName="CENSUS2010POP" isRightAligned />
		<TableHeading displayName="Net Population Change" fieldName="NPOPCHG2010" cellComponent={PopulationChange} isRightAligned />
		<TableHeading displayName="Births" fieldName="BIRTHS2010" isRightAligned width={100} isLargeViewportOnly />
		<TableHeading displayName="Deaths" fieldName="DEATHS2010" isRightAligned width={100} isSortable={false} isLargeViewportOnly/>
	</SimpleTable>
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
