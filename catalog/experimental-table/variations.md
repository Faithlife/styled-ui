## Experimental Table

```react
showSource: true
state: { }
---
<TableDemo>
<ExperimentalTable
	headings={[ { heading: 'UserId', }, { heading: 'name' } ]}
	data={[
		{ key: 1, rowData: [ {content: '1'}, {content: 'Bob'} ] },
		{ key: 2, rowData: [ {content: '2'}, {content: 'Jim'} ] },
		{ key: 3, rowData: [ {content: '3'}, {content: 'Eli'} ] }
	]}
/>
</TableDemo>
```

### Clickable Rows

```react
showSource: true
state: { }
---
<TableDemo>
<ExperimentalTable
	headings={[ { heading: 'UserId', }, { heading: 'name' } ]}
	data={[
		{ key: 1, rowData: [ {content: '1'}, {content: 'Bob'} ], onClickRow: () => { alert('Bob'); } },
		{ key: 2, rowData: [ {content: '2'}, {content: 'Jim'} ], onClickRow: () => { alert('Jim'); } },
		{ key: 3, rowData: [ {content: '3'}, {content: 'Eli'} ], onClickRow: () => { alert('Eli'); } }
	]}
/>
</TableDemo>
```

### Sortable Columns

```react
showSource: true
state: {
	sortOrder: 'ASC',
	sortField: 'UserId',
	tableHeadings: [
		{
			heading: 'UserId',
		},
		{ heading: 'Name' },
	],
	tableData: [
		{
			key: 1,
			rowData: [{ content: '1' }, { content: 'Bob' }],
		},
		{
			key: 2,
			rowData: [{ content: '2' }, { content: 'Jim' }],
		},
		{
			key: 3,
			rowData: [{ content: '3' }, { content: 'Eli' }],
		},
	],
}
---
<TableDemo>
	<ExperimentalTable
		headings={state.tableHeadings.map(x => ({
			heading: x.heading,
			sortOrder: state.sortOrder,
			onClick: state.sortField === x.heading ?
			() => setState(prevState => ({ sortOrder: prevState.sortOrder === ExperimentalTable.sortOrders.ASCENDING
					? ExperimentalTable.sortOrders.DESCENDING
					: ExperimentalTable.sortOrders.ASCENDING,
			}))
			: null }))}
		data={state.tableData.sort((a,b) => { return state.sortOrder === ExperimentalTable.sortOrders.ASCENDING ? a.key - b.key : b.key-a.key; })}
	/>
</TableDemo>
```

### Custom data cell styles

```react
showSource: true
state: { }
---
<TableDemo>
<ExperimentalTable
	headings={[ { heading: 'UserId', }, { heading: 'name' } ]}
	data={[
		{ key: 1, rowData: [ {content: '1'}, {content: 'Bob', style: { color: 'red' }} ], onClickRow: () => { alert('Bob'); } },
		{ key: 2, rowData: [ {content: '2'}, {content: 'Jim', style: { color: 'blue' }} ], onClickRow: () => { alert('Jim'); } },
		{ key: 3, rowData: [ {content: '3'}, {content: 'Eli', style: { color: 'green' }} ], onClickRow: () => { alert('Eli'); } }
	]}
/>
</TableDemo>
```
