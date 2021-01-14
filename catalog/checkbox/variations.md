```react
noSource: true
---
<React.Fragment>
	<V6Banner>
		<AcceptsStyledSystemProps />
	</V6Banner>
</React.Fragment>
```

### Default theme

```react
showSource: true
state: { isChecked: false }
---
<CheckboxDemo>
	<Checkbox
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		title="Click me"
		type="button"
	/>
</CheckboxDemo>
```

### Mixed value

```react
showSource: true
state: { isChecked: 'mixed' }
---
<CheckboxDemo>
	<Checkbox
		onClick={() => setState({ isChecked: ({ [true]: false, [false]: 'mixed', mixed: true })[state.isChecked] })}
		isChecked={state.isChecked}
		title="Click me"
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
	<ThemeProvider theme={{
		colors: {
			checkbox: { primary: 'darkslateblue', border: 'plum' }
		}
	}}>
		<Checkbox
			onClick={() => setState({ isChecked: !state.isChecked })}
			isChecked={state.isChecked}
			title="Click me"
		/>
	</ThemeProvider>
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
		title="Click me"
		type="button"
		disabled
	/>
</CheckboxDemo>
```

### Custom box/label props

Extra props on the `Checkbox` component are passed to the entire checkbox container. To pass Styled System props to just the box or just the label, use `Checkbox.Box` and/or `Checkbox.Label` config components.

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
		<Checkbox.Box size="25px" />
		<Checkbox.Label color="red">A big box and a red label</Checkbox.Label>
	</Checkbox>
</CheckboxDemo>
```
