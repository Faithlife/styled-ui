import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from '../styled.jsx';

export class SearchResult extends React.PureComponent {
	static propTypes = {
		avatar: PropTypes.element,
		groupId: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		kind: PropTypes.string,
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

	state = {
		message: <p />,
		membershipLine: <p />,
		button: <p />,
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

	componentDidMount() {
		this.getSearchResultDetails();
	}

	getSearchResultDetails = () => {
		if (this.props.claimable === 'true') {
			// message = <p className={styles.searchResultMessage}>This is an empty group</p>;
			// buttonText = uiStrings.claimGroup;
			this.setState({
				message: <Styled.SearchResultMessage>This is an empty group</Styled.SearchResultMessage>,
			});
			this.setState({
				button: (
					<Styled.SearchResultButton size="sm" outline color="primary" onClick={this.claimGroup}>
						Claim
					</Styled.SearchResultButton>
				),
			});
		} else if (this.props.membershipKind === 'none' || null) {
			this.setState({
				message: (
					<Styled.SearchResultMessage>
						<Styled.SearchResultHightlightText>Admin</Styled.SearchResultHightlightText> membership
						required
					</Styled.SearchResultMessage>
				),
			});
			this.setState({
				membershipLine: (
					<Styled.SearchResultMembershipLine>
						You are <Styled.SearchResultBoldText>not</Styled.SearchResultBoldText> a member
					</Styled.SearchResultMembershipLine>
				),
			});
			this.setState({
				button: (
					<Styled.SearchResultButton size="sm" outline color="primary" onClick={this.joinGroup}>
						Join Group
					</Styled.SearchResultButton>
				),
			});
		} else if (
			this.props.membershipKind !== 'admin' &&
			this.props.relationshipKind === 'participant'
		) {
			this.setState({
				message: (
					<Styled.SearchResultMessage>
						<Styled.SearchResultHightlightText>Admin</Styled.SearchResultHightlightText> membership
						required
					</Styled.SearchResultMessage>
				),
			});
			this.setState({
				membershipLine: (
					<Styled.SearchResultMembershipLine>
						You are a <Styled.SearchResultBoldText>member</Styled.SearchResultBoldText>
					</Styled.SearchResultMembershipLine>
				),
			});
			this.setState({
				button: (
					<Styled.SearchResultButton size="sm" outline color="primary" onClick={this.requestAccess}>
						Request Access
					</Styled.SearchResultButton>
				),
			});
		} else if (
			this.props.kind.toLowerCase() !== 'church' &&
			this.props.membershipKind === 'admin'
		) {
			this.setState({
				message: (
					<Styled.SearchResultMessage>
						{'Group must be a '}
						<Styled.SearchResultHightlightText>Church</Styled.SearchResultHightlightText>
					</Styled.SearchResultMessage>
				),
			});
			this.setState({
				membershipLine: (
					<Styled.SearchResultMembershipLine>
						You are an <Styled.SearchResultBoldText>Admin</Styled.SearchResultBoldText>
					</Styled.SearchResultMembershipLine>
				),
			});
			this.setState({
				button: (
					<Styled.SearchResultButton size="sm" outline color="primary" onClick={this.editGroupType}>
						Edit
					</Styled.SearchResultButton>
				),
			});
		} else if (this.props.relationshipKind === 'none') {
			this.setState({
				message: '',
			});
			this.setState({
				membershipLine: (
					<Styled.SearchResultMembershipLine>
						You are not a{' '}
						<Styled.SearchResultHightlightText>Member</Styled.SearchResultHightlightText>
					</Styled.SearchResultMembershipLine>
				),
			});
			this.setState({
				button: (
					<Styled.SearchResultButton size="sm" outline color="primary" onClick={this.joinGroup}>
						Join Group
					</Styled.SearchResultButton>
				),
			});
		} else {
			this.setState({
				message: <p />,
			});
			this.setState({
				membershipLine: (
					<Styled.SearchResultMembershipLine>
						You are an <Styled.SearchResultBoldText>Admin</Styled.SearchResultBoldText>
					</Styled.SearchResultMembershipLine>
				),
			});
			this.setState({
				button: (
					<Styled.SearchResultButton size="sm" color="primary" onClick={this.getStarted}>
						Get Started
					</Styled.SearchResultButton>
				),
			});
		}
	};

	formatGroupKind = () => {
		let string = this.props.kind.replace(/([A-Z])/g, ' $1');
		string = string.charAt(0).toUpperCase() + string.slice(1);
		return string;
	};

	render() {
		return (
			<Styled.SearchResult>
				<Styled.SearchResultAvatar>{this.props.avatar}</Styled.SearchResultAvatar>
				<Styled.SearchResultNameText>{this.props.name}</Styled.SearchResultNameText>
				<Styled.SearchResultGroupKind>{this.formatGroupKind()}</Styled.SearchResultGroupKind>
				{this.state.membershipLine}
				{this.state.message}
				<Styled.SearchResultButtonContainer>{this.state.button}</Styled.SearchResultButtonContainer>
			</Styled.SearchResult>
		);
	}
}
