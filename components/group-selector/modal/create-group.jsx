import React from 'react';
import PropTypes from 'prop-types';
import { Bootstrap } from '../../../components/main.js';
import * as Styled from '../styled.jsx';

const { Button, Input } = Bootstrap;

export class CreateGroup extends React.Component {
	static propTypes = {
		isCreateGroupOpen: PropTypes.bool,
		searchInputValue: PropTypes.string,
		handleCreateGroup: PropTypes.func.isRequired,
		onChurchNameInputChange: PropTypes.func.isRequired,
		newChurchName: PropTypes.string,
		onChurchLocationInputChange: PropTypes.func.isRequired,
		newChurchLocation: PropTypes.string,
		openCreateGroup: PropTypes.func.isRequired,
	};

	state = {
		isFocused: false,
	};

	focusInput = () => {
		this.setState({ isFocused: true });
	};

	render() {
		return (
			<Styled.CreateGroup onClick={this.props.openCreateGroup}>
				<Styled.CreateGroupTitle>
					Or add your church to the Faithlife Church Directory
				</Styled.CreateGroupTitle>
				{this.props.isCreateGroupOpen ? (
					<Styled.CreateGroupLabel>Church Name</Styled.CreateGroupLabel>
				) : null}
				<Input
					onClick={this.focusInput}
					value={this.state.isFocused ? `${this.props.newChurchName}` : ''}
					placeholder={
						this.props.searchInputValue ? `${this.props.searchInputValue}` : 'Your church name'
					}
					onChange={this.props.onChurchNameInputChange}
				/>
				<Styled.CreateGroupLabel>Church Location</Styled.CreateGroupLabel>
				<Input
					value={this.props.newChurchLocation}
					placeholder="City, State"
					onChange={this.props.onChurchLocationInputChange}
				/>
				<Styled.CreateGroupButton>
					<Button
						color="primary"
						disabled={this.props.newChurchName === '' || this.props.newChurchLocation === ''}
						onClick={this.props.handleCreateGroup}
					>
						Create
					</Button>
				</Styled.CreateGroupButton>
			</Styled.CreateGroup>
		);
	}
}
