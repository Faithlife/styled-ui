import React from 'react';
import PropTypes from 'prop-types';
import { Bootstrap } from '../../components/main.js';
import * as Styled from './styled.jsx';
import { SimpleGroup } from './simple-group.jsx';
import { Avatar } from './avatar.jsx';

const { Button } = Bootstrap;

export class GroupDropdown extends React.PureComponent {
	static propTypes = {
		// groups: PropTypes.arrayOf(
		// 	PropTypes.shape({
		// 		name: PropTypes.string.isRequired,
		// 		groupId: PropTypes.number.isRequired,
		// 		kind: PropTypes.string.isRequired,
		// 		avatarUrl: PropTypes.string,
		// 	}),
		// ).isRequired,
		// selectedGroup: PropTypes.shape({
		// 	name: PropTypes.string.isRequired,
		// 	groupId: PropTypes.number.isRequired,
		// 	kind: PropTypes.string.isRequired,
		// 	avatarUrl: PropTypes.string,
		// }),
		groups: PropTypes.array.isRequired,
		selectedGroup: PropTypes.object.isRequired,
		handleSelectionChange: PropTypes.func.isRequired,
		handleFindChurchButtonClick: PropTypes.func.isRequired,
	};

	state = {
		isDropdownOpen: false,
	};

	dropdownRef = React.createRef();

	componentDidMount = () => {
		window.addEventListener('mousedown', this.handleClick, false);
	};

	componentWillUnmount = () => {
		window.removeEventListener('mousedown', this.handleClick, false);
	};

	closeDropdown = () => {
		this.setState({ isDropdownOpen: false });
	};

	handleClick = event => {
		if (this.dropdownRef.current.contains(event.target)) return;
		this.closeDropdown();
	};

	handleDropdownToggle = () => {
		this.setState(({ isDropdownOpen }) => ({ isDropdownOpen: !isDropdownOpen }));
	};

	handleGroupSelection = groupId => {
		this.props.handleSelectionChange(groupId);
		this.setState({ isDropdownOpen: false });
	};

	handleDropdownButtonClick = () => {
		this.handleDropdownToggle();
		this.props.handleFindChurchButtonClick();
	};

	render() {
		const groups = this.props.groups.map(group => (
			<SimpleGroup
				key={group.groupId}
				isSelected={this.props.selectedGroup.groupId === group.groupId}
				groupId={group.groupId}
				kind={group.kind}
				name={group.name}
				onClick={this.handleGroupSelection}
				avatar={<Avatar group={group} />}
			/>
		));
		return (
			<Styled.DropdownContainer innerRef={this.dropdownRef}>
				<Styled.SelectedGroupContainer>
					<Styled.SelectedGroup onClick={this.handleDropdownToggle}>
						<Styled.SelectedGroupAvatar>
							{<Avatar group={this.props.selectedGroup} />}
						</Styled.SelectedGroupAvatar>
						<Styled.SelectedGroupText>{this.props.selectedGroup.name}</Styled.SelectedGroupText>
					</Styled.SelectedGroup>
					{this.state.isDropdownOpen && (
						<Styled.DropdownWrapper>
							<Styled.DropdownGroupsContainer>{groups}</Styled.DropdownGroupsContainer>
							<Styled.DropdownButtonContainer>
								<Button outline color="primary" onClick={this.handleDropdownButtonClick}>
									Find or Add Church
								</Button>
							</Styled.DropdownButtonContainer>
						</Styled.DropdownWrapper>
					)}
				</Styled.SelectedGroupContainer>
			</Styled.DropdownContainer>
		);
	}
}
