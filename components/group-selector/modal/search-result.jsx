import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '../avatar.jsx';
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
		claimable: PropTypes.string,
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

		if (claimable === 'true') {
			message = <Styled.SearchResultMessage>This is an empty group</Styled.SearchResultMessage>;
			button = (
				<Styled.SearchResultButton size="sm" outline color="primary" onClick={this.claimGroup}>
					Claim
				</Styled.SearchResultButton>
			);
		} else if (membershipKind === 'none' || null) {
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
				<Styled.SearchResultButton size="sm" outline color="primary" onClick={this.joinGroup}>
					Join Group
				</Styled.SearchResultButton>
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
					You are a <Styled.SearchResultBoldText>member</Styled.SearchResultBoldText>
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Styled.SearchResultButton size="sm" outline color="primary" onClick={this.requestAccess}>
					Request Access
				</Styled.SearchResultButton>
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
				<Styled.SearchResultButton size="sm" outline color="primary" onClick={this.editGroupType}>
					Edit
				</Styled.SearchResultButton>
			);
		} else if (relationshipKind === 'none') {
			message = '';
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					You are not a{' '}
					<Styled.SearchResultHightlightText>Member</Styled.SearchResultHightlightText>
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Styled.SearchResultButton size="sm" outline color="primary" onClick={this.joinGroup}>
					Join Group
				</Styled.SearchResultButton>
			);
		} else {
			message = <p />;
			membershipLine = (
				<Styled.SearchResultMembershipLine>
					You are an <Styled.SearchResultBoldText>Admin</Styled.SearchResultBoldText>
				</Styled.SearchResultMembershipLine>
			);
			button = (
				<Styled.SearchResultButton size="sm" color="primary" outline onClick={this.getStarted}>
					Get Started
				</Styled.SearchResultButton>
			);
		}

		return (
			<Styled.SearchResult>
				<Styled.SearchResultAvatar>
					<Avatar avatarUrl={avatarUrl} name={name} kind={kind} size="40px" />
				</Styled.SearchResultAvatar>
				<Styled.SearchResultNameText>{name}</Styled.SearchResultNameText>
				<Styled.SearchResultGroupKind>{this.formatGroupKind()}</Styled.SearchResultGroupKind>
				{membershipLine}
				{message}
				<Styled.SearchResultButtonContainer>{button}</Styled.SearchResultButtonContainer>
			</Styled.SearchResult>
		);
	}
}
