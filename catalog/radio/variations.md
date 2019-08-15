### Default theme

```react
showSource: true
state: { isChecked: false }
---
<RadioDemo>
	<Radio
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		type="button"
	>
		Click me
	</Radio>
</RadioDemo>
```

### Custom theme

```react
showSource: true
state: { isChecked: false }
---
<RadioDemo>
	<Radio
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		borderColor="plum"
		hoverBorderColor="darkslateblue"
	>
		Click me
	</Radio>
</RadioDemo>
```

### Custom label component

```react
showSource: true
state: { isChecked: false }
---
<RadioDemo>
	<Radio
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		type="button"
	>
		<span>No, click <b>me</b>!</span>
	</Radio>
</RadioDemo>
```

### Disabled state

```react
showSource: true
state: { isChecked: false }
---
<RadioDemo>
	<Radio
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		type="button"
		disabled
	>
		You can't click me
	</Radio>
</RadioDemo>
```
