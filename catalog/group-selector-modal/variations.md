### Group Selector Modal

```react
showSource: true
state: {
	groups: [{
		name: Michael's Test Church,
		groupId: 1,
		kind: church,
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
		name: Example Community Church,
		groupId: 2,
		kind: church,
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
		name: Jordan's Test Church,
		groupId: 3,
		kind: church,
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
		name: Cool Test Church,
		groupId: 4,
		kind: church,
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
		name: Cool Test Church 1,
		groupId: 5,
		kind: church,
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
		name: Last Cool Test Church,
		groupId: 6,
		kind: church,
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
	isOpen: false,
}
---
<GroupSelectorModalDemo>
	<GroupSelectorModal
		onChangeModalState={() => {setState({isOpen: false})}}
		isOpen={state.isOpen}
		onSearchInputChange={() => {alert("handled by application")}}
		groups={state.groups}
		groupSearchResults={state.groups}
		onCreateGroup={() => {alert("handled by application")}}
		onGetStartedClick={() => {alert("handled by application")}}
		onClaimGroupClick={() => {alert("handled by application")}}
	/>
	<Button color="primary" onClick={() => {setState({isOpen: true})}}>Open Modal</Button>
</GroupSelectorModalDemo>
```
