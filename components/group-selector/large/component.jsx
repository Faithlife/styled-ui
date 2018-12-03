import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../main';
import { SimpleModal } from '../../simple-modal';
import * as Styled from '../styled';
import { SearchResult } from './search-result';
import { CreateGroup } from './create-group';

const defaultResultsTopMargin = -64;

/** Large group selector for searching Faithlife groups. Can be displayed inline or inside a modal. */
export class LargeGroupSelector extends React.Component {
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
		/** Whether or not to show the group selector in place */
		showInPlace: PropTypes.bool,
		/** Whether or not to show the "Find Your Church in the Faithlife Group Directory" title */
		hideTitle: PropTypes.bool,
	};

	constructor(props) {
		super(props);

		this.searchResultsRef = React.createRef();
		this.fixedCreateWrapper = false;

		this.state = {
			searchInputValue: '',
			newChurchName: '',
			newChurchLocation: '',
			modalContent: 'main',
			selectedGroupId: -1,
			createGroupFixed: false,
			resultsTopMargin: props.showInPlace ? 0 : defaultResultsTopMargin,
			scrollWidthDelta: 0,
		};
	}

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
			resultsTopMargin: this.props.showInPlace ? 0 : defaultResultsTopMargin,
			modalContent: 'main',
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

	handleScroll = scrollData => {
		if (this.props.showInPlace) return;

		if (scrollData.topPosition >= 82 && !this.fixedCreateWrapper) {
			this.setState({
				createGroupFixed: true,
				resultsTopMargin: 232,
			});
			this.fixedCreateWrapper = true;
		} else if (scrollData.topPosition < 82) {
			this.setState({
				createGroupFixed: false,
				resultsTopMargin: defaultResultsTopMargin + scrollData.topPosition,
			});
			this.fixedCreateWrapper = false;
		}
	};

	render() {
		const disableButton = this.state.newChurchName === '' || this.state.newChurchLocation === '';

		const mainView = (
			<Styled.LargeScrollView
				horizontal={false}
				contentClassName={Styled.LargeScrollViewContentClass}
				onScroll={this.handleScroll}
				showInPlace={this.props.showInPlace}
				hideTitle={this.props.hideTitle}
				verticalScrollbarStyle={{
					borderRadius: '6px',
					marginTop: '1px',
					marginBottom: '1px',
				}}
			>
				{!this.props.hideTitle && (
					<div>
						<Styled.LargeTopGradient />
						<Styled.LargeTitle>Find Your Church</Styled.LargeTitle>
						<Styled.LargeSubtitle>in the Faithlife Church Directory</Styled.LargeSubtitle>
					</div>
				)}
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
							<Styled.CreateGroupButtonText>Don't see your church?</Styled.CreateGroupButtonText>
							<Button small primary disabled={disableButton} onClick={this.createGroupClick}>
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
			</Styled.LargeScrollView>
		);

		const secondaryModalOpen =
			this.state.modalContent === 'admin' || this.state.modalContent === 'change';

		return (
			<Styled.LargeGroupSelector>
				{this.props.showInPlace && mainView}
				<SimpleModal
					isOpen={
						(!this.props.showInPlace && this.props.isOpen) ||
						(this.props.showInPlace && secondaryModalOpen)
					}
					onClose={this.toggle}
					theme={{ background: 'transparent' }}
				>
					{this.state.modalContent === 'main' && !this.props.showInPlace && mainView}
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
									<Button small primary onClick={this.redirectToGroup}>
										Request access
									</Button>
								</Styled.SecondaryModalButtonWrapper>
								<Button small onClick={this.resetModalState}>
									Cancel
								</Button>
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
									<Button small primary onClick={this.redirectToGroup}>
										Change to Church
									</Button>
								</Styled.SecondaryModalButtonWrapper>
								<Button small onClick={this.resetModalState}>
									Cancel
								</Button>
							</Styled.SecondaryModalButtonContainer>
						</Styled.SecondaryModalContent>
					)}
				</SimpleModal>
			</Styled.LargeGroupSelector>
		);
	}
}
