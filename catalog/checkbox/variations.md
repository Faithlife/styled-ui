### Default theme

```react
showSource: true
state: { isChecked: false }
---
<CheckboxDemo>
	<Checkbox
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		title={'Click me'}
	/>
</CheckboxDemo>
```

### Custom theme
```react
showSource: true
state: { isChecked: false }
---
<CheckboxDemo>
	<Checkbox
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		title={'Click me'}
		theme={{
			primary: 'darkslateblue',
			border: 'plum',
		}}
	/>
</CheckboxDemo>
```
