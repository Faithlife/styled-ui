import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@faithlife/styled-ui/v6';
import { Tooltip } from '@faithlife/styled-ui';
import { Avatar } from '../avatar';
import * as Styled from '../styled';

/* eslint-disable react/jsx-no-literals */
export class SearchResult extends React.PureComponent {
	static propTypes = {
		groupId: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		kind: PropTypes.string,
		avatarUrl: PropTypes.string,
		membershipKind: PropTypes.string,
		relationshipKind: PropTypes.string,
		setModalState: PropTypes.func.isRequired,
		setSelectedGroupId: PropTypes.func.isRequired,
		onGetStarted: PropTypes.func.isRequired,
		onClaimGroupClick: PropTypes.func.isRequired,
		onJoinGroupClick: PropTypes.func.isRequired,
		toggle: PropTypes.func.isRequired,
		authorizedMembershipLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
		authorizedGroupKinds: PropTypes.arrayOf(PropTypes.string).isRequired,
		claimable: PropTypes.bool,
		joinable: PropTypes.bool,
		styleOverrides: PropTypes.shape({
			tooltipMargin: PropTypes.string,
		}),
		localizedResources: PropTypes.object,
	};

	static defaultProps = {
		joinable: true,
	};

	claimGroup = () => {
		this.props.onClaimGroupClick(this.props.groupId);
	};

	getStarted = () => {
		this.props.setModalState('main');
		this.props.toggle();
		this.props.onGetStarted(this.props.groupId);
	};

	requestAccess = () => {
		this.props.setModalState('admin');
		this.props.setSelectedGroupId(this.props.groupId);
	};

	editGroupType = () => {
		this.props.setModalState('change');
		this.props.setSelectedGroupId(this.props.groupId);
	};

	joinGroup = () => {
		this.props.setModalState('main');
		this.props.toggle();
		this.props.setSelectedGroupId(this.props.groupId);
		this.props.onJoinGroupClick(this.props.groupId);
		const { authorizedMembershipLevels } = this.props;
		const membershipKind = 'follower';
		if (!authorizedMembershipLevels.includes(membershipKind)) {
			this.requestAccess();
		}
	};

	changeFirstLetterCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	formatGroupKind = () => {
		let string = this.props.kind.replace(/([A-Z])/g, ' $1');
		string = string.charAt(0).toUpperCase() + string.slice(1);
		return string;
	};

	boldKeyword = (targetString, keyword) => {
		if (!targetString.includes(keyword)) {
			return targetString;
		} else {
			const stringPieces = targetString.split(keyword);
			return (
				<>
					{stringPieces[0]}
					<Styled.SearchResultBoldText>{keyword}</Styled.SearchResultBoldText>
					{stringPieces[1]}
				</>
			);
		}
	};

	highlightKeyword = (targetString, keyword) => {
		if (!targetString.includes(keyword)) {
			return targetString;
		} else {
			const stringPieces = targetString.split(keyword);
			return (
				<>
					{stringPieces[0]}
					<Styled.SearchResultHightlightText>{keyword}</Styled.SearchResultHightlightText>
					{stringPieces[1]}
				</>
			);
		}
	};

