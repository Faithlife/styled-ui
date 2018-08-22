import React from 'react';
import PropTypes from 'prop-types';
import { Bootstrap } from '../../../components/main.js';
import * as Styled from '../styled.jsx';
import { Avatar } from '../avatar.jsx';
import { SearchResult } from './search-result.jsx';
import { CreateGroup } from './create-group.jsx';

const { Button } = Bootstrap;

export class GroupSelectorModal extends React.Component {
	static propTypes = {
		/** Toggles the modal state open and closed */
		onChangeModalState: PropTypes.func.isRequired,
		/** Keeps track of modal open/closed state */
		isOpen: PropTypes.bool.isRequired,
		/** Where search strings will be passed for application to query account services */
		executeSearch: PropTypes.func.isRequired,
		// groups: PropTypes.arrayOf(
		// 	PropTypes.shape({
		// 		name: PropTypes.string.isRequired,
		// 		groupId: PropTypes.number.isRequired,
		// 		kind: PropTypes.string.isRequired,
		// 		avatarUrl: PropTypes.string,
		// 		membershipKind: PropTypes.string,
		// 		relationshipKind: PropTypes.string,
		//		claimable: string,
		// 	}),
		// ).isRequired,
		/** Groups that user is a part of (can be empty array) */
		groups: PropTypes.array.isRequired,
		// searchedGroups: PropTypes.arrayOf(
		// 	PropTypes.shape({
		// 		name: PropTypes.string.isRequired,
		// 		groupId: PropTypes.number.isRequired,
		// 		kind: PropTypes.string.isRequired,
		// 		avatarUrl: PropTypes.string,
		// 		membershipKind: PropTypes.string,
		// 		relationshipKind: PropTypes.string,
		//		claimable: string,
		// 	}),
		// ),
		/** Where results from group search should be passed */
		groupSearchResults: PropTypes.array,
		/** Function called when user creates group.  Application is responsible for contacting account services */
		onCreateGroup: PropTypes.func.isRequired,
		/** Operation to perform when "Get Started" buttons are clicked */
		onGetStartedClick: PropTypes.func.isRequired,
		/** Operation to perform when user requests to claim a group */
		onClaimGroupClick: PropTypes.func.isRequired,
		/** Shows blue help box when true */
		showAlert: PropTypes.bool,
		/** Text to be included in help box */
		alertText: PropTypes.string,
	};

	state = {
		searchInputValue: '',
		newChurchName: '',
		newChurchLocation: '',
		isCreateGroupOpen: false,
		modalContent: 'main',
		selectedGroupId: -1,
	};

	createGroupPopupRef = React.createRef();

	componentDidMount = () => {
		window.addEventListener('mousedown', this.handleClick, false);
	};

	componentWillUnmount = () => {
		window.removeEventListener('mousedown', this.handleClick, false);
	};

	createGroupClick = () => {
		this.toggle();
		this.props.onCreateGroup(this.state.newChurchName, this.state.newChurchLocation);
	};

	clearSearchInput = () => {
		this.setState({
			searchInputValue: '',
		});
	};

	getDefaultGroups() {
		return this.props.groups.map(group => (
			<SearchResult
				key={group.groupId}
				groupId={group.groupId}
				kind={group.kind}
				name={group.name}
				avatar={<Avatar group={group} size="40px" />}
				membershipKind={group.membershipKind}
				relationshipKind={group.relationshipKind}
				onGetStartedClick={this.handleGetStarted}
				onRequestClick={this.redirectToGroup}
				onEditClick={this.redirectToGroup}
				onJoinGroupClick={this.redirectToGroup}
				onClaimGroupClick={this.handleClaimGroup}
				setModalState={this.setModalState}
				setSelectedGroupId={this.setSelectedGroupId}
				onGetStarted={this.handleGetStarted}
				toggle={this.toggle}
			/>
		));
	}

	getSearchResults = () => {
		let groups;
		if (this.props.groupSearchResults) {
			groups = this.props.groupSearchResults.map(group => (
				<SearchResult
					key={group.groupId}
					groupId={group.groupId}
					kind={group.kind}
					name={group.name}
					avatar={<Avatar group={group} size="40px" />}
					membershipKind={group.membershipKind}
					relationshipKind={group.relationshipKind}
					onGetStartedClick={this.handleGetStarted}
					onRequestClick={this.redirectToGroup}
					onEditClick={this.handleEdit}
					onJoinGroupClick={this.joinGroup}
					onClaimGroupClick={this.handleClaimGroup}
					setModalState={this.setModalState}
					setSelectedGroupId={this.setSelectedGroupId}
					onGetStarted={this.handleGetStarted}
					toggle={this.toggle}
				/>
			));
		} else {
			groups = this.getDefaultGroups();
		}
		return groups;
	};

	toggleCreateGroupState = () => {
		this.setState(({ isCreateGroupOpen }) => ({ isCreateGroupOpen: !isCreateGroupOpen }));
	};

	openCreateGroup = () => {
		this.setState({ isCreateGroupOpen: true });
	};

	closeCreateGroup = () => {
		this.setState({ isCreateGroupOpen: false });
	};

	toggle = () => {
		this.props.onChangeModalState();
	};

	setModalState = state => {
		this.setState({ modalContent: state });
	};

	setSelectedGroupId = id => {
		this.setState({ selectedGroupId: id });
	};

	resetModalState = () => {
		this.setState({ modalContent: 'main' });
	};

