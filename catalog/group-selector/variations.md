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
		membershipKind: 'member',
		claimable: false,
	},
	{
		name: 'Jordans Test Church',
		groupId: 3,
		kind: 'church',
		avatarUrl: '',
		relationshipKind: 'participant',
		membershipKind: 'follower',
		claimable: false,
	},
	{
		name: 'Cool Test Church',
		groupId: 4,
		kind: 'church',
		avatarUrl: '',
		relationshipKind: 'participant',
		membershipKind: '',
		claimable: false,
	},
	{
		name: 'Church With Really Really Really Really Really Really Really Really Long Name',
		groupId: 5,
		kind: 'church',
		avatarUrl: '',
		relationshipKind: 'participant',
		membershipKind: 'admin',
		claimable: false,
	}
	],
	demoSearchResults: [{
		name: 'Wrong Kind',
		groupId: 1,
		kind: 'general',
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
	],
}
---
<LargeGroupSelectorDemo>
	<LargeGroupSelector
		isOpen={false}
		onChangeModalState={() => {}}
		onSearchInputChange={(search) => {
			setState({ groupSearchResults: state.demoSearchResults});
		}}
		groups={state.groups}
		groupSearchResults={state.groupSearchResults || state.groups}
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

### In Place Large Group Selector with Resources and non-Admin members

```react
showSource: true
state: {
	localizedResources: {
		title: 'Find your church or ministry',
		subTitle: '',
		requestButtonText: 'Request',
		joinButtonText: 'Join',
		claimButtonText: 'Claim',
		selectButtonText: 'Select',
		dontSeeChurchText: "Don't see your church or ministry?",
		goToGroupButtonText: 'Go to group',
		churchNameText: 'Church or Ministry Name',
		churchLocationText: 'Church or Ministry Location',
		churchLocationPlaceholder: 'City, State',
	},
	authorizedMembershipLevels: ['admin', 'moderator', 'member', 'follower'],
	authorizedGroupKinds: ['church', 'ministry', 'general'],
	styleOverrides: { modalZIndex: 7000, tooltipMargin: '0 0 0 20px' },
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
		membershipKind: 'member',
		claimable: false,
	},
	{
		name: 'Jordans Test Church',
		groupId: 3,
		kind: 'church',
		avatarUrl: '',
		relationshipKind: 'participant',
		membershipKind: 'follower',
		claimable: false,
	},
	{
		name: 'Cool Test Church',
		groupId: 4,
		kind: 'church',
		avatarUrl: '',
		relationshipKind: 'participant',
		membershipKind: '',
		claimable: false,
	},
	{
		name: 'Church With Really Really Really Really Really Really Really Really Long Name',
		groupId: 5,
		kind: 'church',
		avatarUrl: '',
		relationshipKind: 'participant',
		membershipKind: '',
		claimable: false,
	},
	{
		name: 'Ministry',
		groupId: 6,
		kind: 'ministry',
		avatarUrl: '',
		relationshipKind: '',
		membershipKind: 'admin',
		claimable: false,
	},
	{
		name: 'Not Joinable Church',
		groupId: 7,
		kind: 'church',
		avatarUrl: '',
		relationshipKind: '',
		membershipKind: '',
		claimable: false,
		joinable: false,
	}
	],
	demoSearchResults: [{
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
	}
	],
}
---
<LargeGroupSelectorDemo>
	<LargeGroupSelector
		isOpen={false}
		onChangeModalState={() => {}}
		onSearchInputChange={(search) => {
			setState({ groupSearchResults: state.demoSearchResults});
		}}
		groups={state.groups}
		groupSearchResults={state.groupSearchResults || state.groups}
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

			setState({
				groups: [...state.groups, newGroup],
				isOpen: false,
			});
		}}
		onGetStartedClick={() => {alert("Lets get started.")}}
		onClaimGroupClick={() => {alert("Claim the group!")}}
		onJoinGroupClick={() => {alert("Should Join the group, or request")}}
		onAdminRequestClick={() => {alert("Admin access requested")}}
		styleOverrides={state.styleOverrides}
		showInPlace
		localizedResources={state.localizedResources}
		authorizedMembershipLevels={state.authorizedMembershipLevels}
	/>
</LargeGroupSelectorDemo>
```

### Group Selector with Groups

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
	selectedGroupId: 1,
	mobile: false,
	demoSearchResults: [{
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
	}
	],
}
---
<GroupSelectorDemo>
	<GroupSelector
		onSearchInputChange={(search) => {
			setState({ groupSearchResults: state.demoSearchResults});
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
	demoSearchResults: [{
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
	}
	]
}
---
<LargeGroupSelectorDemo>
	<LargeGroupSelector
		isOpen={state.isOpen}
		onChangeModalState={() => setState({ isOpen: !state.isOpen }) }
		onSearchInputChange={(search) => {
			setState({ groupSearchResults: state.demoSearchResults });
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
	<Button variant="primary" size="medium" onClick={() => {setState({isOpen: true})}}>Open Modal</Button>
</LargeGroupSelectorDemo>
```
