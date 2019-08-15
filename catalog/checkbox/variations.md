### Default theme

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
		Click me
	</Checkbox>
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
		borderColor="plum"
		hoverBorderColor="darkslateblue"
	>
		Click me
	</Checkbox>
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
		type="button"
		disabled
	>
		Click me
	</Checkbox>
</CheckboxDemo>
```
