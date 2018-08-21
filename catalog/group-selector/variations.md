### Group Selector

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
	}
	],
	selectedGroupId: 1,
	groupSelectorView: "groups",
	mobile: false,
}
---
<GroupSelectorDemo>
	<GroupSelector
		executeSearch={() => {alert("handled by application")}}
		handleSignInClick={() => {alert("handled by application")}}
		handleCreateGroup={() => {alert("handled by application")}}
		handleSelectionChange={() => {alert("handled by application")}}
		groups={state.groups}
		selectedGroupId={state.selectedGroupId}
		groupSearchResults={state.groups}
		groupSelectorView={state.groupSelectorView}
		handleGetStartedClick={() => {alert("handled by application")}}
		handleClaimGroupClick={() => {alert("handled by application")}}
		isMobile={false}
		style={{zIndex:1000}}
	/>

	<Button color="primary" onClick={() => {setState({groupSelectorView: "sign-in"})}}>Sign In</Button>
	{' '}
	<Button color="primary" onClick={() => {setState({groupSelectorView: "fetching"})}}>Loading</Button>
	{' '}
	<Button color="primary" onClick={() => {setState({groupSelectorView: "groups"})}}>Groups</Button>
	{' '}
	<Button color="primary" onClick={() => {setState({groupSelectorView: "no-groups"})}}>No Groups</Button>
</GroupSelectorDemo>
```
