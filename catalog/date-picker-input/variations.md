## Default Date Picker

```react
showSource: true
state: { selectedDate: null }
---
<div>
	<span>The selected date is {dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</span>
	<DatePickerInput
		defaultSelectedDate={state.selectedDate || new Date()}
		onChange={(date) => setState({ selectedDate: date })}
		dateFunctions={dateFunctions}
		parseUserDateString={parseUserDateString}
		validate={() => true}
	/>
</div>
```

## Customized placement of Date Picker

```react
showSource: true
state: { selectedDate: null }
---
<div>
	<span>The selected date is {dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</span>
	<DatePickerInput
		defaultSelectedDate={state.selectedDate || new Date()}
		onChange={(date) => setState({ selectedDate: date })}
		dateFunctions={dateFunctions}
		parseUserDateString={parseUserDateString}
		validate={() => true}
		placement={"left-start"}
	/>
</div>
```

## Custom props on Date Picker

Useful for adding IDs to assign labels.

```react
showSource: true
state: { selectedDate: null }
---
<div>
	<label htmlFor="date-picker-input">The selected date is {dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</label>
	<DatePickerInput
		id="date-picker-input"
		defaultSelectedDate={state.selectedDate || new Date()}
		onChange={(date) => setState({ selectedDate: date })}
		dateFunctions={dateFunctions}
		parseUserDateString={parseUserDateString}
		validate={() => true}
		placement={"left-start"}
	/>
</div>
```
