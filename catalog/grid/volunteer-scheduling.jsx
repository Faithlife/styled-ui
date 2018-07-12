/* eslint-disable prefer-template */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bootstrap } from '../../components/main.js';
import AgGridReact from '../../components/grid';

const { Button, Container, Row, Col } = Bootstrap;
let uniqueId = 0;

const availability = {
	confirmed: 'confirmed',
	maybe: 'maybe',
	declined: 'declined',
};

const getRandomStatus = () =>
	Object.values(availability)[Math.floor(Math.random() * Object.values(availability).length)];

let nameIndex = 0;
const names = [
	{
		id: String(uniqueId++),
		name: 'Willis Cote',
	},
	{
		id: String(uniqueId++),
		name: 'Winnie Gross',
	},
	{
		id: String(uniqueId++),
		name: 'Gibson Harris',
	},
	{
		id: String(uniqueId++),
		name: 'Stuart Estes',
	},
	{
		id: String(uniqueId++),
		name: 'Lesa Neal',
	},
	{
		id: String(uniqueId++),
		name: 'Stephenson Blair',
	},
	{
		id: String(uniqueId++),
		name: 'Crawford Kelly',
	},
	{
		id: String(uniqueId++),
		name: 'Hope Olson',
	},
	{
		id: String(uniqueId++),
		name: 'Deborah Rosario',
	},
	{
		id: String(uniqueId++),
		name: 'Avila Austin',
	},
	{
		id: String(uniqueId++),
		name: 'Moon Chambers',
	},
	{
		id: String(uniqueId++),
		name: 'Bolton Mckenzie',
	},
	{
		id: String(uniqueId++),
		name: 'Darla Booth',
	},
	{
		id: String(uniqueId++),
		name: 'Rosalyn Farmer',
	},
	{
		id: String(uniqueId++),
		name: 'Andrea Workman',
	},
	{
		id: String(uniqueId++),
		name: 'Jaclyn Gomez',
	},
	{
		id: String(uniqueId++),
		name: 'Celina Carrillo',
	},
	{
		id: String(uniqueId++),
		name: 'Elma Christian',
	},
	{
		id: String(uniqueId++),
		name: 'Angeline Gibson',
	},
	{
		id: String(uniqueId++),
		name: 'King Clemons',
	},
	{
		id: String(uniqueId++),
		name: 'Clarissa Holden',
	},
	{
		id: String(uniqueId++),
		name: 'Erika Patterson',
	},
	{
		id: String(uniqueId++),
		name: 'Benson Montoya',
	},
	{
		id: String(uniqueId++),
		name: 'Young Schultz',
	},
	{
		id: String(uniqueId++),
		name: 'Kari Holcomb',
	},
	{
		id: String(uniqueId++),
		name: 'Rene Mcclure',
	},
	{
		id: String(uniqueId++),
		name: 'Cornelia Summers',
	},
	{
		id: String(uniqueId++),
		name: 'Burgess Noble',
	},
	{
		id: String(uniqueId++),
		name: 'Gallegos Christensen',
	},
	{
		id: String(uniqueId++),
		name: 'Cox Green',
	},
];

const getNextVolunteer = () => {
	if (names[nameIndex] == null) {
		nameIndex = 0;
	}

	return names[nameIndex++];
};

const schedule = {
	people: [
		{
			name: 'User A',
			id: String(uniqueId++),
		},
		{
			name: 'User B',
			id: String(uniqueId++),
		},
		{
			name: 'User C',
			id: String(uniqueId++),
		},
	],
	roles: [
		{
			name: 'Greeter',
			team: 'Hospitality',
			id: String(uniqueId++),
		},
		{
			name: 'Parking',
			team: 'Hospitality',
			id: String(uniqueId++),
		},
		{
			name: 'Choir Lead',
			team: 'Choir',
			id: String(uniqueId++),
		},
		{
			name: 'Choir Tenor',
			team: 'Choir',
			id: String(uniqueId++),
		},
		{
			name: 'School Age Helper',
			team: 'Children',
			id: String(uniqueId++),
		},
	],
	events: [
		{
			name: 'Morning Service',
			description: 'Jun 1 10:00 AM',
			id: String(uniqueId++),
		},
		{
			name: 'Morning Service',
			description: 'Jun 8 10:00 AM',
			id: String(uniqueId++),
		},
		{
			name: 'Morning Service',
			description: 'Jun 15 10:00 AM',
			id: String(uniqueId++),
		},
		{
			name: 'Morning Service',
			description: 'Jun 15 10:00 AM',
			id: String(uniqueId++),
		},
	],
};

class VolunteerCellRenderer extends React.Component {
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

class VolunteerGroupRenderer extends React.Component {
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
		this.api.setRowData(this.state.rowData);
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
			<Container>
				<Row>
					<Col>
						<Button size="sm" outline color="primary" onClick={this.updateGrid}>
							Update grid
						</Button>
					</Col>
				</Row>
				<div style={{ height: 525, width: '100%' }} className="ag-theme-bootstrap">
					<AgGridReact
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
			</Container>
		);
	}
}

export default class DemoWrapper extends Component {
	render() {
		return (
			<Container>
				<Row>
					<Col>
						<GridDemo />
					</Col>
				</Row>
			</Container>
		);
	}
}
