import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { LargeGroupSelector, GroupSelector } from '@faithlife/group-selector';
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
		expandedSections: [0, 2],
	};
	render() {
		return (
			<header>
				<Accordion
					expandedSections={this.state.expandedSections}
					onExpansion={expandedSections => this.setState({ expandedSections })}
				>
					<Accordion.Item>
						<Accordion.Header>In Place Large Group Selector</Accordion.Header>
						<Accordion.Panel>
							<LargeGroupSelector
								isOpen={false}
								onChangeModalState={() => {}}
								onSearchInputChange={search => {
									this.setState({ groupSearchResults: this.state.demoSearchResults });
								}}
								groups={this.state.groups}
								groupSearchResults={this.state.groupSearchResults || this.state.groups}
								onCreateGroup={(name, location) => {
									const newGroup = {
										name,
										groupId: 6,
										kind: 'church',
										avatarUrl: '',
										relationshipKind: 'participant',
										membershipKind: 'admin',
										claimable: false,
									};

									this.setState({
										groups: [...this.state.groups, newGroup],
										isOpen: false,
									});
								}}
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
								showInPlace
							/>
						</Accordion.Panel>
					</Accordion.Item>
					<Accordion.Item>
						<Accordion.Header>Group Selector with Groups</Accordion.Header>
						<Accordion.Panel>
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
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			</header>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#app'));
