import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Box, Heading, Input } from '@faithlife/styled-ui';
import { Button, SegmentedButtonGroup } from '@faithlife/styled-ui/v6';
import {
	SimpleGrid,
	PaginatedGrid,
	TreeGrid,
	GridColumn,
	useCellEditor,
} from '@faithlife/equipment-grid';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rawCensusData from './2010census.json';
import { variations, examples } from './markdown';

import '@faithlife/equipment-grid/dist/index.css'; // eslint-disable-line

const censusData = rawCensusData.map((item, index) => ({ ...item, id: index }));

const censusDataFolders = censusData.reduce((list, row, index) => {
	const subFolderName = row.population > 100000 ? 'Pop more than 100k' : 'Pop less than 100k';
	const folder = list.find(x => x.value === row.areaDesc);

	if (folder) {
		const subFolder = folder.children.find(x => x.value === subFolderName);
		if (subFolder) {
			subFolder.children.push({ id: `${index}`, ...row });
		} else {
			folder.children.push({
				id: `${row.areaDesc}:${subFolderName}`,
				value: subFolderName,
				children: [{ id: `${index}`, ...row }],
			});
		}
	} else {
		list.push({
			id: `${row.areaDesc}`,
			value: row.areaDesc,
			children: [
				{
					id: `${row.areaDesc}:${subFolderName}`,
					value: subFolderName,
					children: [{ id: `${index}`, ...row }],
				},
			],
		});
	}

	return list;
}, []);

const IncrementButton = React.forwardRef(({ value }, ref) => {
	const [count, setCount] = useState(value);
	useCellEditor(ref, count, true);

	return (
		<Button variant="primaryOutline" onClick={() => setCount(c => c + 1)}>{`${count} +`}</Button>
	);
});

IncrementButton.displayName = 'IncrementButton';

function App() {
	return (
		<>
			<Heading level={48}>Variations</Heading>
			<Variations />
			<Heading level={48}>Examples</Heading>
			<Examples />
		</>
	);
}

ReactDOM.render(<App />, document.querySelector('#app'));

function CodeBlock({ value, language }) {
	return (
		<SyntaxHighlighter language={language} style={coy}>
			{value}
		</SyntaxHighlighter>
	);
}

CodeBlock.defaultProps = {
	language: null,
};

function Variations() {
	return (
		<Box>
			<Sample text={variations.simpleTable}>
				<SimpleGrid
					data={censusData}
					maxRows={10}
					onRowClick={row => {
						alert(row.value);
					}}
				>
					<GridColumn
						displayName="Name"
						fieldName="value"
						defaultSort={GridColumn.sortOptions.ascending}
					/>
					<GridColumn displayName="Population" fieldName="population" isRightAligned />
					<GridColumn
						displayName="Net Population Change"
						fieldName="populationChange"
						isRightAligned
					/>
					<GridColumn
						displayName="Births"
						fieldName="births"
						isRightAligned
						width={100}
						isLargeViewportOnly
					/>
					<GridColumn
						displayName="Deaths"
						fieldName="deaths"
						isRightAligned
						width={100}
						isSortable={false}
						isLargeViewportOnly
					/>
				</SimpleGrid>
			</Sample>
			<Sample text={variations.paginatedTable}>
				<PaginatedGrid data={censusData} maxRows={10}>
					<GridColumn
						displayName="Name"
						fieldName="value"
						defaultSort={GridColumn.sortOptions.ascending}
					/>
					<GridColumn displayName="Population" fieldName="population" />
					<GridColumn displayName="Net Population Change" fieldName="populationChange" />
					<GridColumn displayName="Births" fieldName="births" />
					<GridColumn displayName="Deaths" fieldName="deaths" />
				</PaginatedGrid>
			</Sample>
			<Sample text={variations.treeTable}>
				<TreeGrid
					data={censusDataFolders}
					maxRows={10}
					autoGroupExpansion={TreeGrid.expandedRowsOptions.topLevel}
				>
					<TreeGrid.GroupColumn displayName="Name" width={500} />
					<GridColumn displayName="Population" fieldName="population" />
					<GridColumn displayName="Net Population Change" fieldName="populationChange" />
				</TreeGrid>
			</Sample>
		</Box>
	);
}

