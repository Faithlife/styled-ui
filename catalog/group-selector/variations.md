### Group Selector with Groups

```react
showSource: true
state: {
	groups: [{
		name: 'Michaels Test Church',
		groupId: 1,
		kind: 'church',
		avatarUrl: '',
		relationship: {
			membership: {
				kind: 'member',
			},
			kind: 'admin',
		},
		availableActions: {
			claim: 'false',
		},
	},
	{
		name: 'Example Community Church',
		groupId: 2,
		kind: 'church',
		avatarUrl: '',
		relationship: {
			membership: {
				kind: 'member',
			},
			kind: 'admin',
		},
		availableActions: {
			claim: 'false',
		},
	},
	{
		name: 'Jordans Test Church',
		groupId: 3,
		kind: 'church',
		avatarUrl: '',
		relationship: {
			membership: {
				kind: 'member',
			},
			kind: 'admin',
		},
		availableActions: {
			claim: 'false',
		},
	},
	{
		name: 'Cool Test Church',
		groupId: 4,
		kind: 'church',
		avatarUrl: '',
		relationship: {
			membership: {
				kind: 'member',
			},
			kind: 'admin',
		},
		availableActions: {
			claim: 'false',
		},
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
				name: 'Search result 1',
				groupId: 1,
				kind: 'church',
				avatarUrl: '',
				relationship: {
					membership: {
						kind: 'member',
					},
					kind: 'admin',
				},
				availableActions: {
					claim: 'false',
				},
			},
			{
				name: 'Search result 2',
				groupId: 2,
				kind: 'church',
				avatarUrl: '',
				relationship: {
					membership: {
						kind: 'member',
					},
					kind: 'admin',
				},
				availableActions: {
					claim: 'false',
				},
			},
			{
				name: 'Search result 3',
				groupId: 3,
				kind: 'church',
				avatarUrl: '',
				relationship: {
					membership: {
						kind: 'member',
					},
					kind: 'admin',
				},
				availableActions: {
					claim: 'false',
				},
			},
			{
				name: 'Search result 4',
				groupId: 4,
				kind: 'church',
				avatarUrl: '',
				relationship: {
					membership: {
						kind: 'member',
					},
					kind: 'admin',
				},
				availableActions: {
					claim: 'false',
				},
			}
			]});
		}}
		onCreateGroup={(name, location) => {
			const newGroup = {
				name,
				groupId: 5,
				kind: 'church',
				avatarUrl: '',
				relationship: {
					membership: {
						kind: 'member',
					},
					kind: 'admin',
				},
				availableActions: {
					claim: 'false',
				},
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
		onGetStartedClick={() => {alert("handled by application")}}
		onClaimGroupClick={() => {alert("handled by application")}}
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
		isMobile={false}
	/>
</GroupSelectorDemo>
```
