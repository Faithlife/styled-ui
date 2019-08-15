## Default Date Picker

```react
showSource: true
state: { selectedDate: null }
---
<Box>
	<span>The selected date is {dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</span>
	<DatePickerInput
		defaultSelectedDate={state.selectedDate || new Date()}
		onChange={(date) => setState({ selectedDate: date })}
		dateFunctions={dateFunctions}
		parseUserDateString={parseUserDateString}
		validate={() => true}
	/>
</Box>
```

## Customized placement of Date Picker

```react
showSource: true
state: { selectedDate: null }
---
<Box>
	<span>The selected date is {dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</span>
	<DatePickerInput
		defaultSelectedDate={state.selectedDate || new Date()}
		onChange={(date) => setState({ selectedDate: date })}
		dateFunctions={dateFunctions}
		parseUserDateString={parseUserDateString}
		validate={() => true}
		placement={"left-start"}
	/>
</Box>
```
