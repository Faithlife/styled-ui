### Default variant (switch/toggle)

```react
showSource: true
state: { isChecked: false }
---
	<GlobalBorderBox>
	<Switch
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
	/>
	</GlobalBorderBox>
```

### Binary choice

```react
showSource: true
state: { isChecked: false }
---
	<GlobalBorderBox>
	<Switch
		variant="binaryChoice"
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
	/>
	</GlobalBorderBox>
```
