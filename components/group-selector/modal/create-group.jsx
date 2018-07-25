import React from 'react';
import PropTypes from 'prop-types';
import { Bootstrap } from '../../../components/main.js';
import * as Styled from '../styled.jsx';

const { Button, Input } = Bootstrap;

export function CreateGroup({
	onChurchNameInputChange,
	onChurchLocationInputChange,
	handleCreateGroup,
	searchInputValue,
	isCreateGroupOpen,
	newChurchName,
	newChurchLocation,
	toggleActive,
}) {
	function handleCreateGroupInsideClick() {
		toggleActive();
	}

	return (
		<Styled.CreateGroup onClick={handleCreateGroupInsideClick}>
			<Styled.CreateGroupTitle>
				Or add your church to the Faithlife Church Directory
			</Styled.CreateGroupTitle>
			{isCreateGroupOpen ? <Styled.CreateGroupLabel>Church Name</Styled.CreateGroupLabel> : null}
			<Input
				value={newChurchName}
				placeholder={searchInputValue ? `${searchInputValue}` : 'Your church name'}
				onChange={onChurchNameInputChange}
			/>
			<Styled.CreateGroupLabel>Church Location</Styled.CreateGroupLabel>
			<Input
				value={newChurchLocation}
				placeholder="City, State"
				onChange={onChurchLocationInputChange}
			/>
			<Styled.CreateGroupButton>
				<Button
					color="primary"
					disabled={newChurchName === '' || newChurchLocation === ''}
					onClick={handleCreateGroup}
				>
					Create
				</Button>
			</Styled.CreateGroupButton>
		</Styled.CreateGroup>
	);
}

CreateGroup.propTypes = {
	isCreateGroupOpen: PropTypes.bool,
	searchInputValue: PropTypes.string,
	handleCreateGroup: PropTypes.func.isRequired,
	onChurchNameInputChange: PropTypes.func.isRequired,
	onChurchLocationInputChange: PropTypes.func.isRequired,
	newChurchName: PropTypes.string,
	newChurchLocation: PropTypes.string,
	toggleActive: PropTypes.func.isRequired,
};
