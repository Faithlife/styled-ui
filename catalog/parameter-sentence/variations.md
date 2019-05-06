## Desktop Parameter Sentence

Note to designers: under the hood a parameter sentence is seen as a form by screen readers. Including a small description of each parameter as if it was a form label will go a long way towards keeping it accessible.

This example uses [@faithlife/command-sentence-control](https://git/Logos/command-sentence-control) (git enterprise link)

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
		<CommandSentence template={'I want to give %PERCENTAGE% (%PREPOST% 19% taxes) of my %SCHEDULE% income of %INCOME%.'}>
			<CommandSentence.Field name="PERCENTAGE">
				<ParameterInputBox
					defaultValue="10"
					value={state.percentage}
					onChange={event => setState({ percentage: event.target.value })}
					formatValue={val => `${val}%`}
					width="35px"
					accessibilityLabel={'Percent of income to tithe'}
				/>
			</CommandSentence.Field>
			<CommandSentence.Field name="PREPOST">
				<ParameterSelect
					selectedId={state.prepost}
					onItemSelect={item => setState({ prepost: item })}
					options={prePostOptions}
					accessibilityLabel={'Should give tithe before or after taxes'}
				/>
			</CommandSentence.Field>
			<CommandSentence.Field name="SCHEDULE">
				<ParameterSelect
					selectedId={state.schedule}
					onItemSelect={item => setState({ schedule: item })}
					options={scheduleOptions}
					accessibilityLabel={'Pay schedule of income'}
				/>
			</CommandSentence.Field>
			<CommandSentence.Field name="INCOME">
				<ParameterInputBox
					defaultValue="55700"
					value={state.income}
					onChange={event => setState({ income: event.target.value })}
					formatValue={val => `$${val}`}
					width="50px"
					accessibilityLabel={'Income per pay schedule period'}
				/>
			</CommandSentence.Field>
		</CommandSentence>
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
		<CommandSentence template={'I want to give 10% of my %SCHEDULE% income.'}>
			<CommandSentence.Field name="SCHEDULE">
				<ParameterSelect
					useNativeSelect
					selectedId={state.schedule}
					onItemSelect={item => setState({ schedule: item })}
					options={scheduleOptions}
					accessibilityLabel={'Pay schedule of income'}
				/>
			</CommandSentence.Field>
		</CommandSentence>
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
<ParameterSentenceDemo>
	<ParameterSentence accessibilityFormLabel="Tithe Calculator">
		<ParameterSelect
			selectedId={state.schedule}
			onItemSelect={item => setState({ schedule: item })}
			options={scheduleOptions}
			accessibilityLabel={'Pay schedule of income'}
			theme={{ underlineColor: 'plum' }}
			styleOverrides={{ fontSize: '18px' }}
		/>
	</ParameterSentence>
</ParameterSentenceDemo>
```
