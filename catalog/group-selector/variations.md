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
		executeSearch={() => {alert("handled by application")}}
		onCreateGroup={() => {alert("handled by application")}}
		onSelectionChange={() => {alert("handled by application")}}
		groups={state.groups}
		selectedGroupId={state.selectedGroupId}
		groupSearchResults={state.groups}
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
		executeSearch={() => {alert("handled by application")}}
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
