import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../avatar';
import { Button } from '../../button';
import { Tooltip } from '../../popover';
import * as Styled from '../styled';

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
	};

	changeFirstLetterCase(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	formatGroupKind = () => {
		let string = this.props.kind.replace(/([A-Z])/g, ' $1');
		string = string.charAt(0).toUpperCase() + string.slice(1);
		return string;
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
					<Styled.SearchResultHightlightText>
						{formattedMembershiplevels}
					</Styled.SearchResultHightlightText>{' '}
					membership required.
				</Styled.SearchResultMessage>
			);
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					You are <Styled.SearchResultBoldText>not</Styled.SearchResultBoldText> a member.
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Button size="small" variant="primary" onClick={this.joinGroup}>
					{localizedResources.joinButtonText}
				</Button>
			);
		} else if ((membershipKind === 'none' || !membershipKind) && !joinable) {
			message = (
				<Styled.SearchResultMessage>
					<Styled.SearchResultHightlightText>
						{formattedMembershiplevels}
					</Styled.SearchResultHightlightText>{' '}
					membership required.
				</Styled.SearchResultMessage>
			);
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					You are <Styled.SearchResultBoldText>not</Styled.SearchResultBoldText> a member.
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
					<Styled.SearchResultHightlightText>
						{formattedMembershiplevels}
					</Styled.SearchResultHightlightText>{' '}
					membership required.
				</Styled.SearchResultMessage>
			);

			// observer is an obsolete membership kind
			membershipLine =
				membershipKind === 'admin' || membershipKind === 'observer' ? (
					<Styled.SearchResultMembershipLine>
						You are an <Styled.SearchResultBoldText>{membershipKind}</Styled.SearchResultBoldText>.
					</Styled.SearchResultMembershipLine>
				) : membershipKind === 'invited' ? (
					<Styled.SearchResultMembershipLine>
						You are <Styled.SearchResultBoldText>{membershipKind}</Styled.SearchResultBoldText>.
					</Styled.SearchResultMembershipLine>
				) : (
					<Styled.SearchResultMembershipLine>
						You are a <Styled.SearchResultBoldText>{membershipKind}</Styled.SearchResultBoldText>.
					</Styled.SearchResultMembershipLine>
				);
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
					You are an <Styled.SearchResultBoldText>Admin</Styled.SearchResultBoldText>.
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
					You are not a{' '}
					<Styled.SearchResultHightlightText>Member</Styled.SearchResultHightlightText>.
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
					You are not a{' '}
					<Styled.SearchResultHightlightText>Member</Styled.SearchResultHightlightText>.
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Button size="small" variant="primary" onClick={this.requestAccess}>
					{localizedResources.requestButtonText}
				</Button>
			);
		} else {
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					You are
					{/* observer is an obsolete membership kind */}
					{membershipKind === 'admin' || membershipKind === 'observer'
						? ' an '
						: membershipKind === 'invited'
						? ' '
						: ' a '}
					<Styled.SearchResultBoldText>{membershipKind}</Styled.SearchResultBoldText>.
				</Styled.SearchResultMembershipLine>
			);
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
