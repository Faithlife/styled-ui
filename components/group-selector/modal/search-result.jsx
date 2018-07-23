import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from '../styled.jsx';

export default class SearchResult extends React.PureComponent {
	static propTypes = {
		avatar: PropTypes.element,
		groupId: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		kind: PropTypes.string,
		membershipKind: PropTypes.string,
		relationshipKind: PropTypes.string,
		handleGetStartedClick: PropTypes.func.isRequired,
		handleRequestClick: PropTypes.func.isRequired,
		handleEditClick: PropTypes.func.isRequired,
		handleJoinGroupClick: PropTypes.func.isRequired,
	};

	state = {
		message: <p />,
		membershipLine: <p />,
		button: <p />,
	};

	getStarted = () => {
		this.props.handleGetStartedClick(this.props.groupId);
	};

	requestAccess = () => {
		this.props.handleRequestClick(this.props.groupId);
	};

	editGroupType = () => {
		this.props.handleEditClick(this.props.groupId);
	};

	joinGroup = () => {
		this.props.handleJoinGroupClick(this.props.groupId);
	};

	componentDidMount() {
		this.getSearchResultDetails();
	}

	getSearchResultDetails = () => {
		if (this.props.membershipKind === 'none') {
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
		} else if (this.props.membershipKind !== 'admin') {
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
		} else if (this.props.kind !== 'Church') {
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

	render() {
		return (
			<Styled.SearchResult>
				<Styled.SearchResultAvatar>{this.props.avatar}</Styled.SearchResultAvatar>
				<Styled.SearchResultNameText>{this.props.name}</Styled.SearchResultNameText>
				<Styled.SearchResultGroupKind>{this.props.kind}</Styled.SearchResultGroupKind>
				{this.state.membershipLine}
				{this.state.message}
				<Styled.SearchResultButtonContainer>{this.state.button}</Styled.SearchResultButtonContainer>
			</Styled.SearchResult>
		);
	}
}
