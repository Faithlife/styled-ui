### Default theme

```react
showSource: true
state: { isChecked: false }
---
<div class="container"><style>{`.container > * { margin: 8px; }`}</style>
	<Checkbox
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		title={'Click me'}
	/>
</div>
```

### Custom theme
```react
showSource: true
state: { isChecked: false }
---
<div class="container"><style>{`.container > * { margin: 8px; }`}</style>
	<Checkbox
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		title={'Click me'}
		theme={{
			primary: 'darkslateblue',
			border: 'plum',
		}}
	/>
</div>
```
