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
	showAlert: false,
	alertText: "You must sign in before doing that",
}
---
<GroupSelectorModalDemo>
	<GroupSelectorModal
		onChangeModalState={() => {setState({isOpen: false})}}
		isOpen={state.isOpen}
		executeSearch={() => {alert("handled by application")}}
		groups={state.groups}
		groupSearchResults={state.groups}
		onCreateGroup={() => {alert("handled by application")}}
		onGetStartedClick={() => {alert("handled by application")}}
		onClaimGroupClick={() => {alert("handled by application")}}
		showAlert={state.showAlert}
		alertText={state.alertText}
	/>
	<Button color="primary" onClick={() => {setState({isOpen: true})}}>Open Modal</Button>
</GroupSelectorModalDemo>
```
