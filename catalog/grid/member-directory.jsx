/* eslint-disable prefer-template */
import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import { Bootstrap } from '../../components/main.js';
import members from './members.json';

const { Button, Container, Row, Col } = Bootstrap;

export default class GridDemo extends Component {
	state = {
		rowData: [...members],
		columnDefs: [
			{
				headerName: 'Name',
				field: 'name',
				editable: true,
				checkboxSelection: true,
			},
			{
				headerName: 'Age',
				field: 'age',
				editable: true,
				enableValue: true,
			},
			{
				headerName: 'Phone',
				field: 'phone',
				editable: true,
			},
		],
	};

	componentDidUpdate() {
		this.api.setRowData(this.state.rowData);
	}

	getRowNodeId = data => data.guid;

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

	onGridReady = params => {
		this.api = params.api;
		this.api.setRowData(this.state.rowData);
		this.api.sizeColumnsToFit();
	};

	updateGrid = () => {
		const rowData = [...this.state.rowData];

		rowData[0] = {
			...rowData[0],
			age: Number(rowData[0].age) + 1,
		};
		this.setState({
			rowData,
		});
	};

	render() {
		return (
			<Container>
				<Row>
					<Col>
						<Button size="sm" outline color="primary" onClick={this.updateGrid}>
							Update grid
						</Button>
					</Col>
				</Row>
				<div style={{ height: 525, width: '100%' }} className="ag-theme-faithlife">
					<AgGridReact
						columnDefs={this.state.columnDefs}
						getRowNodeId={this.getRowNodeId}
						onCellValueChanged={this.onCellValueChanged}
						onGridReady={this.onGridReady}
						pivotPanelShow={false}
						rowGroupPanelShow={false}
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
			</Container>
		);
	}
}
