export const variations = {
	simpleTable: {
		title: `
### Simple Table
The simplest use of the table. Each column is sortable and resizable. Leave \`maxRows\` blank for an infinite scroll table.`,
		source: `
\`\`\`jsx
	<div> 
		<SimpleGrid data={censusData} maxRows={10} onRowClick={row => {alert(row.value)}}>
			<GridColumn displayName="Name" fieldName="value" defaultSort={GridColumn.sortOptions.ascending} />
			<GridColumn displayName="Population" fieldName="population" isRightAligned />
			<GridColumn displayName="Net Population Change" fieldName="populationChange" isRightAligned />
			<GridColumn displayName="Births" fieldName="births" isRightAligned width={100} isLargeViewportOnly />
			<GridColumn displayName="Deaths" fieldName="deaths" isRightAligned width={100} isSortable={false} isLargeViewportOnly/>
		</SimpleGrid>
	</div>
\`\`\``,
	},
	paginatedTable: {
		title: `
### Paginated Table
Simple table with pagination.`,
		source: `
\`\`\`jsx
	<div>
		<PaginatedGrid data={censusData} maxRows={10}>
			<GridColumn displayName="Name" fieldName="value" defaultSort={GridColumn.sortOptions.ascending} />
			<GridColumn displayName="Population" fieldName="population" />
			<GridColumn displayName="Net Population Change" fieldName="populationChange" />
			<GridColumn displayName="Births" fieldName="births" />
			<GridColumn displayName="Deaths" fieldName="deaths" />
		</PaginatedGrid>
	</div>
\`\`\`

### Example data for Simple and Paginated Table\

\`\`\`json
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
\`\`\``,
	},
	treeTable: {
		title: `
### Tree Table
A table to display tree data. See Simple Examples to see how to enable drag and drop re-ordering.`,
		source: `
\`\`\`jsx
	<div>
		<TreeGrid
			data={censusDataFolders}
			maxRows={10}
			autoGroupExpansion={TreeGrid.expandedRowsOptions.topLevel}
		>
			<TreeGrid.GroupColumn displayName="Name" width={500} />
			<GridColumn displayName="Population" fieldName="population" />
			<GridColumn displayName="Net Population Change" fieldName="populationChange" />
		</TreeGrid>
	</div>
\`\`\`

### Example data for Tree Grid

\`\`\`json
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
\`\`\``,
	},
};

