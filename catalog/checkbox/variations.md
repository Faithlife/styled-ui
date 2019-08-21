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
		type="button"
	/>
</CheckboxDemo>
```

### Mixed value

```react
showSource: true
state: { isMixed: true, isChecked: false }
---
<CheckboxDemo>
	<Checkbox
		onClick={() => setState({ isMixed: !state.isMixed && !state.isChecked, isChecked: state.isMixed })}
		isChecked={state.isChecked}
		isMixed={state.isMixed}
		title={'Click me'}
		type="button"
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

### Custom label component

```react
showSource: true
state: { isChecked: false }
---
<CheckboxDemo>
	<Checkbox
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		type="button"
	>
		<span>No, click <b>me</b>!</span>
	</Checkbox>
</CheckboxDemo>
```

### Disabled state

```react
showSource: true
state: { isChecked: false }
---
<CheckboxDemo>
	<Checkbox
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		title={'Click me'}
		type="button"
		disabled
	/>
</CheckboxDemo>
```
