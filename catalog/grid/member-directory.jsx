/* eslint-disable prefer-template */
import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import { Bootstrap } from '../../components/main';
import { KebabVertical } from '../../components/icons';
import { BootstrapContainer } from '../../components/utils';
import { colors } from '../../components/shared-styles';
import members from './members.json';

const { Button, Popover, ListGroup, ListGroupItem } = Bootstrap;

const IconContainer = styled.div`
	display: flex;
`;
const IconButton = styled.button`
	background: none;
	border: 0;
	flex: 1;

	svg {
		height: 18px;
		color: ${colors.gray52};
		vertical-align: middle;
		margin-top: -4px;
	}
`;

class KebabCell extends Component {
	state = { dropDownOpen: false };

	buttonRef = React.createRef();

	toggle = () => {
		this.setState(state => ({ dropDownOpen: !state.dropDownOpen }));
	};

	render() {
		return (
			<IconContainer>
				<IconButton onClick={this.toggle} type="button" innerRef={this.buttonRef}>
					<KebabVertical />
				</IconButton>
				{this.state.dropDownOpen && (
					<Popover
						target={this.buttonRef.current}
						isOpen={this.state.dropDownOpen}
						toggle={this.toggle}
						placement="bottom-end"
						hideArrow
					>
						<ListGroup flush>
							<ListGroupItem active tag="button" action>
								Send Message
							</ListGroupItem>
							<ListGroupItem tag="button" action>
								View Details
							</ListGroupItem>
						</ListGroup>
					</Popover>
				)}
			</IconContainer>
		);
	}
}

export class MemberDirectory extends Component {
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
			{
				headerName: '',
				field: '',
				cellRendererFramework: KebabCell,
				width: 60,
				suppressCellSelection: true,
				cellStyle: { border: 'none' },
				pinned: 'right',
			},
		],
		showToolPanel: false,
	};

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	}

	componentDidUpdate() {
		if (this.api) {
			this.api.setRowData(this.state.rowData);
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
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

	toggleToolPanel = () => {
		this.setState(state => ({ showToolPanel: !state.showToolPanel }));
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

	handleResize = debounce(() => {
		this.api.sizeColumnsToFit();
	}, 100);

	render() {
		return (
			<BootstrapContainer>
				<div>
					<Button className="m-1" size="sm" outline color="primary" onClick={this.updateGrid}>
						Update grid
					</Button>
					<Button className="m-1" size="sm" outline color="primary" onClick={this.toggleToolPanel}>
						Toggle tool panel
					</Button>
				</div>
				<div style={{ height: 525, width: '100%' }} className="ag-theme-faithlife">
					<AgGridReact
						colResizeDefault="shift"
						toolPanelSuppressRowGroups
						toolPanelSuppressPivotMode
						toolPanelSuppressValues
						toolPanelSuppressSideButtons
						toolPanelSuppressColumnFilter
						toolPanelSuppressColumnSelectAll
						showToolPanel={this.state.showToolPanel}
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
			</BootstrapContainer>
		);
	}
}
