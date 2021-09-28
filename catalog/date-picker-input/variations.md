```react
noSource: true
---
<React.Fragment>
	<V6Banner>
		<AcceptsStyledSystemProps />
	</V6Banner>
</React.Fragment>
```

## Default Date Picker Input

```react
showSource: true
state: { selectedDate: null }
---
<div>
	<span>The selected date is {state.selectedDate && dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</span>
	<DatePickerInput
		defaultSelectedDate={state.selectedDate || new Date()}
		onChange={(date) => setState({ selectedDate: date })}
		dateFunctions={dateFunctions}
		parseUserDateString={parseUserDateString}
		validate={() => true}
	/>
</div>
```

## Customized placement of Date Picker Input

```react
showSource: true
state: { selectedDate: null }
---
<div>
	<span>The selected date is {state.selectedDate && dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</span>
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

## Custom props on Date Picker Input

Extra props on the DatePicker Input will be passed to the Input. Useful for adding IDs to assign labels.
Additional config components can be used to pass props to the button and popover.
Children are also passed through to `DatePicker` to allow further customizations.

```react
showSource: true
state: { selectedDate: null }
---
<div>
	<label htmlFor="date-picker-input">The selected date is {state.selectedDate && dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</label>
	<DatePickerInput
		id="date-picker-input"
		defaultSelectedDate={state.selectedDate || new Date()}
		onChange={(date) => setState({ selectedDate: date })}
		dateFunctions={dateFunctions}
		parseUserDateString={parseUserDateString}
		validate={() => true}
	>
		<DatePickerInput.Button color="green4" />
		<DatePickerInput.Popover container="body" placement="left-start" />
		<DatePicker.Footer display="flex" justifyContent="end">
			<Button
				variant="secondary"
				height="22px"
				onClick={() => { setState({ selectedDate: null }); }}
			>
				Reset date
			</Button>
		</DatePicker.Footer>
	</DatePickerInput>
</div>
```
