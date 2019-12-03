### Default variant (switch/toggle)

```react
showSource: true
state: { isChecked: false }
---
	<Switch
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
	/>
```

### Binary choice

```react
showSource: true
state: { isChecked: false }
---
	<Switch
		variant="binaryChoice"
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
	/>
```
