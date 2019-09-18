import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import * as Styled from './styled';
import { GroupDropdown } from './dropdown';
import { LargeGroupSelector } from './large';

const defaultGroup = {
	name: '',
	groupId: -1,
	kind: '',
};

const groupShape = PropTypes.shape({
	name: PropTypes.string.isRequired,
	groupId: PropTypes.number.isRequired,
	kind: PropTypes.string.isRequired,
	avatarUrl: PropTypes.string,
	relationshipKind: PropTypes.string,
	membershipKind: PropTypes.string,
	claimable: PropTypes.bool,
});

/** Small group selector for searching Faithlife groups. Launches a modal containing LargeGroupSelector in some cases. */
export class GroupSelector extends React.Component {
	static propTypes = {
		/** Selects view state of group selector */
		groupSelectorView: PropTypes.oneOf(['groups', 'no-groups']).isRequired,
		/** Returns data to application for group creation */
		onCreateGroup: PropTypes.func.isRequired,
		/** Function that is called every time user chooses a different group */
		onSelectionChange: PropTypes.func.isRequired,
		/** Returns search string to application */
		onSearchInputChange: PropTypes.func.isRequired,
		/** Returns -1 if no previous selected group */
		selectedGroupId: PropTypes.number.isRequired,
		/** All groups that should be displayed on the dropdown can be empty but must be defined */
		groups: PropTypes.arrayOf(groupShape).isRequired,
		/** Undefined or empty if no search has been executed yet */
		groupSearchResults: PropTypes.arrayOf(groupShape),
		/** Action that should be taken when user selects group with proper permissions */
		onGetStartedClick: PropTypes.func.isRequired,
		/** Action that should be taken when user claims group */
		onClaimGroupClick: PropTypes.func.isRequired,
		/** Operation to perform when user requests to join a group */
		onJoinGroupClick: PropTypes.func.isRequired,
		/** Operation to perform when user requests to join a group */
		onAdminRequestClick: PropTypes.func.isRequired,
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
			this.props.onCreateGroup(this.state.newGroupName, 'church');
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
					{this.props.groupSelectorView === 'groups' && (
						<GroupDropdown
							tabIndex="0"
							groups={this.props.groups}
							selectedGroup={selectedGroup}
							onSelectionChange={this.props.onSelectionChange}
							onFindChurchButtonClick={this.handleChangeModalState}
						/>
					)}
					{this.props.groupSelectorView === 'no-groups' && (
						<Button size="small" variant="primary" onClick={this.handleChangeModalState}>
							Find or add Church
						</Button>
					)}
				</Styled.GroupSelector>
				<LargeGroupSelector
					isOpen={this.state.isModalOpen}
					onChangeModalState={this.handleChangeModalState}
					onSearchInputChange={this.props.onSearchInputChange}
					groups={this.props.groups}
					groupSearchResults={this.props.groupSearchResults}
					onCreateGroup={this.props.onCreateGroup}
					onGetStartedClick={this.props.onGetStartedClick}
					onClaimGroupClick={this.props.onClaimGroupClick}
					onJoinGroupClick={this.props.onJoinGroupClick}
					onAdminRequestClick={this.props.onAdminRequestClick}
				/>
			</div>
		);
	}
}