	render() {
		const {
			claimable,
			joinable,
			relationshipKind,
			membershipKind,
			kind,
			avatarUrl,
			name,
			authorizedMembershipLevels,
			authorizedGroupKinds,
			formattedMembershiplevels,
			formattedGroupLevels,
			styleOverrides,
			localizedResources,
		} = this.props;

		let message;
		let membershipLine;
		let button;

		if (claimable) {
			message = (
				<Tooltip
					content={
						<>
							<Styled.TooltipContentBlock>
								Claiming this group will make you the admin.
							</Styled.TooltipContentBlock>
							<Styled.TooltipContentBlock>
								You can invite others to the group, assign additional admins, and transfer admin
								permissions in the future.
							</Styled.TooltipContentBlock>
						</>
					}
					styleOverrides={{ margin: styleOverrides ? styleOverrides.tooltipMargin : null }}
				>
					<Styled.UnderlinedSearchResultMessage>
						This is an unclaimed group.
					</Styled.UnderlinedSearchResultMessage>
				</Tooltip>
			);
			button = (
				<Button size="small" variant="primary" onClick={this.claimGroup}>
					{localizedResources.claimButtonText}
				</Button>
			);
		} else if ((membershipKind === 'none' || !membershipKind) && joinable) {
			message = (
				<Styled.SearchResultMessage>
					{this.highlightKeyword(
						localizedResources.membershipRequiredTemplate.replace(
							'%membershipKinds%',
							formattedMembershiplevels
						),
						formattedMembershiplevels
					)}
				</Styled.SearchResultMessage>
			);
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					{this.highlightKeyword(localizedResources.notAMember, localizedResources.notText)}
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Button size="small" variant="primary" onClick={this.joinGroup}>
					{authorizedMembershipLevels.includes('follower')
						? localizedResources.selectButtonText
						: localizedResources.joinButtonText}
				</Button>
			);
		} else if ((membershipKind === 'none' || !membershipKind) && !joinable) {
			message = (
				<Styled.SearchResultMessage>
					{this.highlightKeyword(
						localizedResources.membershipRequiredTemplate.replace(
							'%membershipKinds%',
							formattedMembershiplevels
						),
						formattedMembershiplevels
					)}
				</Styled.SearchResultMessage>
			);
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					{this.highlightKeyword(localizedResources.notAMember, localizedResources.notText)}
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Button size="small" variant="primary" onClick={this.requestAccess}>
					{localizedResources.requestButtonText}
				</Button>
			);
		} else if (
			!authorizedMembershipLevels.includes(membershipKind) &&
			relationshipKind === 'participant'
		) {
			message = (
				<Styled.SearchResultMessage>
					{this.highlightKeyword(
						localizedResources.membershipRequiredTemplate.replace(
							'%membershipKinds%',
							formattedMembershiplevels
						),
						formattedMembershiplevels
					)}
				</Styled.SearchResultMessage>
			);

			// observer is an obsolete membership kind
			membershipLine = (membershipKind => {
				let membershipMessage;
				switch (membershipKind) {
					case 'admin':
						membershipMessage = this.boldKeyword(
							localizedResources.isAnAdmin,
							localizedResources.adminText
						);
						break;
					case 'observer':
						membershipMessage = this.boldKeyword(
							localizedResources.isAnObserver,
							localizedResources.observerText
						);
						break;
					case 'moderator':
						membershipMessage = this.boldKeyword(
							localizedResources.isAModerator,
							localizedResources.moderatorText
						);
						break;
					case 'member':
						membershipMessage = this.boldKeyword(
							localizedResources.isAMember,
							localizedResources.memberText
						);
						break;
					case 'follower':
						membershipMessage = this.boldKeyword(
							localizedResources.isAFollower,
							localizedResources.followerText
						);
						break;
					case 'invited':
						membershipMessage = this.boldKeyword(
							localizedResources.isInvited,
							localizedResources.invitedText
						);
						break;
				}
				return (
					<Styled.SearchResultMembershipLine>{membershipMessage}</Styled.SearchResultMembershipLine>
				);
			})(membershipKind);
			button = (
				<Button size="small" variant="primary" onClick={this.requestAccess}>
					{localizedResources.requestButtonText}
				</Button>
			);
		} else if (!authorizedGroupKinds.includes(kind.toLowerCase()) && membershipKind === 'admin') {
			message = (
				<Styled.SearchResultMessage>
					{'Group must be a '}
					<Styled.SearchResultHightlightText>
						{formattedGroupLevels}
					</Styled.SearchResultHightlightText>
				</Styled.SearchResultMessage>
			);
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					{this.boldKeyword(localizedResources.isAnAdmin, localizedResources.adminText)}
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Button size="small" variant="primary" onClick={this.editGroupType}>
					Edit
				</Button>
			);
		} else if (relationshipKind === 'none' && joinable) {
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					{this.highlightKeyword(localizedResources.notAMember, localizedResources.notText)}
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Button size="small" variant="primary" onClick={this.joinGroup}>
					{localizedResources.joinButtonText}
				</Button>
			);
		} else if (relationshipKind === 'none' && !joinable) {
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					{this.highlightKeyword(localizedResources.notAMember, localizedResources.notText)}
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Button size="small" variant="primary" onClick={this.requestAccess}>
					{localizedResources.requestButtonText}
				</Button>
			);
		} else {
			membershipLine = (membershipKind => {
				let membershipMessage;
				switch (membershipKind) {
					case 'admin':
						membershipMessage = this.boldKeyword(
							localizedResources.isAnAdmin,
							localizedResources.adminText
						);
						break;
					case 'observer':
						membershipMessage = this.boldKeyword(
							localizedResources.isAnObserver,
							localizedResources.observerText
						);
						break;
					case 'moderator':
						membershipMessage = this.boldKeyword(
							localizedResources.isAModerator,
							localizedResources.moderatorText
						);
						break;
					case 'member':
						membershipMessage = this.boldKeyword(
							localizedResources.isAMember,
							localizedResources.memberText
						);
						break;
					case 'follower':
						membershipMessage = this.boldKeyword(
							localizedResources.isAFollower,
							localizedResources.followerText
						);
						break;
					case 'invited':
						membershipMessage = this.boldKeyword(
							localizedResources.isInvited,
							localizedResources.invitedText
						);
						break;
				}
				return (
					<Styled.SearchResultMembershipLine>{membershipMessage}</Styled.SearchResultMembershipLine>
				);
			})(membershipKind);
			button = (
				<Button size="small" variant="secondary" onClick={this.getStarted}>
					{localizedResources.selectButtonText}
				</Button>
			);
		}

		return (
			<Styled.SearchResult>
				<Styled.SearchResultAvatar>
					<Avatar avatarUrl={avatarUrl} name={name} kind={kind} size={40} />
				</Styled.SearchResultAvatar>
				<Styled.SearchResultContent>
					<div>
						<Styled.SearchResultNameText>{name}</Styled.SearchResultNameText>
						<Styled.SearchResultGroupKind>{this.formatGroupKind()}</Styled.SearchResultGroupKind>
					</div>
					<Styled.SearchResultInfoButtonRow>
						<div>
							{membershipLine}
							{message}
						</div>
						{button}
					</Styled.SearchResultInfoButtonRow>
				</Styled.SearchResultContent>
			</Styled.SearchResult>
		);
	}
}
