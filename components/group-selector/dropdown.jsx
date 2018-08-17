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
		isMobile: PropTypes.bool.isRequired,
	};

	state = {
		isDropdownOpen: false,
		hoveredGroupIndex: -1,
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

	setHovered = group => {
		if (this.state.hoveredGroupIndex !== -1)
			if (group.groupId === this.props.groups[this.state.hoveredGroupIndex].groupId) return true;
		return false;
	};

	handleClick = event => {
		if (this.dropdownRef.current.contains(event.target)) return;
		this.closeDropdown();
	};

	handleKeyPress = event => {
		if (event.key === 'ArrowDown') {
			const newIndex = this.state.hoveredGroupIndex + 1;
			if (newIndex === this.props.groups.length) {
				this.setState({ hoveredGroupIndex: newIndex - 1 });
				return;
			}
			this.setState({ hoveredGroupIndex: newIndex });
			return;
		} else if (event.key === 'ArrowUp') {
			const newIndex = this.state.hoveredGroupIndex - 1;

			if (newIndex < 0) {
				this.setState({ hoveredGroupIndex: 0 });
				return;
			}
			this.setState({ hoveredGroupIndex: newIndex });
		} else if (event.key === 'Enter') {
			this.handleGroupSelection(
				this.props.groups[this.state.hoveredGroupIndex].groupId,
				this.props.groups[this.state.hoveredGroupIndex].name,
			);
			event.preventDefault();
		}
	};

	handleDropdownToggle = () => {
		this.setState(({ isDropdownOpen }) => ({ isDropdownOpen: !isDropdownOpen }));
	};

	handleGroupSelection = (groupId, name) => {
		this.props.handleSelectionChange(groupId, name);
		this.closeDropdown();
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
				isHovered={this.setHovered(group)}
				groupId={group.groupId}
				kind={group.kind}
				name={group.name}
				onClick={this.handleGroupSelection}
				avatar={<Avatar group={group} />}
			/>
		));

		const selectedGroupContents = (
			<div>
				<Styled.SelectedGroupAvatar>
					{<Avatar group={this.props.selectedGroup} />}
				</Styled.SelectedGroupAvatar>
				<Styled.SelectedGroupText>{this.props.selectedGroup.name}</Styled.SelectedGroupText>
			</div>
		);

		const dropdownWrapperContents = (
			<div>
				<Styled.DropdownGroupsContainer>{groups}</Styled.DropdownGroupsContainer>
				<Styled.DropdownButtonContainer>
					<Button outline color="primary" onClick={this.handleDropdownButtonClick}>
						Find or Add Church
					</Button>
				</Styled.DropdownButtonContainer>
			</div>
		);
		return (
			<Styled.DropdownContainer innerRef={this.dropdownRef}>
				<Styled.SelectedGroupContainer>
					{!this.props.isMobile && (
						<Styled.SelectedGroup
							onClick={this.handleDropdownToggle}
							onKeyDown={this.handleKeyPress}
						>
							{selectedGroupContents}
						</Styled.SelectedGroup>
					)}
					{this.props.isMobile && (
						<Styled.MobileSelectedGroup
							onClick={this.handleDropdownToggle}
							onKeyDown={this.handleKeyPress}
						>
							{selectedGroupContents}
						</Styled.MobileSelectedGroup>
					)}
					{this.state.isDropdownOpen && (
						<div>
							{!this.props.isMobile && (
								<Styled.DropdownWrapper>{dropdownWrapperContents}</Styled.DropdownWrapper>
							)}
							{this.props.isMobile && <div>{dropdownWrapperContents}</div>}
						</div>
					)}
				</Styled.SelectedGroupContainer>
			</Styled.DropdownContainer>
		);
	}
}
