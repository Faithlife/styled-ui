### Group Selector Modal

```react
showSource: true
state: {
	groups: [{
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
	}
	],
	isOpen: false,
}
---
<GroupSelectorModalDemo>
	<GroupSelectorModal
		isOpen={state.isOpen}
		onChangeModalState={() => setState({ isOpen: !state.isOpen }) }
		onSearchInputChange={(search) => {
			setState({ groupSearchResults: [{
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
				name: 'Member but Ain\'t Admin',
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
			}

			]});
		}}
		groups={state.groups}
		groupSearchResults={state.groupSearchResults || state.groups}
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

			setState({
				groups: [...state.groups, newGroup],
				selectedGroupId: newGroup.groupId
			});
		}}
		onGetStartedClick={() => {alert("Lets get started.")}}
		onClaimGroupClick={() => {alert("Claim the group!")}}
		onJoinGroupClick={() => {alert("Should Join the group, or request")}}
		onAdminRequestClick={() => {alert("Admin access requested")}}
				/>
	<Button color="primary" onClick={() => {setState({isOpen: true})}}>Open Modal</Button>
</GroupSelectorModalDemo>
```
