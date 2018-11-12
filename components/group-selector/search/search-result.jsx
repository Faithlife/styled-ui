import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../avatar.jsx';
import { Button } from '../../main.js';
import * as Styled from '../styled.jsx';

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
		claimable: PropTypes.bool,
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
		const { claimable, relationshipKind, membershipKind, kind, avatarUrl, name } = this.props;

		let message;
		let membershipLine;
		let button;

		if (claimable) {
			message = <Styled.SearchResultMessage>This is an empty group</Styled.SearchResultMessage>;
			button = (
				<Button small outline primary onClick={this.claimGroup}>
					Claim
				</Button>
			);
		} else if (membershipKind === 'none' || !membershipKind) {
			message = (
				<Styled.SearchResultMessage>
					<Styled.SearchResultHightlightText>Admin</Styled.SearchResultHightlightText> membership
					required
				</Styled.SearchResultMessage>
			);
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					You are <Styled.SearchResultBoldText>not</Styled.SearchResultBoldText> a member
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Button small outline primary onClick={this.joinGroup}>
					Join Group
				</Button>
			);
		} else if (membershipKind !== 'admin' && relationshipKind === 'participant') {
			message = (
				<Styled.SearchResultMessage>
					<Styled.SearchResultHightlightText>Admin</Styled.SearchResultHightlightText> membership
					required
				</Styled.SearchResultMessage>
			);
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					You are a <Styled.SearchResultBoldText>{membershipKind}</Styled.SearchResultBoldText>
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Button small outline primary onClick={this.requestAccess}>
					Request Admin
				</Button>
			);
		} else if (kind.toLowerCase() !== 'church' && membershipKind === 'admin') {
			message = (
				<Styled.SearchResultMessage>
					{'Group must be a '}
					<Styled.SearchResultHightlightText>Church</Styled.SearchResultHightlightText>
				</Styled.SearchResultMessage>
			);
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					You are an <Styled.SearchResultBoldText>Admin</Styled.SearchResultBoldText>
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Button small outline primary onClick={this.editGroupType}>
					Edit
				</Button>
			);
		} else if (relationshipKind === 'none') {
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					You are not a{' '}
					<Styled.SearchResultHightlightText>Member</Styled.SearchResultHightlightText>
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Button small outline primary onClick={this.joinGroup}>
					Join Group
				</Button>
			);
		} else {
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					You are an <Styled.SearchResultBoldText>Admin</Styled.SearchResultBoldText>
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Button small primaryOutline onClick={this.getStarted}>
					Get Started
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
