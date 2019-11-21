import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { GroupSelector } from '@faithlife/group-selector';
import { Accordion } from '@faithlife/styled-ui';

export class App extends PureComponent {
	state = {
		groups: [
			{
				name: 'Michaels Test Church',
				groupId: 1,
				kind: 'church',
				avatarUrl: '',
				relationshipKind: 'participant',
				membershipKind: 'admin',
				claimable: false,
			},
			{
				name: 'Example Community Church',
				groupId: 2,
				kind: 'church',
				avatarUrl: '',
				relationshipKind: 'participant',
				membershipKind: 'admin',
				claimable: false,
			},
			{
				name: 'Jordans Test Church',
				groupId: 3,
				kind: 'church',
				avatarUrl: '',
				relationshipKind: 'participant',
				membershipKind: 'admin',
				claimable: false,
			},
			{
				name: 'Cool Test Church',
				groupId: 4,
				kind: 'church',
				avatarUrl: '',
				relationshipKind: 'participant',
				membershipKind: 'admin',
				claimable: false,
			},
		],
		selectedGroupId: 1,
		mobile: false,
		demoSearchResults: [
			{
				name: 'Wrong Kind',
				groupId: 1,
				kind: 'general',
				avatarUrl: '',
				relationshipKind: 'participant',
				membershipKind: 'admin',
				claimable: false,
			},
			{
				name: 'Claimable Church',
				groupId: 2,
				kind: 'church',
				avatarUrl: '',
				relationshipKind: 'none',
				claimable: true,
			},
			{
				name: 'Not a Member',
				groupId: 3,
				kind: 'church',
				avatarUrl: '',
				relationshipKind: 'none',
				claimable: false,
			},
			{
				name: 'Member but Not Admin',
				groupId: 4,
				kind: 'church',
				avatarUrl: '',
				relationshipKind: 'participant',
				membershipKind: 'member',
				claimable: false,
			},
			{
				name: 'Search result 5',
				groupId: 5,
				kind: 'church',
				avatarUrl: '',
				relationshipKind: 'participant',
				membershipKind: 'admin',
				claimable: false,
			},
			{
				name: 'Search result 6',
				groupId: 6,
				kind: 'church',
				avatarUrl: '',
				relationshipKind: 'participant',
				membershipKind: 'admin',
				claimable: false,
			},
			{
				name: 'Search result 7',
				groupId: 7,
				kind: 'church',
				avatarUrl: '',
				relationshipKind: 'participant',
				membershipKind: 'admin',
				claimable: false,
			},
		],
	};
	render() {
		return (
			<header>
				<GroupSelector
					onSearchInputChange={search => {
						this.setState({ groupSearchResults: this.state.demoSearchResults });
					}}
					onCreateGroup={(name, location) => {
						const newGroup = {
							name,
							groupId: 5,
							kind: 'church',
							avatarUrl: '',
							relationshipKind: 'participant',
							membershipKind: 'admin',
							claimable: false,
						};

						this.setState({
							groups: [...this.state.groups, newGroup],
							selectedGroupId: newGroup.groupId,
						});
					}}
					onSelectionChange={(groupId, name) => {
						this.setState({ selectedGroupId: groupId });
					}}
					groups={this.state.groups}
					selectedGroupId={this.state.selectedGroupId}
					groupSearchResults={this.state.groupSearchResults || this.state.groups}
					groupSelectorView={'groups'}
					onGetStartedClick={() => {
						alert('Lets get started.');
					}}
					onClaimGroupClick={() => {
						alert('Claim the group!');
					}}
					onJoinGroupClick={() => {
						alert('Should Join the group, or request');
					}}
					onAdminRequestClick={() => {
						alert('Admin access requested');
					}}
					isMobile={false}
				/>
			</header>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#app'));
