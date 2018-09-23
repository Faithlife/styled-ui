import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../main.js';
import { SimpleModal } from '../../simple-modal/component.jsx';
import * as Styled from '../styled.jsx';
import { SearchResult } from './search-result.jsx';
import { CreateGroup } from './create-group.jsx';

const defaultResultsTopMargin = -64;

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

	state = {
		searchInputValue: '',
		newChurchName: '',
		newChurchLocation: '',
		modalContent: 'main',
		selectedGroupId: -1,
		createGroupFixed: false,
		resultsTopMargin: defaultResultsTopMargin,
		scrollWidthDelta: 0,
	};

	modalRef = React.createRef();
	searchResultsRef = React.createRef();
	fixedCreateWrapper = false;

	componentDidMount = () => {
		window.addEventListener('scroll', this.handleScroll, true);
	};

	componentWillUnmount = () => {
		window.removeEventListener('scroll', this.handleScroll, true);
	};

	createGroupClick = () => {
		this.toggle();
		this.props.onCreateGroup(this.state.newChurchName, this.state.newChurchLocation);
	};

	getDefaultGroups() {
		return this.props.groups.map(group => (
			<SearchResult
				key={group.groupId}
				groupId={group.groupId}
				kind={group.kind}
				name={group.name}
				avatarUrl={group.avatarUrl}
				membershipKind={group.membershipKind}
				relationshipKind={group.relationshipKind}
				onGetStartedClick={this.handleGetStarted}
				onRequestClick={this.props.onAdminRequestClick}
				onEditClick={this.redirectToGroup}
				onJoinGroupClick={this.props.onJoinGroupClick}
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
					avatarUrl={group.avatarUrl}
					membershipKind={group.membershipKind}
					relationshipKind={group.relationshipKind}
					claimable={group.claimable}
					onGetStartedClick={this.handleGetStarted}
					onRequestClick={this.props.onAdminRequestClick}
					onEditClick={this.redirectToGroup}
					onJoinGroupClick={this.props.onJoinGroupClick}
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

	toggle = () => {
		this.setState({
			createGroupFixed: false,
			resultsTopMargin: defaultResultsTopMargin,
		});

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

	redirectToGroup = () => {
		this.setModalState('main');
		window.open(`https://faithlife.com/${this.state.selectedGroupId}`, 'noopener, noreferrer');
	};

	handleChurchNameInputChange = event => {
		this.setState({ newChurchName: event.target.value });
		this.handleSearchInput(event);
	};

	handleChurchLocationInputChange = event => {
		this.setState({ newChurchLocation: event.target.value });
		this.handleSearchInput(event);
	};

	handleSearchInput = event => {
		this.setState({
			searchInputValue: event.target.value,
		});
		if (event.target.value !== undefined && event.target.value !== ' ') {
			this.props.onSearchInputChange(event.target.value);
		}
	};

	handleKeyPress = event => {
		if (event.key === 'Enter') {
			if (event.target.value !== undefined && event.target.value !== ' ') {
				this.props.onSearchInputChange(this.state.searchInputValue);
			}
		}
	};

	handleGetStarted = groupId => {
		this.props.onGetStartedClick(groupId);
	};

	handleClaimGroup = groupId => {
		this.props.onClaimGroupClick(groupId);
	};

	handleScroll = event => {
		if (this.modalRef.current) {
			const element = event.target;
			if (this.modalRef.current.contains(element)) {
				if (element.scrollTop >= 82 && !this.fixedCreateWrapper) {
					this.setState({
						createGroupFixed: true,
						resultsTopMargin: 232,
						scrollWidthDelta: element.offsetWidth - element.clientWidth,
					});
					this.fixedCreateWrapper = true;
				} else if (element.scrollTop < 82) {
					this.setState({
						createGroupFixed: false,
						resultsTopMargin: defaultResultsTopMargin + element.scrollTop,
						scrollWidthDelta: 0,
					});
					this.fixedCreateWrapper = false;
				}
			}
		}
	};

	render() {
		const disableButton = this.state.newChurchName === '' || this.state.newChurchLocation === '';

		return (
			<Styled.GroupSelectorModal>
				<SimpleModal isOpen={this.props.isOpen} onClose={this.toggle}>
					<Styled.GroupSelectorModalBody innerRef={this.modalRef}>
						{this.state.modalContent === 'main' && (
							<Styled.MainModalContent>
								<Styled.ModalTopGradient />
								<Styled.ModalTitle>Find Your Church</Styled.ModalTitle>
								<Styled.ModalSubtitle>in the Faithlife Church Directory</Styled.ModalSubtitle>
								<Styled.CreateGroupWrapper fixed={this.state.createGroupFixed}>
									<Styled.CreateGroupBackground scrollWidthDelta={this.state.scrollWidthDelta}>
										<CreateGroup
											onChurchNameInputChange={this.handleChurchNameInputChange}
											onChurchLocationInputChange={this.handleChurchLocationInputChange}
											newChurchName={this.state.newChurchName}
											newChurchLocation={this.state.newChurchLocation}
											showRequiredStars={this.state.createGroupFixed}
										/>
										<Styled.CreateGroupButtonWrapper>
											<Styled.CreateGroupButtonText>
												Don't see your church?
											</Styled.CreateGroupButtonText>
											<Button
												small
												primary
												disabled={disableButton}
												onClick={this.createGroupClick}
											>
												Create
											</Button>
										</Styled.CreateGroupButtonWrapper>
									</Styled.CreateGroupBackground>
								</Styled.CreateGroupWrapper>
								<Styled.SearchResultsContainer
									style={{ marginTop: this.state.resultsTopMargin }}
									fixed={this.state.createGroupFixed}
									innerRef={this.searchResultsRef}
								>
									{this.getSearchResults()}
								</Styled.SearchResultsContainer>
							</Styled.MainModalContent>
						)}
						{this.state.modalContent === 'admin' && (
							<Styled.SecondaryModalContent>
								<Styled.SecondaryModalText>
									<Styled.SearchResultBoldText>Admin</Styled.SearchResultBoldText>
									<span> membership is neccessarry to perform this action.</span>
								</Styled.SecondaryModalText>
								<Styled.SecondaryModalText>
									Contact a group administrator to request Admin membership
								</Styled.SecondaryModalText>
								<Styled.SecondaryModalButtonContainer>
									<Styled.SecondaryModalButtonWrapper>
										<Button primary onClick={this.redirectToGroup}>
											Request access
										</Button>
									</Styled.SecondaryModalButtonWrapper>
									<Button onClick={this.resetModalState}>Cancel</Button>
								</Styled.SecondaryModalButtonContainer>
							</Styled.SecondaryModalContent>
						)}
						{this.state.modalContent === 'change' && (
							<Styled.SecondaryModalContent>
								<Styled.SecondaryModalText>
									This group type must be set to{' '}
									<Styled.SearchResultBoldText>"Church"</Styled.SearchResultBoldText>
								</Styled.SecondaryModalText>
								<Styled.SecondaryModalText>
									Visit the group settings page to change
								</Styled.SecondaryModalText>
								<Styled.SecondaryModalButtonContainer>
									<Styled.SecondaryModalButtonWrapper>
										<Button primary onClick={this.redirectToGroup}>
											Change to Church
										</Button>
									</Styled.SecondaryModalButtonWrapper>
									<Button onClick={this.resetModalState}>Cancel</Button>
								</Styled.SecondaryModalButtonContainer>
							</Styled.SecondaryModalContent>
						)}
					</Styled.GroupSelectorModalBody>
				</SimpleModal>
			</Styled.GroupSelectorModal>
		);
	}
}
