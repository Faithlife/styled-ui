## Listbox

Refer to the dropdown docs for more info

```react
showSource: true
state: {
	isOpen: false,
	prepost: 'after',
	schedule: 'annual',
	percentage: 10,
	income: 55700,
	template: 'I want to give %PERCENTAGE% (%PREPOST% 19% taxes) of my %SCHEDULE% income of %INCOME%.'
}
---
<ListboxDemo>
	<ParameterSentence accessibilityFormLabel="Tithe Calculator">
		<CommandSentence template={state.template}>
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
</ListboxDemo>
```
