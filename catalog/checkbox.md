### Default theme

```react
state: { isChecked: false }
---
<div class="container">
	<style>{`
.container > * {
	margin: 8px;
}
`}</style>
	<Checkbox
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		title={'Click me'}
	/>
</div>
```

### Custom theme
```react
state: { isChecked: false }
---
<div class="container">
	<style>{`
.container > * {
	margin: 8px;
}
`}</style>
	<Checkbox
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		title={'Click me'}
		theme={{
			primary: 'green',
			border: 'black',
		}}
	/>
</div>
```
