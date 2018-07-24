import React from 'react';
import PropTypes from 'prop-types';
import { Bootstrap } from '../../components/main.js';
import * as Styled from './styled.jsx';
import { SimpleGroup } from './simple-group.jsx';
import icons from './icons';

const { Button } = Bootstrap;
const storedIcons = new Map();

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
					style={{ borderRadius: '3px', width: '32px', height: '32px' }}
					src={group.avatarUrl}
					alt={group.name}
				/>
			);
		}

		const Icon = (storedIcons || []).get(group.kind) || this.makeStoredIcon(group);

		return (
			<Icon style={{ borderRadius: '3px', width: '32px', height: '32px' }} viewBox="0 0 76 76" />
		);
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
				id={group.groupId}
				kind={group.kind}
				name={group.name}
				onClick={this.handleGroupSelection}
				avatar={this.getIcon(group)}
			/>
		));
		return (
			<Styled.DropdownContainer>
				<Styled.Select>
					<Styled.SelectedGroup onClick={this.handleDropdownToggle}>
						<Styled.SelectedGroupAvatar>
							{this.getIcon(this.props.selectedGroup)}
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
				</Styled.Select>
			</Styled.DropdownContainer>
		);
	}
}
