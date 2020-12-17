
For the next major version of Styled UI, the Radio component has been rebuilt to use our global Styled System theme instead of its legacy `theme` prop.

You can opt in to the new API now by importing `{ Radio } from '@faithlife/styled-ui/v6'`. When v6 is released, the `/v6` entrypoint will continue to be supported with a deprecation warning until v7 is released.

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
	<ThemeProvider theme={{
		colors: {
			radio: { primary: 'darkslateblue', border: 'plum' }
		}
	}}>
		<Radio
			onClick={() => setState({ isChecked: !state.isChecked })}
			isChecked={state.isChecked}
			title={'Click me'}
		/>
	</ThemeProvider>
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
		title={'You can\'t click me'}
		type="button"
		disabled
	>
	</Radio>
</RadioDemo>
```
