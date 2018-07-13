Install ag-grid to your project as a dependency. If you are developing a library, install these as peerDependencies and devDependencies.

```
yarn add ag-grid ag-grid-enterprise ag-grid-react
```

Then, import the grid into your application. Prefer to use `deltaRowDataMode` so that when state is updated the grid does not lose focus. Check out the [example code](https://github.com/Faithlife/styled-ui/tree/master/catalog/grid) in the repo or the example below.

```
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import '@faithlife/styled-ui/dist/ag-grid.css';

class MyTable extends React.Component {
	// Each row must have a unique identifier
	getRowNodeId = data => data.guid;

	// Use object spread to clone the row being updated, or the grid won't update properly
	onCellValueChanged = ({ newValue, column, data }) => {
		const rowData = [...this.state.rowData];
		const rowIndex = rowData.findIndex(x => x === data);
		if (!rowData[rowIndex]) {
			throw new Error('Could not find row');
		}

		rowData[rowIndex] = { ...rowData[rowIndex], [column.colId]: newValue };

		this.setState({
			rowData,
		});
	};

	// rowData must be set via the API (not component props), or ag-grid will mutate state directly
	onGridReady = params => {
		this.api = params.api;
		this.api.setRowData(this.state.rowData);
		this.api.sizeColumnsToFit();
	};

	render() {
		<div style={{ height: 525, width: '100%' }} className="ag-theme-faithlife">
			<AgGridReact
				columnDefs={this.state.columnDefs}
				getRowNodeId={this.getRowNodeId}
				onCellValueChanged={this.onCellValueChanged}
				onGridReady={this.onGridReady}
				enableColResize
				enableSorting
				enableFilter
				deltaRowDataMode
				headerHeight="36"
				rowHeight="36"
				rowSelection="multiple"
				rowStyle={{ 'border-bottom': '1px solid #dbdbdb' }}
			/>
		</div>
	}
}
```
