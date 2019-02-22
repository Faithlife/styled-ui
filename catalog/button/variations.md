## The Problem

There is no good reason for a _child_ of a button component to be clickable, or for the click event to take on the `value` attribute of that child element. I'm suggesting that we add `pointer-events: none;` to the ButtonContentWrapper to address this situation.

The `value` attribute of the `svg` and `span` elements don't even seem to work properly in this contrived example, but ultimately we should be able to expect that the `value` of the `event.target.value` should be taken from the `<Button>` component itself.

```react
showSource: true
state: { value: 'not clicked' }
---
<ButtonDemo>
	<Button
		onClick={event => setState({value: event.target.value})}
		primary small
		value={'clicked the button'}
		icon={<GearIcon value={'clicked the icon'} />}
	>
		<span value={'clicked the text'}>Click me!</span>
	</Button>
	<div>{state.value}</div>
</ButtonDemo>
```
