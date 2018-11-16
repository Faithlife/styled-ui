### Group Selector with Groups

```react
showSource: true
state: {
	groups: [{
		name: 'Michaels Test Church',
		groupId: 1,
		kind: 'church',
		avatarUrl: 'https://avatars.logoscdn.com/451/6830451_f896e509e7504b33812f0f6bf086ffa8.jpg',
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
	selectedGroupId: 1,
	mobile: false,
}
---
<GroupSelectorDemo>
	<GroupSelector
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
		onSelectionChange={(groupId, name) => { setState({selectedGroupId: groupId }) }}
		groups={state.groups}
		selectedGroupId={state.selectedGroupId}
		groupSearchResults={state.groupSearchResults || state.groups}
		groupSelectorView={"groups"}
		onGetStartedClick={() => {alert("Lets get started.")}}
		onClaimGroupClick={() => {alert("Claim the group!")}}
		onJoinGroupClick={() => {alert("Should Join the group, or request")}}
		onAdminRequestClick={() => {alert("Admin access requested")}}
		isMobile={false}
	/>
</GroupSelectorDemo>
```

### Group Selector without Groups

```react
showSource: true
state: {
	groups: [],
	selectedGroupId: 1,
	mobile: false,
}
---
<GroupSelectorDemo>
	<GroupSelector
		onSearchInputChange={() => {alert("handled by application")}}
		onCreateGroup={() => {alert("handled by application")}}
		onSelectionChange={() => {alert("handled by application")}}
		groups={state.groups}
		selectedGroupId={state.selectedGroupId}
		groupSearchResults={state.groups}
		groupSelectorView={"no-groups"}
		onGetStartedClick={() => {alert("handled by application")}}
		onClaimGroupClick={() => {alert("handled by application")}}
		onJoinGroupClick={() => {alert("Should Join the group, or request")}}
		onAdminRequestClick={() => {alert("Admin access requested")}}
		isMobile={false}
	/>
</GroupSelectorDemo>
```

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
<LargeGroupSelectorDemo>
	<LargeGroupSelector
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
				isOpen: false,
			});
		}}
		onGetStartedClick={() => {alert("Lets get started.")}}
		onClaimGroupClick={() => {alert("Claim the group!")}}
		onJoinGroupClick={() => {alert("Should Join the group, or request")}}
		onAdminRequestClick={() => {alert("Admin access requested")}}
	/>
	<Button color="primary" onClick={() => {setState({isOpen: true})}}>Open Modal</Button>
</LargeGroupSelectorDemo>
```

### In Place Large Group Selector

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
}
---
<LargeGroupSelectorDemo>
	<LargeGroupSelector
		isOpen={false}
		onChangeModalState={() => {}}
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
				isOpen: false,
			});
		}}
		onGetStartedClick={() => {alert("Lets get started.")}}
		onClaimGroupClick={() => {alert("Claim the group!")}}
		onJoinGroupClick={() => {alert("Should Join the group, or request")}}
		onAdminRequestClick={() => {alert("Admin access requested")}}
		showInPlace
	/>
</LargeGroupSelectorDemo>
```
