import React from 'react';
import PropTypes from 'prop-types';
import { Bootstrap } from '../../components/main.js';
import * as Styled from './styled.jsx';
import { GroupDropdown } from './dropdown.jsx';
import { GroupSelectorModal } from './modal/component.jsx';

const { Button, InputGroup, InputGroupAddon } = Bootstrap;
const defaultGroup = {
	name: '',
	groupId: -1,
	kind: '',
};

/** Styled group selector control */
export class GroupSelector extends React.Component {
	static propTypes = {
		/** Selects view state of group selector */
		groupSelectorView: PropTypes.oneOf(['groups', 'sign-in', 'no-groups', 'fetching']).isRequired,
		/** function that is called when "Sign In" is clicked by the user */
		handleSignInClick: PropTypes.func.isRequired,
		/** returns data to application for group creation */
		handleCreateGroup: PropTypes.func.isRequired,
		/** function that is called every time user chooses a different group */
		handleSelectionChange: PropTypes.func.isRequired,
		/** returns search string to application */
		executeSearch: PropTypes.func.isRequired,
		/** -1 if no previous selected group */
		selectedGroupId: PropTypes.number.isRequired,
		/** all groups that should be displayed on the dropdown */
		// groups: PropTypes.arrayOf(
		// 	PropTypes.shape({
		// 		name: PropTypes.string,
		// 		groupId: PropTypes.number,
		// 		kind: PropTypes.string,
		// 		avatarUrl: PropTypes.string,
		// 		membershipKind: PropTypes.string,
		// 	}),
		// ).isRequired,
		groups: PropTypes.array.isRequired,
		/** undefined or empty if no search has been executed yet */
		// searchedGroups: PropTypes.arrayOf(
		// 	PropTypes.shape({
		// 		name: PropTypes.string,
		// 		groupId: PropTypes.number,
		// 		kind: PropTypes.string,
		// 		avatarUrl: PropTypes.string,
		// 		membershipKind: PropTypes.string,
		// 	}),
		// ),
		groupSearchResults: PropTypes.array,
		/** action that should be taken when user selects group with proper permissions */
		handleGetStartedClick: PropTypes.func.isRequired,
		/** function to execute when user wants to request access to a group */
		handleRequestClick: PropTypes.func.isRequired,
		/** function to execute when user wants to change group type to 'church' */
		handleEditClick: PropTypes.func.isRequired,
		/** function to execute when user wants to join a group displayed in a search result */
		handleJoinGroupClick: PropTypes.func.isRequired,
	};
	state = {
		newGroupName: '',
		isModalOpen: false,
	};

	getGroup = groupId =>
		(this.props.groups || []).find(group => group.groupId === groupId) || defaultGroup;

	handleChangeModalState = () => {
		this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
	};

	handleKeyPress = event => {
		if (event.key === 'Enter') {
			this.props.handleCreateGroup(this.state.newGroupName, 'church');
		}
	};

	handleTextInput = event => {
		this.setState({
			newGroupName: event.target.value,
		});
	};

	render() {
		const selectedGroup = this.getGroup(this.props.selectedGroupId);
		return (
			<div>
				<Styled.GroupSelector>
					{this.props.groupSelectorView === 'fetching' && (
						<Styled.SelectedGroupContainer>
							<Styled.SelectedGroup>
								<Styled.LoadingText>Loading...</Styled.LoadingText>
							</Styled.SelectedGroup>
						</Styled.SelectedGroupContainer>
					)}
					{this.props.groupSelectorView === 'groups' && (
						<GroupDropdown
							groups={this.props.groups}
							selectedGroup={selectedGroup}
							handleSelectionChange={this.props.handleSelectionChange}
							handleFindChurchButtonClick={this.handleChangeModalState}
						/>
					)}
					{this.props.groupSelectorView === 'no-groups' && (
						<InputGroup>
							<Styled.GroupSelectorInputContainer
								type="text"
								placeholder="Create Group"
								value={this.state.newGroupName}
								onChange={this.handleTextInput}
								onKeyPress={this.handleKeyPress}
							/>
							<InputGroupAddon addonType="append" />
						</InputGroup>
					)}
					{this.props.groupSelectorView === 'sign-in' && (
						<Styled.GroupSelectorSignInButton>
							<Button color="primary" onClick={this.props.handleSignInClick}>
								Sign In
							</Button>
						</Styled.GroupSelectorSignInButton>
					)}
				</Styled.GroupSelector>
				<GroupSelectorModal
					isOpen={this.state.isModalOpen}
					changeModalState={this.handleChangeModalState}
					executeSearch={this.props.executeSearch}
					groups={this.props.groups}
					groupSearchResults={this.props.groupSearchResults}
					handleCreateGroup={this.props.handleCreateGroup}
					handleGetStartedClick={this.props.handleGetStartedClick}
					handleRequestClick={this.props.handleRequestClick}
					handleEditClick={this.props.handleEditClick}
					handleJoinGroupClick={this.props.handleJoinGroupClick}
				/>
			</div>
		);
	}
}
