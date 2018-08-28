import React from 'react';
import PropTypes from 'prop-types';
import { Bootstrap } from '../../components/main.js';
import * as Styled from './styled.jsx';
import { GroupDropdown } from './dropdown.jsx';
import { GroupSelectorModal } from './modal/component.jsx';

const { Button } = Bootstrap;
const defaultGroup = {
	name: '',
	groupId: -1,
	kind: '',
};

/** Styled group selector control */
export class GroupSelector extends React.Component {
	static propTypes = {
		/** Selects view state of group selector */
		groupSelectorView: PropTypes.oneOf(['groups', 'no-groups']).isRequired,
		/** returns data to application for group creation */
		onCreateGroup: PropTypes.func.isRequired,
		/** function that is called every time user chooses a different group */
		onSelectionChange: PropTypes.func.isRequired,
		/** returns search string to application */
		executeSearch: PropTypes.func.isRequired,
		/** -1 if no previous selected group */
		selectedGroupId: PropTypes.number.isRequired,
		/** all groups that should be displayed on the dropdown can be empty but must be defined */
		// groups: PropTypes.arrayOf(
		// 	PropTypes.shape({
		// 		name: PropTypes.string,
		// 		groupId: PropTypes.number,
		// 		kind: PropTypes.string,
		// 		avatarUrl: PropTypes.string,
		// 		membershipKind: PropTypes.string,
		//		claimable: PropTypes.string,
		//		location: PropTypes.string
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
		//		claimable: string,
		//		location: PropTypes.string
		// 	}),
		// ),
		groupSearchResults: PropTypes.array,
		/** action that should be taken when user selects group with proper permissions */
		onGetStartedClick: PropTypes.func.isRequired,
		/** action that should be taken when user claims group */
		onClaimGroupClick: PropTypes.func.isRequired,
		/** is the dropdown on a mobile view */
		isMobile: PropTypes.bool.isRequired,
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
				<Styled.GroupSelector tabIndex="0">
					{this.props.groupSelectorView === 'groups' && (
						<GroupDropdown
							groups={this.props.groups}
							selectedGroup={selectedGroup}
							onSelectionChange={this.props.onSelectionChange}
							onFindChurchButtonClick={this.handleChangeModalState}
							isMobile={this.props.isMobile}
						/>
					)}
					{this.props.groupSelectorView === 'no-groups' && (
						<Button color="primary" onClick={this.handleChangeModalState}>
							Find or add Church
						</Button>
					)}
				</Styled.GroupSelector>
				<GroupSelectorModal
					isOpen={this.state.isModalOpen}
					onChangeModalState={this.handleChangeModalState}
					executeSearch={this.props.executeSearch}
					groups={this.props.groups}
					groupSearchResults={this.props.groupSearchResults}
					onCreateGroup={this.props.onCreateGroup}
					onGetStartedClick={this.props.onGetStartedClick}
					onClaimGroupClick={this.props.onClaimGroupClick}
				/>
			</div>
		);
	}
}
