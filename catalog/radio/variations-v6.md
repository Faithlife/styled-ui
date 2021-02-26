For the next major version of Styled UI, the Radio component has been rebuilt to use our global Styled System theme and two new config components instead of its legacy `theme` prop.

You can opt in to the new API now by importing `{ Radio } from '@faithlife/styled-ui/v6'`.

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
			type="button"
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

### Custom icon/label props

Extra props on the `Radio` component are passed to the container. To pass Styled System props to just the icon or just the label, use `Radio.Icon` and/or `Radio.Label` config components.

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
		<Radio.Icon size="25px" />
		<Radio.Label color="red">A bigger icon and a red label</Radio.Label>
	</Radio>
</RadioDemo>
```