export const examples = {
	rowId: {
		title: `
### Row ID
All data must include an \`id\` property or \`handleGetRowId\` must be provided`,
		source: `
\`\`\`jsx
	<div>
		<Button primary medium onClick={() => setState({ data: state.data.slice(50)})}>Update Data</Button>
		<SimpleGrid data={state.data} maxRows={10} handleGetRowId={data => data.value}>
			<GridColumn displayName="Name" fieldName="value" defaultSort={GridColumn.sortOptions.ascending} />
			<GridColumn displayName="Population" fieldName="population" isRightAligned />
			<GridColumn displayName="Net Population Change" fieldName="populationChange" isRightAligned />
			<GridColumn displayName="Births" fieldName="births" isRightAligned width={100} isLargeViewportOnly />
			<GridColumn displayName="Deaths" fieldName="deaths" isRightAligned width={100} isSortable={false} isLargeViewportOnly/>
		</SimpleGrid>
	</div>
\`\`\``,
	},
	interactableElements: {
		title: `
### Interactable Elements in the rows
The \`hasInteractableElement\` allows you to use interactable in rows without triggering a row click`,
		source: `
\`\`\`jsx
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
\`\`\``,
	},
	simpleAggregations: {
		title: '### Simple Aggregations',
		source: `
\`\`\`jsx
	<div>
		<SimpleGrid data={censusData} maxRows={10}>
			<SimpleGrid.GroupColumn displayName="Name" fieldName="value" />
			<GridColumn hide fieldName="areaDesc" groupByColumn width={200} />
			<GridColumn displayName="Population" fieldName="population" />
			<GridColumn displayName="Net Population Change" fieldName="populationChange" />
		</SimpleGrid>
	</div>
\`\`\``,
	},
	textFiltering: {
		title: '### Simple Text Filtering',
		source: `
\`\`\`jsx
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
\`\`\``,
	},
	advancedFiltering: {
		title: `
### Advanced Filtering
See https://www.ag-grid.com/javascript-grid-filter-provided-simple/#filterOptions for more \`type\` options`,
		source: `
\`\`\`jsx
	<div>
		<Button primary medium onClick={() => setState({ filter: { population: { type: 'greaterThan', filter: '200000' } } })}>Pop > 200,000</Button>
		<Button primary medium onClick={() => setState({ filter: { population: { type: 'lessThan', filter: '200000' } } })}>{'Pop < 200,000'}</Button>
		<Button primary medium onClick={() => setState({ filter: null })}>None</Button>
		{JSON.stringify(state.filter)}
		<SimpleGrid filters={state.filter} data={censusData} maxRows={10} onRowClick={row => {alert(row.value)}} filterText={state.filterText}>
			<GridColumn displayName="Name" fieldName="value" />
			<GridColumn displayName="Population" fieldName="population" isRightAligned filter={GridColumn.filterByOptions.number} />
			<GridColumn displayName="Net Population Change" fieldName="populationChange" isRightAligned />
			<GridColumn displayName="Births" fieldName="births" isRightAligned width={100} isLargeViewportOnly />
			<GridColumn displayName="Deaths" fieldName="deaths" isRightAligned width={100} isSortable={false} isLargeViewportOnly/>
		</SimpleGrid>
	</div>
\`\`\``,
	},
	customComponent: {
		title: `
### Custom Cell Component
Cell components can be any valid react component. The \`value\` prop will be what the value of the field would be normally.`,
		source: `
\`\`\`jsx
	<div>
		<SimpleGrid data={censusData} maxRows={10} onRowClick={row => {alert(row.value)}}>
			<GridColumn displayName="Name" fieldName="value" defaultSort={GridColumn.sortOptions.ascending} />
			<GridColumn displayName="Population" fieldName="population" isRightAligned />
			<GridColumn displayName="Net Population Change" fieldName="populationChange" cellComponent={PopulationChange} isRightAligned />
			<GridColumn displayName="Births" fieldName="births" isRightAligned width={100} isLargeViewportOnly />
			<GridColumn displayName="Deaths" fieldName="deaths" isRightAligned width={100} isSortable={false} isLargeViewportOnly/>
		</SimpleGrid>
	</div>
\`\`\``,
	},
	dragAndDrop: {
		title: `
### Drag and Drop
This example uses the TreeGrid, but SimpleGrid supports it as well.`,
		source: `
\`\`\`jsx
	<div>
		<TreeGrid
			data={state.data}
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
\`\`\``,
	},
	checkbox: {
		title: `
### Checkbox Selection
Also supported by Paginated and TreeGrid.
Ref handles available when using checkboxes are \`selectAllRows\`, \`selectFilteredRows\`, \`deselectAllRows\`, and \`deselectFilteredRows\`.`,
		source: `
\`\`\`jsx
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
\`\`\``,
	},
	editableFields: {
		title: `
### Editable Fields
Also supported by Paginated and TreeGrid.`,
		source: `
\`\`\`jsx
	<div>
		<SimpleGrid
			data={censusData}
			maxRows={10}
			onRowDataChange={newData => console.log(newData)}
		>
			<GridColumn displayName="Name" fieldName="value" defaultSort={GridColumn.sortOptions.ascending} />
			<GridColumn displayName="Population" fieldName="population" isEditable />
			<GridColumn displayName="Net Population Change" fieldName="populationChange" isEditable editorComponent={IncrementButton} />
			<GridColumn displayName="Births" fieldName="births" width={100} isLargeViewportOnly />
			<GridColumn displayName="Deaths" fieldName="deaths" width={100} isSortable={false} isLargeViewportOnly/>
		</SimpleGrid>
	</div>
\`\`\`

\`\`\`jsx
	import { useCellEditor } from '@faithlife/equipment-grid';

	const IncrementButton = React.forwardRef(({ value }, ref) => {
		const [count, setCount] = useState(value);
		useCellEditor(ref, count, true);

		return (
			<Button
				variant="primaryOutline"
				size="medium"
				onClick={() => setCount(c => c + 1)}
			>{\`\${count} +\`}</Button>
		);
	});
\`\`\``,
	},
};
