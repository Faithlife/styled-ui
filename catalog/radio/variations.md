### Default theme

```react
showSource: true
state: { isChecked: false }
---
<RadioDemo>
	<Radio
		onClick={() => setState({ isChecked: !state.isChecked })}
		isChecked={state.isChecked}
		title={'Click me'}
		type="button"
	/>
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
		title={'Click me'}
		theme={{
			primary: 'darkslateblue',
			border: 'plum',
		}}
	/>
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
