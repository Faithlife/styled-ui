import React from 'react';
import PropTypes from 'prop-types';
import { Bootstrap } from '../../../components/main.js';
import * as Styled from '../styled.jsx';
import icons from '../icons';
import SearchResult from './search-result.jsx';
import CreateGroup from './create-group.jsx';

const { Modal, ModalBody, Button } = Bootstrap;
const storedIcons = new Map();

export default class GroupSelectorModal extends React.Component {
	static propTypes = {
		changeModalState: PropTypes.func.isRequired,
		isOpen: PropTypes.bool.isRequired,
		executeSearch: PropTypes.func.isRequired,
		onCreateGroup: PropTypes.func.isRequired,
		groups: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				groupId: PropTypes.number.isRequired,
				kind: PropTypes.string.isRequired,
				avatarUrl: PropTypes.string,
				membershipKind: PropTypes.string,
				relationshipKind: PropTypes.string,
			}),
		).isRequired,
		searchedGroups: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				groupId: PropTypes.number.isRequired,
				kind: PropTypes.string.isRequired,
				avatarUrl: PropTypes.string,
				membershipKind: PropTypes.string,
				relationshipKind: PropTypes.string,
			}),
		),
		handleCreateGroup: PropTypes.func.isRequired,
		handleGetStartedClick: PropTypes.func.isRequired,
		handleRequestClick: PropTypes.func.isRequired,
		handleEditClick: PropTypes.func.isRequired,
		handleJoinGroupClick: PropTypes.func.isRequired,
	};

	state = {
		searchInputValue: '',
		isCreateGroupFocused: false,
		modalContent: 'main',
	};

	clearSearchInput = () => {
		this.setState({
			searchInputValue: '',
		});
		this.executeSearch(this.state.searchInputValue);
	};
	makeStoredIcon = group => {
		const value =
			icons[`${group.kind.charAt(0).toUpperCase()}${group.kind.slice(1)}`] || icons.General;
		storedIcons.set(group.kind, value);
		return value;
	};
	getIcon = group => {
		if (group.avatarUrl) {
			return (
				<img
					style={{ borderRadius: '3px', width: '40px', height: '40px' }}
					src={group.avatarUrl}
					alt={group.name}
				/>
			);
		}

		const Icon = (storedIcons || []).get(group.kind) || this.makeStoredIcon(group);

		return (
			<Icon style={{ borderRadius: '3px', width: '40px', height: '40px' }} viewBox="0 0 76 76" />
		);
	};

	getDefaultGroups() {
		return this.props.groups.map(group => (
			<SearchResult
				key={group.groupId}
				groupId={group.groupId}
				kind={group.kind}
				name={group.name}
				avatar={this.getIcon(group)}
				membershipKind={group.membershipKind}
				relationshipKind={group.relationshipKind}
				handleGetStartedClick={this.handleGetStarted}
				handleRequestClick={this.handleRequest}
				handleEditClick={this.handleEdit}
				handleJoinGroupClick={this.handleJoinGroup}
			/>
		));
	}

	getSearchResults = () => {
		let groups;
		if (this.props.searchedGroups) {
			groups = this.props.searchedGroups.map(group => (
				<SearchResult
					key={group.groupId}
					groupId={group.groupId}
					kind={group.kind}
					name={group.name}
					avatar={this.getIcon(group)}
					membershipKind={group.membershipKind}
					relationshipKind={group.relationshipKind}
					handleGetStartedClick={this.handleGetStarted}
					handleRequestClick={this.handleRequest}
					handleEditClick={this.handleEdit}
					handleJoinGroupClick={this.handleJoinGroup}
				/>
			));
		} else {
			groups = this.getDefaultGroups();
		}
		return groups;
	};

	changeCreateGroupState = () => {
		this.setState(({ isCreateGroupFocused }) => ({ isCreateGroupFocused: !isCreateGroupFocused }));
	};

	setCreateGroupState = focused => {
		this.setState({ isCreateGroupFocused: focused });
	};

	hideCreateGroup = () => {
		this.setState({ isCreateGroupFocused: false });
	};

	toggle = () => {
		this.props.changeModalState();
	};

	handleSearchInput = event => {
		this.setState({
			searchInputValue: event.target.value,
		});
		this.props.executeSearch(this.state.searchInputValue);
	};

	handleKeyPress = event => {
		if (event.key === 'Enter') {
			this.props.executeSearch(this.state.searchInputValue);
		}
	};

	handleGetStarted = groupId => {
		this.props.handleGetStartedClick(groupId);
	};

	handleRequest = groupId => {
		this.setState({ modalContent: 'admin' });
		this.setState({ selectedGroupId: groupId });
	};

	handleEdit = groupId => {
		this.setState({ modalContent: 'change' });
		this.setState({ selectedGroupId: groupId });
	};

	handleJoinGroup = () => {
		this.props.handleJoinGroupClick(this.state.selectedGroupId);
	};

	handleCancel = () => {
		this.setState({ modalContent: 'main' });
	};

	render() {
		return (
			<Styled.GroupSelectorModalContainer>
				<Modal
					centered
					isOpen={this.props.isOpen}
					backdrop
					toggle={this.toggle}
					style={{ overflow: 'hidden' }}
				>
					<ModalBody style={{ overflow: 'hidden' }}>
						{this.state.modalContent === 'main' && (
							<div>
								<div onClick={this.hideCreateGroup}>
									<Styled.ModalCloseButtonContainer>
										<button color="link" onClick={this.toggle} style={{ border: 0 }}>
											<Styled.SearchGlassHasText />
										</button>
									</Styled.ModalCloseButtonContainer>
									<Styled.ModalTitle>Find Your Church</Styled.ModalTitle>
									<Styled.ModalSubtitle>in the Faithlife Church Directory</Styled.ModalSubtitle>
									<Styled.SearchInputGroup>
										<Styled.SearchInput
											placeholder="Your church name and city"
											value={this.state.searchInputValue}
											onChange={this.handleSearchInput}
											onKeyPress={this.handleKeyPress}
										/>
										<Styled.SearchInputAddon addonType="append">
											<button
												style={{ position: 'absolute', top: 6, right: 0, border: 0 }}
												color="link"
												onClick={this.clearSearchInput}
											>
												{this.state.searchInputValue ? (
													<Styled.SearchGlassHasText />
												) : (
													<Styled.SearchGlass />
												)}
											</button>
										</Styled.SearchInputAddon>
									</Styled.SearchInputGroup>
									<Styled.SearchResultsContainer>
										{this.getSearchResults()}
									</Styled.SearchResultsContainer>
								</div>
								<Styled.CreateGroupWrapper
									property={this.state.isCreateGroupFocused ? '0' : '-109px'}
								>
									<CreateGroup
										isCreateGroupFocused={this.state.isCreateGroupFocused}
										setCreateGroupFocused={this.setCreateGroupState}
										changeCreateGroupFocused={this.changeCreateGroupState}
										searchInputValue={this.state.searchInputValue}
										handleCreateGroup={this.props.handleCreateGroup}
									/>
								</Styled.CreateGroupWrapper>
							</div>
						)}
						{this.state.modalContent === 'admin' && (
							<div>
								<Styled.ModalCloseButtonContainer>
									<button color="link" onClick={this.handleCancel} style={{ border: 0 }}>
										<Styled.SearchGlassHasText />
									</button>
								</Styled.ModalCloseButtonContainer>
								<Styled.SecondaryModalContent>
									<Styled.SecondaryModalText>
										<Styled.SearchResultBoldText>Admin</Styled.SearchResultBoldText>
										<span> membership is neccessarry to perform this action.</span>
									</Styled.SecondaryModalText>
									<Styled.SecondaryModalText>
										Contact a group administrator to request Admin membership
									</Styled.SecondaryModalText>
									<Styled.SecondaryModalButtonContainer>
										<Button color="primary">Continue</Button>
									</Styled.SecondaryModalButtonContainer>
									<Styled.SecondaryModalButtonContainer>
										<Button onClick={this.handleCancel}>Cancel</Button>
									</Styled.SecondaryModalButtonContainer>
								</Styled.SecondaryModalContent>
							</div>
						)}
						{this.state.modalContent === 'change' && (
							<div>
								<Styled.ModalCloseButtonContainer>
									<button color="link" onClick={this.handleCancel} style={{ border: 0 }}>
										<Styled.SearchGlassHasText />
									</button>
								</Styled.ModalCloseButtonContainer>
								<Styled.SecondaryModalContent>
									<Styled.SecondaryModalText>
										This group type must be set to{' '}
										<Styled.SearchResultBoldText>"Church"</Styled.SearchResultBoldText>
									</Styled.SecondaryModalText>
									<Styled.SecondaryModalText>
										Visit the group settings page to change
									</Styled.SecondaryModalText>
									<Styled.SecondaryModalButtonContainer>
										<Button color="primary">Change to Church</Button>
									</Styled.SecondaryModalButtonContainer>
									<Styled.SecondaryModalButtonContainer>
										<Button onClick={this.handleCancel}>Cancel</Button>
									</Styled.SecondaryModalButtonContainer>
								</Styled.SecondaryModalContent>
							</div>
						)}
					</ModalBody>
				</Modal>
			</Styled.GroupSelectorModalContainer>
		);
	}
}
