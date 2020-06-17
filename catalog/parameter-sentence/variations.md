## Desktop Parameter Sentence

Note to designers: under the hood a parameter sentence is seen as a form by screen readers. Including a small description of each parameter as if it was a form label will go a long way towards keeping it accessible.

```react
showSource: true
state: {
	isOpen: false,
	prepost: 'after',
	schedule: 'annual',
	percentage: 10,
	income: 55700,
}
---
<ParameterSentenceDemo>
	<ParameterSentence accessibilityFormLabel="Tithe Calculator">
		{'I want to give '}
		<ParameterInputBox
			defaultValue="10"
			value={state.percentage}
			onChange={event => setState({ percentage: event.target.value })}
			formatValue={val => `${val}%`}
			width="30px"
			accessibilityLabel={'Percent of income to tithe'}
		/>
		{' of my '}
		<ParameterSelect
			selectedId={state.schedule}
			onItemSelect={item => setState({ schedule: item })}
			options={scheduleOptions}
			accessibilityLabel={'Pay schedule of income'}
		/>
		{' income'}
	</ParameterSentence>
</ParameterSentenceDemo>
```

## Mobile ParameterSelects

If this is a mobile or touch screen device include the `useNativeSelect` prop to trigger the native select picker.

```react
showSource: true
state: {
	isOpen: false,
	prepost: 'after',
	schedule: 'annual',
	percentage: 10,
	income: 55700,
}
---
<ParameterSentenceDemo>
	<ParameterSentence accessibilityFormLabel="Tithe Calculator">
		<ParameterSelect
			useNativeSelect
			selectedId={state.schedule}
			onItemSelect={item => setState({ schedule: item })}
			options={scheduleOptions}
			accessibilityLabel={'Pay schedule of income'}
		/>
	</ParameterSentence>
</ParameterSentenceDemo>
```

## Style variations

```react
showSource: true
state: {
	isOpen: false,
	prepost: 'after',
	schedule: 'annual',
	percentage: 10,
	income: 55700,
}
---
<ParameterSentenceDemo addMargin>
	<ParameterSelect
		selectedId={state.schedule}
		onItemSelect={item => setState({ schedule: item })}
		options={scheduleOptions}
		accessibilityLabel={'Pay schedule of income'}
		styleOverrides={{ fontSize: '18px' }}
	/>
	<ParameterInputBox
		defaultValue="10"
		value={state.percentage}
		onChange={event => setState({ percentage: event.target.value })}
		formatValue={val => `${val}%`}
		width="35px"
		accessibilityLabel={'Percent of income to tithe'}
		styleOverrides={{ fontSize: '18px' }}
	/>
</ParameterSentenceDemo>
```
