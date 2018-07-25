/* eslint-disable prefer-template */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import { Bootstrap } from '../../components/main.js';
import { getNextVolunteer, schedule } from './volunteers';

const { Button, Container, Row, Col } = Bootstrap;

const availability = {
	confirmed: 'confirmed',
	maybe: 'maybe',
	declined: 'declined',
};

const getRandomStatus = () =>
	Object.values(availability)[Math.floor(Math.random() * Object.values(availability).length)];

class VolunteerCellRenderer extends Component {
	static propTypes = {
		value: PropTypes.object,
	};

	render() {
		return !this.props.value.aggregation ? (
			<div>
				<span style={{ fontWeight: 'bold' }}>{this.props.value && this.props.value.name}</span>{' '}
				<span
					style={{
						color:
							this.props.value.status === availability.confirmed
								? 'darkgreen'
								: this.props.value.status === availability.maybe
									? 'goldenrod'
									: 'dimgray',
					}}
				>
					{this.props.value.status}
				</span>
			</div>
		) : (
			<span>{JSON.stringify(this.props.value.availability)}</span>
		);
	}
}

class VolunteerGroupRenderer extends Component {
	static propTypes = {
		node: PropTypes.object,
		reactContainer: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		props.reactContainer.style.display = 'inline-block'; // eslint-disable-line no-param-reassign
	}

	render() {
		return (
			<span style={{ fontWeight: 'bold' }}>
				{this.props.node.key} {JSON.stringify(this.props.node.aggData)}
			</span>
		);
	}
}

function aggregateVolunteers(values) {
	return {
		aggregation: true,
		availability: values.reduce(
			(prev, curr) => ({
				...prev,
				[curr.status]: prev[curr.status] == null ? 1 : prev[curr.status] + 1,
			}),
			{},
		),
	};
}

class VolunteerEditor extends Component {
	static propTypes = {
		value: PropTypes.object.isRequired,
	};

	isPopup() {
		return true;
	}

	state = {
		volunteer: { ...getNextVolunteer(), status: getRandomStatus() },
	};

	getValue = () => this.state.volunteer;

	render() {
		return (
			<div>
				Custom react editor. Curr: {this.props.value.name}, Next: {this.state.volunteer.name}
			</div>
		);
	}
}

class GridDemo extends Component {
	state = {
		rowData: schedule.roles.map(role => ({
			role,
			...schedule.events.reduce(
				(prev, curr) => ({
					...prev,
					[curr.id]: { ...getNextVolunteer(), status: getRandomStatus() },
				}),
				{},
			),
		})),
		columnDefs: [
			{
				headerName: 'Teams',
				children: [
					{ headerName: 'Team', field: 'role.team', rowGroup: true, hide: true },
					{ headerName: 'Role', field: 'role.name' },
				],
			},
			{
				headerName: 'Schedule',
				children: schedule.events.map(e => ({
					headerName: e.description,
					field: e.id,
					editable: true,
					cellEditorFramework: VolunteerEditor,
					cellRendererFramework: VolunteerCellRenderer,
					enableValue: true,
					aggFunc: aggregateVolunteers,
				})),
			},
		],
	};

	componentDidUpdate() {
		if (this.api) {
			this.api.setRowData(this.state.rowData);
		}
	}

	getRowNodeId = data => data.role.id;

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
		this.columnApi = params.columnApi;
		this.api.setRowData(this.state.rowData);
		this.api.sizeColumnsToFit();
	};

	updateGrid = () => {
		const rowData = [...this.state.rowData];

		rowData[0] = {
			...rowData[0],
			[schedule.events[0].id]: {
				...rowData[0][schedule.events[0].id],
				...getNextVolunteer(),
				status: getRandomStatus(),
			},
		};
		this.setState({
			rowData,
		});
	};

	render() {
		return (
			<div>
				<Row>
					<Col>
						<Button className="m-1" size="sm" outline color="primary" onClick={this.updateGrid}>
							Update grid
						</Button>
					</Col>
				</Row>
				<div style={{ height: 525, width: '100%' }} className="ag-theme-faithlife">
					<AgGridReact
						toolPanelSuppressSideButtons
						columnDefs={this.state.columnDefs}
						getRowNodeId={this.getRowNodeId}
						onCellValueChanged={this.onCellValueChanged}
						onGridReady={this.onGridReady}
						groupRowInnerRendererFramework={VolunteerGroupRenderer}
						enableColResize
						enableFilter
						deltaRowDataMode
						suppressAggFuncInHeader
						headerHeight="36"
						rowHeight="36"
						rowStyle={{ 'border-bottom': '1px solid #dbdbdb' }}
					/>
				</div>
			</div>
		);
	}
}

export class VolunteerScheduling extends Component {
	render() {
		return (
			<div>
				<Row>
					<Col>
						<GridDemo />
					</Col>
				</Row>
			</div>
		);
	}
}
