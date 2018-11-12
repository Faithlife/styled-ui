import React from 'react';
import PropTypes from 'prop-types';
import { SimpleModal } from '../../simple-modal/component.jsx';
import * as Styled from '../styled.jsx';
import { GroupSelectorSearch } from '../search/component.jsx';

export class GroupSelectorModal extends React.Component {
	static propTypes = {
		/** Toggles the modal state open and closed */
		onChangeModalState: PropTypes.func.isRequired,
		/** Keeps track of modal open/closed state */
		isOpen: PropTypes.bool.isRequired,
		/** Where search strings will be passed for application to query account services */
		onSearchInputChange: PropTypes.func.isRequired,
		/** Groups that user is a part of (can be empty array) */
		groups: PropTypes.array.isRequired,
		/** Where results from group search should be passed */
		groupSearchResults: PropTypes.array,
		/** Function called when user creates group.  Application is responsible for contacting account services */
		onCreateGroup: PropTypes.func.isRequired,
		/** Operation to perform when "Get Started" buttons are clicked */
		onGetStartedClick: PropTypes.func.isRequired,
		/** Operation to perform when user requests to claim a group */
		onClaimGroupClick: PropTypes.func.isRequired,
		/** Operation to perform when user requests to join a group */
		onJoinGroupClick: PropTypes.func.isRequired,
		/** Operation to perform when user requests to join a group */
		onAdminRequestClick: PropTypes.func.isRequired,
	};

	render() {
		return (
			<Styled.GroupSelectorModal>
				<SimpleModal
					isOpen={this.props.isOpen}
					onClose={this.props.onChangeModalState}
					theme={{ background: 'transparent' }}
				>
					<GroupSelectorSearch
						onChangeModalState={this.props.onChangeModalState}
						onSearchInputChange={this.props.onSearchInputChange}
						groups={this.props.groups}
						groupSearchResults={this.props.groupSearchResults}
						onCreateGroup={this.props.onCreateGroup}
						onGetStartedClick={this.props.onGetStartedClick}
						onClaimGroupClick={this.props.onClaimGroupClick}
						onJoinGroupClick={this.props.onJoinGroupClick}
						onAdminRequestClick={this.props.onAdminRequestClick}
						isInModal={true}
					/>
				</SimpleModal>
			</Styled.GroupSelectorModal>
		);
	}
}
