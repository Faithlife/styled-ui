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
		/** Returns data to application for group creation */
		onCreateGroup: PropTypes.func.isRequired,
		/** Function that is called every time user chooses a different group */
		onSelectionChange: PropTypes.func.isRequired,
		/** Returns search string to application */
		onSearchInputChange: PropTypes.func.isRequired,
		/** Returns -1 if no previous selected group */
		selectedGroupId: PropTypes.number.isRequired,
		/** All groups that should be displayed on the dropdown can be empty but must be defined */
		groups: PropTypes.array.isRequired,
		/** Undefined or empty if no search has been executed yet */
		groupSearchResults: PropTypes.array,
		/** Action that should be taken when user selects group with proper permissions */
		onGetStartedClick: PropTypes.func.isRequired,
		/** Action that should be taken when user claims group */
		onClaimGroupClick: PropTypes.func.isRequired,
		/** Operation to perform when user requests to join a group */
		onJoinGroupClick: PropTypes.func.isRequired,
		/** Operation to perform when user requests to join a group */
		onAdminRequestClick: PropTypes.func.isRequired,
		/** Is the dropdown on a mobile view */
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
