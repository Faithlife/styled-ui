import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../button';
import { Modal, CloseButton } from '../../modal';
import { Text } from '../../Text';
import { Paragraph } from '../../Paragraph';
import * as Styled from '../styled';
import { SearchResult } from './search-result';
import { CreateGroup } from './create-group';

const defaultResultsTopMargin = 0;

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
		/** Array of membership levels allowed to "Select" group. Defaults to Admin only */
		authorizedMembershipLevels: PropTypes.arrayOf(PropTypes.string),
		/** Array of group kinds user is allowed to "Select". Defaults to 'church' only */
		authorizedGroupKinds: PropTypes.arrayOf(PropTypes.string),
		/** Flag to use "Select"/"Request" button style instead of "Get Started"/"Join"/"Follow"/"Claim" */
		useSelectRequestButtonStyle: PropTypes.bool,
		/** Style overrides, the z-index is applied to the backdrop of the modal */
		styleOverrides: PropTypes.shape({
			modalZIndex: PropTypes.number,
			tooltipMargin: PropTypes.string,
		}),
		/** String literals to overload UI elements and for localization */
		localizedResources: PropTypes.shape({
			title: PropTypes.string,
			subTitle: PropTypes.string,
			requestButtonText: PropTypes.string,
			joinButtonText: PropTypes.string,
			claimButtonText: PropTypes.string,
			selectButtonText: PropTypes.string,
			dontSeeChurchText: PropTypes.string,
			goToGroupButtonText: PropTypes.string,
			churchNameText: PropTypes.string,
			churchLocationText: PropTypes.string,
			churchLocationPlaceholder: PropTypes.string,
		}),
	};

	static defaultProps = {
		authorizedMembershipLevels: ['admin'],
		authorizedGroupKinds: ['church'],
		localizedResources: {
			title: 'Find Your Church',
			subTitle: 'in the Faithlife Church Directory',
			requestButtonText: 'Request Admin',
			joinButtonText: 'Join Group',
			claimButtonText: 'Claim',
			selectButtonText: 'Get Started',
			dontSeeChurchText: 'Don’t see your church?',
			goToGroupButtonText: 'Request Access',
			churchNameText: 'Church Name',
			churchLocationText: 'Church Location',
			churchLocationPlaceholder: 'City, State',
		},
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

	componentDidMount() {
		if (this.props.showInPlace) {
			const scrollableNode = getScrollParent(this.nodeRef.current);
			scrollableNode.addEventListener('scroll', this.handleScroll);
		}
	}

	componentWillUnmount() {
		const scrollableNode = getScrollParent(this.nodeRef.current);
		scrollableNode.removeEventListener('scroll', this.handleScroll);
	}

	nodeRef = React.createRef();
	searchResultsRef = React.createRef();
	fixedCreateWrapper = false;

	createGroupClick = () => {
		this.toggle();
		this.props.onCreateGroup(this.state.newChurchName, this.state.newChurchLocation);
	};

	getSearchResults = () => {
		const {
			groupSearchResults,
			authorizedMembershipLevels,
			authorizedGroupKinds,
			onAdminRequestClick,
			onJoinGroupClick,
			styleOverrides,
			localizedResources,
		} = this.props;
		let groups;
		const groupResults = groupSearchResults || groups;

		const formattedMembershiplevels = formatStringList(authorizedMembershipLevels);
		const formattedGroupLevels = formatStringList(authorizedGroupKinds);

		if (groupResults) {
			groups = groupResults.map(group => (
				<SearchResult
					key={group.groupId}
					groupId={group.groupId}
					kind={group.kind}
					name={group.name}
					avatarUrl={group.avatarUrl}
					membershipKind={group.membershipKind}
					relationshipKind={group.relationshipKind}
					authorizedMembershipLevels={authorizedMembershipLevels}
					authorizedGroupKinds={authorizedGroupKinds}
					localizedResources={localizedResources}
					claimable={group.claimable}
					joinable={group.joinable}
					onGetStartedClick={this.handleGetStarted}
					onRequestClick={onAdminRequestClick}
					onEditClick={this.redirectToGroup}
					onJoinGroupClick={onJoinGroupClick}
					onClaimGroupClick={this.handleClaimGroup}
					setModalState={this.setModalState}
					setSelectedGroupId={this.setSelectedGroupId}
					onGetStarted={this.handleGetStarted}
					toggle={this.toggle}
					formattedMembershiplevels={formattedMembershiplevels}
					formattedGroupLevels={formattedGroupLevels}
					styleOverrides={styleOverrides}
				/>
			));
		}
		return groups;
	};

	toggle = () => {
		this.setState({
			createGroupFixed: false,
			resultsTopMargin: defaultResultsTopMargin,
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
		window.open(
			`https://faithlife.com/${this.state.selectedGroupId}/about`,
			'noopener, noreferrer',
		);
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
		if (this.state.fixedCreateWrapper) {
			return;
		}

		const { showInPlace, groupSearchResults } = this.props;

		const scrollTopPosition =
			showInPlace && scrollData.srcElement
				? scrollData.srcElement.scrollingElement.scrollTop
				: scrollData.topPosition;

		const groupResultsCount = groupSearchResults ? groupSearchResults.length : 99;

		if (scrollTopPosition >= 82 || groupResultsCount < 4) {
			this.setState({
				createGroupFixed: !showInPlace,
				resultsTopMargin: showInPlace ? 0 : 150,
				fixedCreateWrapper: true,
			});
		} else if (scrollTopPosition < 82) {
			this.setState({
				createGroupFixed: false,
				resultsTopMargin: defaultResultsTopMargin + scrollTopPosition,
				fixedCreateWrapper: false,
			});
		}
	};

	render() {
		const {
			authorizedMembershipLevels,
			authorizedGroupKinds,
			showInPlace,
			hideTitle,
			isOpen,
			styleOverrides,
			localizedResources,
		} = this.props;

		const {
			newChurchName,
			newChurchLocation,
			createGroupFixed,
			scrollWidthDelta,
			resultsTopMargin,
			modalContent,
		} = this.state;

		const disableButton = newChurchName === '' || newChurchLocation === '';

		const formattedMembershiplevels = formatStringList(authorizedMembershipLevels);
		const formattedGroupLevels = formatStringList(authorizedGroupKinds);

		const mainView = (
			<Styled.LargeScrollView
				horizontal={false}
				contentClassName={Styled.LargeScrollViewContentClass}
				onScroll={!showInPlace && this.handleScroll}
				showInPlace={showInPlace}
				hideTitle={hideTitle}
				verticalScrollbarStyle={{
					borderRadius: '6px',
					marginTop: '1px',
					marginBottom: '1px',
				}}
			>
				{!hideTitle && (
					<div>
						<Styled.LargeTopGradient />
						<Styled.LargeTitle>{localizedResources.title}</Styled.LargeTitle>
						<Styled.LargeSubtitle>{localizedResources.subTitle}</Styled.LargeSubtitle>
					</div>
				)}
				<Styled.CreateGroupWrapper fixed={createGroupFixed}>
					<Styled.CreateGroupBackground scrollWidthDelta={scrollWidthDelta}>
						<CreateGroup
							showInPlace={showInPlace}
							onChurchNameInputChange={this.handleChurchNameInputChange}
							onChurchLocationInputChange={this.handleChurchLocationInputChange}
							newChurchName={newChurchName}
							newChurchLocation={newChurchLocation}
							showRequiredStars={true}
							localizedResources={localizedResources}
						/>
						<Styled.CreateGroupButtonWrapper>
							<Styled.CreateGroupButtonText>
								{localizedResources.dontSeeChurchText}
							</Styled.CreateGroupButtonText>
							<Button
								size="small"
								variant="primary"
								disabled={disableButton}
								onClick={this.createGroupClick}
							>
								Create
							</Button>
						</Styled.CreateGroupButtonWrapper>
					</Styled.CreateGroupBackground>
				</Styled.CreateGroupWrapper>
				<Styled.SearchResultsContainer
					style={{ marginTop: resultsTopMargin }}
					fixed={createGroupFixed}
					ref={this.searchResultsRef}
				>
					{this.getSearchResults()}
				</Styled.SearchResultsContainer>
			</Styled.LargeScrollView>
		);

		const secondaryModalOpen = modalContent === 'admin' || modalContent === 'change';

		return (
			<Styled.LargeGroupSelector ref={this.nodeRef}>
				{showInPlace && mainView}
				<Modal
					container="body"
					isOpen={(!showInPlace && isOpen) || (showInPlace && secondaryModalOpen) || false}
					onClose={this.toggle}
					theme={{ background: 'transparent' }}
					zIndex={styleOverrides && styleOverrides.modalZIndex ? styleOverrides.modalZIndex : 1050}
					position="relative"
				>
					{modalContent === 'main' && <CloseButton onClose={this.toggle} />}
					{modalContent === 'main' && !showInPlace && mainView}
					{modalContent === 'admin' && (
						<>
							<Modal.Header title="Group Membership Required" />
							<Modal.Content width={['100vw', 375]}>
								<Text display="inline-block">
									<Text color="flGray" fontWeight="bold">
										{formattedMembershiplevels}
									</Text>
									<span> membership is necessary to perform this action.</span>
								</Text>
								<Text>Contact a group administrator to request access.</Text>
							</Modal.Content>
							<Modal.Footer>
								<Modal.FooterButtons
									cancelButton={{ onClick: this.resetModalState, text: 'Cancel' }}
									commitButton={{
										onClick: this.redirectToGroup,
										text: localizedResources.goToGroupButtonText,
									}}
								/>
							</Modal.Footer>
						</>
					)}
					{modalContent === 'change' && (
						<>
							<Modal.Header title="" />
							<Modal.Content width={['100vw', 375]}>
								<Paragraph>
									This group type must be set to{' '}
									<Text color="flGray" fontWeight="bold">
										{formattedGroupLevels}
									</Text>
									.
								</Paragraph>
								<Paragraph>Visit the group settings page to change.</Paragraph>
							</Modal.Content>
							<Modal.Footer>
								<Modal.FooterButtons
									cancelButton={{ onClick: this.resetModalState, text: 'Cancel' }}
									commitButton={{
										onClick: this.redirectToGroup,
										text: `Edit group type`,
									}}
								/>
							</Modal.Footer>
						</>
					)}
				</Modal>
			</Styled.LargeGroupSelector>
		);
	}
}

const formatStringList = arrayOfStrings => {
	const result =
		arrayOfStrings.length === 1
			? arrayOfStrings[0]
			: [arrayOfStrings.slice(0, -1).join(', '), arrayOfStrings.slice(-1)[0]].join(
					arrayOfStrings.length < 2 ? '' : ' or ',
			  );
	return result.charAt(0).toUpperCase() + result.slice(1);
};

// Adapted from JQuery's getScrollParent method
const getScrollParent = (element, includeHidden) => {
	let style = getComputedStyle(element);
	const excludeStaticParent = style.position === 'absolute';
	const overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

	if (style.position === 'fixed') {
		return document.body;
	}

	let parent = element;
	while ((parent = parent.parentElement)) {
		style = getComputedStyle(parent);
		if (excludeStaticParent && style.position === 'static') {
			continue;
		}
		if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
			return parent;
		}
	}

	return window;
};