function Examples() {
	const gridRef = useRef();
	return (
		<>
			<Sample text={examples.rowId} initialState={{ data: censusData }}>
				{(state, setState) => (
					<>
						<Button
							variant="primary"
							size="medium"
							onClick={() => setState({ data: state.data.slice(50) })}
						>
							Update Data
						</Button>
						<SimpleGrid data={state.data} maxRows={10} handleGetRowId={data => data.value}>
							<GridColumn
								displayName="Name"
								fieldName="value"
								defaultSort={GridColumn.sortOptions.ascending}
							/>
							<GridColumn displayName="Population" fieldName="population" isRightAligned />
							<GridColumn
								displayName="Net Population Change"
								fieldName="populationChange"
								isRightAligned
							/>
							<GridColumn
								displayName="Births"
								fieldName="births"
								isRightAligned
								width={100}
								isLargeViewportOnly
							/>
							<GridColumn
								displayName="Deaths"
								fieldName="deaths"
								isRightAligned
								width={100}
								isSortable={false}
								isLargeViewportOnly
							/>
						</SimpleGrid>
					</>
				)}
			</Sample>
			<Sample text={examples.interactableElements}>
				<SimpleGrid data={censusData} maxRows={10} onRowClick={() => alert('Click')}>
					<GridColumn
						displayName="Name"
						fieldName="value"
						defaultSort={GridColumn.sortOptions.ascending}
					/>
					<GridColumn displayName="Population" fieldName="population" isRightAligned />
					<GridColumn
						displayName="Net Population Change"
						fieldName="populationChange"
						isRightAligned
					/>
					<GridColumn
						hasInteractableElement
						displayName=""
						fieldName="edit"
						width={100}
						cellComponent={({ data }) => (
							<Button variant="primary" size="small" onClick={() => console.log(data)}>
								Edit
							</Button>
						)}
						isLargeViewportOnly
					/>
				</SimpleGrid>
			</Sample>
			<Sample text={examples.simpleAggregations}>
				<SimpleGrid data={censusData} maxRows={10}>
					<SimpleGrid.GroupColumn displayName="Name" fieldName="value" />
					<GridColumn hide fieldName="areaDesc" groupByColumn width={200} />
					<GridColumn displayName="Population" fieldName="population" />
					<GridColumn displayName="Net Population Change" fieldName="populationChange" />
				</SimpleGrid>
			</Sample>
			<Sample text={examples.textFiltering} initialState={{ filterText: 'WA' }}>
				{(state, setState) => (
					<>
						<Input
							placeholder="Search"
							value={state.filterText}
							onChange={e => setState({ filterText: e.target.value })}
						/>
						<SimpleGrid
							data={censusData}
							maxRows={10}
							onRowClick={row => {
								alert(row.value);
							}}
							filterText={state.filterText}
						>
							<GridColumn
								displayName="Name"
								fieldName="value"
								defaultSort={GridColumn.sortOptions.ascending}
							/>
							<GridColumn displayName="Population" fieldName="population" isRightAligned />
							<GridColumn
								displayName="Net Population Change"
								fieldName="populationChange"
								isRightAligned
							/>
							<GridColumn
								displayName="Births"
								fieldName="births"
								isRightAligned
								width={100}
								isLargeViewportOnly
							/>
							<GridColumn
								displayName="Deaths"
								fieldName="deaths"
								isRightAligned
								width={100}
								isSortable={false}
								isLargeViewportOnly
							/>
						</SimpleGrid>
					</>
				)}
			</Sample>
			<Sample text={examples.advancedFiltering} initialState={{ filter: null }}>
				{(state, setState) => (
					<>
						<SegmentedButtonGroup>
							<Button
								onClick={() =>
									setState({ filter: { population: { type: 'greaterThan', filter: '200000' } } })
								}
							>
								{'Pop > 200,000'}
							</Button>
							<Button
								onClick={() =>
									setState({ filter: { population: { type: 'lessThan', filter: '200000' } } })
								}
							>
								{'Pop < 200,000'}
							</Button>
							<Button onClick={() => setState({ filter: null })}>None</Button>
						</SegmentedButtonGroup>
						{JSON.stringify(state.filter)}
						<SimpleGrid
							filters={state.filter}
							data={censusData}
							maxRows={10}
							onRowClick={row => {
								alert(row.value);
							}}
							filterText={state.filterText}
						>
							<GridColumn displayName="Name" fieldName="value" />
							<GridColumn
								displayName="Population"
								fieldName="population"
								isRightAligned
								filter={GridColumn.filterByOptions.number}
							/>
							<GridColumn
								displayName="Net Population Change"
								fieldName="populationChange"
								isRightAligned
							/>
							<GridColumn
								displayName="Births"
								fieldName="births"
								isRightAligned
								width={100}
								isLargeViewportOnly
							/>
							<GridColumn
								displayName="Deaths"
								fieldName="deaths"
								isRightAligned
								width={100}
								isSortable={false}
								isLargeViewportOnly
							/>
						</SimpleGrid>
					</>
				)}
			</Sample>
			<Sample text={examples.customComponent}>
				<SimpleGrid
					data={censusData}
					maxRows={10}
					onRowClick={row => {
						alert(row.value);
					}}
				>
					<GridColumn
						displayName="Name"
						fieldName="value"
						defaultSort={GridColumn.sortOptions.ascending}
					/>
					<GridColumn displayName="Population" fieldName="population" isRightAligned />
					<GridColumn
						displayName="Net Population Change"
						fieldName="populationChange"
						cellComponent={PopulationChange}
						isRightAligned
					/>
					<GridColumn
						displayName="Births"
						fieldName="births"
						isRightAligned
						width={100}
						isLargeViewportOnly
					/>
					<GridColumn
						displayName="Deaths"
						fieldName="deaths"
						isRightAligned
						width={100}
						isSortable={false}
						isLargeViewportOnly
					/>
				</SimpleGrid>
			</Sample>
			<Sample text={examples.dragAndDrop} initialState={{ data: censusDataFolders }}>
				{(state, setState) => (
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
				)}
			</Sample>
			<Sample text={examples.checkbox} initialState={{ selected: false }}>
				{(state, setState) => (
					<>
						<Button
							onClick={() => {
								!state.selected
									? gridRef.current.selectAllRows()
									: gridRef.current.deselectAllRows();
								setState({ selected: !state.selected });
							}}
						>
							Select/ Deselect
						</Button>
						<SimpleGrid
							ref={gridRef}
							data={censusData}
							maxRows={10}
							onRowClick={row => {
								console.log(row);
							}}
							onRowSelect={rows => {
								console.log(rows);
							}}
							rowSelectionType={SimpleGrid.rowSelectionOptions.multi}
						>
							<GridColumn
								displayName="Name"
								fieldName="value"
								defaultSort={GridColumn.sortOptions.ascending}
								showCheckbox
							/>
							<GridColumn displayName="Population" fieldName="population" isRightAligned />
							<GridColumn
								displayName="Net Population Change"
								fieldName="populationChange"
								isRightAligned
							/>
							<GridColumn
								displayName="Births"
								fieldName="births"
								isRightAligned
								width={100}
								isLargeViewportOnly
							/>
							<GridColumn
								displayName="Deaths"
								fieldName="deaths"
								isRightAligned
								width={100}
								isSortable={false}
								isLargeViewportOnly
							/>
						</SimpleGrid>
					</>
				)}
			</Sample>
			<Sample text={examples.editableFields}>
				<SimpleGrid
					data={censusData}
					maxRows={10}
					onRowDataChange={newData => console.log(newData)}
				>
					<GridColumn
						displayName="Name"
						fieldName="value"
						defaultSort={GridColumn.sortOptions.ascending}
					/>
					<GridColumn displayName="Population" fieldName="population" isEditable />
					<GridColumn
						displayName="Net Population Change"
						fieldName="populationChange"
						isEditable
						editorComponent={IncrementButton}
					/>
					<GridColumn displayName="Births" fieldName="births" width={100} isLargeViewportOnly />
					<GridColumn
						displayName="Deaths"
						fieldName="deaths"
						width={100}
						isSortable={false}
						isLargeViewportOnly
					/>
				</SimpleGrid>
			</Sample>
		</>
	);
}

function Sample({ text: { title, source }, initialState, children }) {
	const [state, setState] = useState(initialState || {});
	return (
		<Box marginY={4}>
			<ReactMarkdown source={title} renderers={{ code: CodeBlock }} />
			{typeof children === 'function' ? children(state, setState) : children}
			<ReactMarkdown source={source} renderers={{ code: CodeBlock }} />
		</Box>
	);
}

function PopulationChange({ value }) {
	return (
		<div style={{ color: value >= 0 ? 'green' : 'red' }}>{`${value >= 0 ? '+' : '-'} ${Math.abs(
			value
		)}`}</div>
	);
}
