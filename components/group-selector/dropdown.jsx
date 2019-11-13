import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import * as Styled from './styled';
import { SimpleGroup } from './simple-group';

export class GroupDropdown extends React.PureComponent {
	static propTypes = {
		groups: PropTypes.array.isRequired,
		selectedGroup: PropTypes.object.isRequired,
		onSelectionChange: PropTypes.func.isRequired,
		onFindChurchButtonClick: PropTypes.func.isRequired,
	};

	state = {
		isDropdownOpen: false,
		hoveredGroupIndex: -1,
	};

	dropdownRef = React.createRef();

	componentDidMount() {
		window.addEventListener('mousedown', this.handleClick, false);
	}

	componentWillUnmount() {
		window.removeEventListener('mousedown', this.handleClick, false);
	}

	closeDropdown = () => {
		this.setState({ isDropdownOpen: false });
	};

	setHovered = group => {
		if (this.state.hoveredGroupIndex !== -1) {
			if (group.groupId === this.props.groups[this.state.hoveredGroupIndex].groupId) {
				return true;
			}
		}

		return false;
	};

	handleClick = event => {
		if (this.dropdownRef.current.contains(event.target)) {
			return;
		}
		this.closeDropdown();
	};

	handleKeyPress = event => {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			const newIndex = this.state.hoveredGroupIndex + 1;
			if (newIndex === this.props.groups.length) {
				this.setState({ hoveredGroupIndex: newIndex - 1 });
				return;
			}
			this.setState({ hoveredGroupIndex: newIndex });
			return;
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			const newIndex = this.state.hoveredGroupIndex - 1;

			if (newIndex < 0) {
				this.setState({ hoveredGroupIndex: 0 });
				return;
			}
			this.setState({ hoveredGroupIndex: newIndex });
		} else if (event.key === 'Enter') {
			event.preventDefault();
			if (!this.state.isDropdownOpen) {
				this.handleDropdownToggle();
				return;
			}

			this.handleGroupSelection(
				this.props.groups[this.state.hoveredGroupIndex].groupId,
				this.props.groups[this.state.hoveredGroupIndex].name,
			);
		}
	};

	handleDropdownToggle = () => {
		this.setState(({ isDropdownOpen }) => ({ isDropdownOpen: !isDropdownOpen }));
	};

	handleGroupSelection = (groupId, name) => {
		this.props.onSelectionChange(groupId, name);
		this.closeDropdown();
	};

	handleDropdownButtonClick = () => {
		this.handleDropdownToggle();
		this.props.onFindChurchButtonClick();
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
				avatarUrl={group.avatarUrl}
			/>
		));

		const { name, kind, groupId, avatarUrl } = this.props.selectedGroup;

		return (
			<Styled.DropdownContainer ref={this.dropdownRef}>
				<Styled.SelectedGroup onClick={this.handleDropdownToggle} onKeyDown={this.handleKeyPress}>
					<Styled.SelectedSimpleGroupWrapper>
						<SimpleGroup
							groupId={groupId}
							name={name}
							kind={kind}
							isSelected={false}
							isHovered={false}
							avatarUrl={avatarUrl}
							disableHover
						/>
					</Styled.SelectedSimpleGroupWrapper>
					<Styled.DownArrow
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						viewBox="0 0 12 12"
					>
						<polygon fill="#888" points="8 6 4 9.5 4 2.5" transform="rotate(90 6 6)" />
					</Styled.DownArrow>
				</Styled.SelectedGroup>
				{this.state.isDropdownOpen && (
					<Styled.DropdownWrapper>
						<Styled.DropdownGroupsContainer>{groups}</Styled.DropdownGroupsContainer>
						<Styled.DropdownButtonContainer>
							<Button size="small" variant="secondary" onClick={this.handleDropdownButtonClick}>
								Find or Add Church
							</Button>
						</Styled.DropdownButtonContainer>
					</Styled.DropdownWrapper>
				)}
			</Styled.DropdownContainer>
		);
	}
}
