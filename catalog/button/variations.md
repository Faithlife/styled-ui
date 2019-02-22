## The Problem

There is no good reason for a _child_ of a button component to be clickable, or for the click event to take on the `value` attribute of that child element. I'm suggesting that we add `pointer-events: none;` to the ButtonContentWrapper to address this situation.

Clicking on the gear icon or the nested span results in a `event.target.value` of `undefined` rather than the value from the `<Button>`.

```react
showSource: true
state: { value: 'not clicked' }
---
<ButtonDemo>
	<Button
		onClick={event => setState({value: event.target.value})}
		primary small
		value={'clicked the button'}
		icon={<GearIcon />}
	>
		<span>Click me!</span>
	</Button>
	<div>{state.value ? state.value : typeof state.value}</div>
</ButtonDemo>
```