	joinGroup = groupId => {
		this.setModalState('main');
		window.open(`https://www.faithlife.com/${groupId}`, 'noopener, noreferrer');
	};

	redirectToGroup = () => {
		this.setModalState('main');
		window.open(`https://www.faithlife.com/${this.state.selectedGroupId}`, 'noopener, noreferrer');
	};

	handleChurchNameInputChange = event => {
		this.setState({ newChurchName: event.target.value });
	};

	handleChurchLocationInputChange = event => {
		this.setState({ newChurchLocation: event.target.value });
	};

	handleSearchInput = event => {
		this.setState({
			searchInputValue: event.target.value,
			newChurchName: event.target.value,
		});
		if (
			event.target.value !== undefined &&
			event.target.value !== ' ' &&
			event.target.value !== ''
		) {
			this.props.executeSearch(event.target.value);
		}
	};

	handleKeyPress = event => {
		if (event.key === 'Enter') {
			if (
				event.target.value !== undefined &&
				event.target.value !== ' ' &&
				event.target.value !== ''
			) {
				this.props.executeSearch(this.state.searchInputValue);
			}
		}
	};

	handleGetStarted = groupId => {
		this.props.onGetStartedClick(groupId);
	};

	handleClaimGroup = groupId => {
		this.props.onClaimGroupClick(groupId);
	};

	handleClick = event => {
		if (this.createGroupPopupRef.current) {
			if (this.createGroupPopupRef.current.contains(event.target)) {
				return;
			}
		}
		this.closeCreateGroup();
	};

	render() {
		return (
			<Styled.GroupSelectorModal
				isOpen={this.props.isOpen}
				title={''}
				onClose={this.toggle}
				scrollContent={false}
				showHeaderBorder={false}
				footerProps={{}}
			>
				<Styled.GroupSelectorModalBody>
					{this.state.modalContent === 'main' && (
						<Styled.MainModalContent>
							<Styled.ModalTitle>Find Your Church</Styled.ModalTitle>
							<Styled.ModalSubtitle>in the Faithlife Church Directory</Styled.ModalSubtitle>
							{this.props.showAlert && (
								<Styled.ModalAlert color="primary">{this.props.alertText}</Styled.ModalAlert>
							)}
							<Styled.SearchInputGroup>
								<Styled.SearchInput
									placeholder="Your church name and city"
									value={this.state.searchInputValue}
									onChange={this.handleSearchInput}
									onKeyPress={this.handleKeyPress}
									style={{ borderRadius: 3 }}
								/>
							</Styled.SearchInputGroup>
							<Styled.SearchResultsContainer>
								{this.getSearchResults()}
							</Styled.SearchResultsContainer>
							<Styled.CreateGroupWrapper
								position={this.state.isCreateGroupOpen ? '-14%' : '-3%'}
								innerRef={this.createGroupPopupRef}
								onClick={this.openCreateGroup}
							>
								<CreateGroup
									onClick={this.toggleCreateGroupState}
									isCreateGroupOpen={this.state.isCreateGroupOpen}
									searchInputValue={this.state.searchInputValue}
									onCreateGroup={this.createGroupClick}
									onChurchNameInputChange={this.handleChurchNameInputChange}
									onChurchLocationInputChange={this.handleChurchLocationInputChange}
									newChurchName={this.state.newChurchName}
									newChurchLocation={this.state.newChurchLocation}
									openCreateGroup={this.openCreateGroup}
								/>
							</Styled.CreateGroupWrapper>
						</Styled.MainModalContent>
					)}
					{this.state.modalContent === 'admin' && (
						<div>
							<Styled.SecondaryModalContent>
								<Styled.SecondaryModalText>
									<Styled.SearchResultBoldText>Admin</Styled.SearchResultBoldText>
									<span> membership is neccessarry to perform this action.</span>
								</Styled.SecondaryModalText>
								<Styled.SecondaryModalText>
									Contact a group administrator to request Admin membership
								</Styled.SecondaryModalText>
								<Styled.SecondaryModalButtonContainer>
									<Button color="primary" onClick={this.redirectToGroup}>
										Continue
									</Button>
								</Styled.SecondaryModalButtonContainer>
								<Styled.SecondaryModalButtonContainer>
									<Button onClick={this.resetModalState}>Cancel</Button>
								</Styled.SecondaryModalButtonContainer>
							</Styled.SecondaryModalContent>
						</div>
					)}
					{this.state.modalContent === 'change' && (
						<div>
							<Styled.SecondaryModalContent>
								<Styled.SecondaryModalText>
									This group type must be set to{' '}
									<Styled.SearchResultBoldText>"Church"</Styled.SearchResultBoldText>
								</Styled.SecondaryModalText>
								<Styled.SecondaryModalText>
									Visit the group settings page to change
								</Styled.SecondaryModalText>
								<Styled.SecondaryModalButtonContainer>
									<Button color="primary" onClick={this.redirectToGroup}>
										Change to Church
									</Button>
								</Styled.SecondaryModalButtonContainer>
								<Styled.SecondaryModalButtonContainer>
									<Button onClick={this.resetModalState}>Cancel</Button>
								</Styled.SecondaryModalButtonContainer>
							</Styled.SecondaryModalContent>
						</div>
					)}
				</Styled.GroupSelectorModalBody>
			</Styled.GroupSelectorModal>
		);
	}
}
