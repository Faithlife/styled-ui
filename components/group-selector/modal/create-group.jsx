import React from 'react';
import PropTypes from 'prop-types';
import { Bootstrap } from '../../../components/main.js';
import * as Styled from '../styled.jsx';

const { Button, Input } = Bootstrap;

export class CreateGroup extends React.PureComponent {
	static propTypes = {
		isCreateGroupFocused: PropTypes.bool.isRequired,
		setCreateGroupFocused: PropTypes.func.isRequired,
		searchInputValue: PropTypes.string.isRequired,
		handleCreateGroup: PropTypes.func.isRequired,
	};

	state = {
		newGroupName: '',
		newGroupLocation: '',
	};

	handleNewGroupNameChange = event => {
		this.setState({ newGroupName: event.target.value });
	};

	handleCreateGroupInsideClick = () => {
		this.props.setCreateGroupFocused(true);
	};

	handleCreateChurchNameFocus = () => {
		this.props.setCreateGroupFocused(true);
		if (this.state.newGroupName) return;
		this.setState({ newGroupName: this.props.searchInputValue });
	};

	handleNewGroupLocationChange = event => {
		this.setState({ newGroupLocation: event.target.value });
	};

	handleCreateGroupClick = () => {
		this.props.handleCreateGroup(this.state.newGroupName, this.state.newGroupLocation);
	};

	render() {
		return (
			<Styled.CreateGroup onClick={this.handleCreateGroupInsideClick}>
				<Styled.CreateGroupTitle>
					Or add your church to the Faithlife Church Directory
				</Styled.CreateGroupTitle>
				{this.props.isCreateGroupFocused ? (
					<Styled.CreateGroupLabel>Church Name</Styled.CreateGroupLabel>
				) : null}
				<Input
					onFocus={this.handleCreateChurchNameFocus}
					value={this.state.newGroupName}
					placeholder={this.searchInputValue ? `${this.searchInputValue}` : 'Your church name'}
					onChange={this.handleNewGroupNameChange}
				/>
				<Styled.CreateGroupLabel>Church Location</Styled.CreateGroupLabel>
				<Input
					value={this.state.newGroupLocation}
					placeholder="City, State"
					onChange={this.handleNewGroupLocationChange}
				/>
				<Styled.CreateGroupButton>
					<Button
						color="primary"
						disabled={!this.state.newGroupName || !this.state.newGroupLocation}
						onClick={this.handleCreateGroupClick}
					>
						Create
					</Button>
				</Styled.CreateGroupButton>
			</Styled.CreateGroup>
		);
	}
}
