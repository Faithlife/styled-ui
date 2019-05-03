## Listbox

Refer to the dropdown docs for more info

```react
showSource: true
state: {
	isOpen: false,
	prepost: 'after',
	schedule: 'annual',
	template: 'I want to give %PERCENTAGE% (%PREPOST% %TAX% taxes) of my %SCHEDULE% income of %INCOME%.'
}
---
<ListboxDemo>
	<CommandSentence template={state.template}>
		<CommandSentence.Field name="PERCENTAGE">10%</CommandSentence.Field>
		<CommandSentence.Field name="PREPOST">
			<ParameterSelect selectedId={state.prepost} onItemSelect={item => setState({ prepost: item })} options={prePostOptions} />
		</CommandSentence.Field>
		<CommandSentence.Field name="TAX">19%</CommandSentence.Field>
		<CommandSentence.Field name="SCHEDULE">
			<ParameterSelect selectedId={state.schedule} onItemSelect={item => setState({ schedule: item })} options={scheduleOptions} />
		</CommandSentence.Field>
		<CommandSentence.Field name="INCOME">$55,700</CommandSentence.Field>
	</CommandSentence>
</ListboxDemo>
```
