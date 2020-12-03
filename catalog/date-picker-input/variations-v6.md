For the next major version of Styled UI, the DatePickerInput component has been rebuilt to use Styled System primitives.

You can opt in to the new API now by importing `{ DatePickerInput } from '@faithlife/styled-up/v6'`. When v6 is released, the `/v6` entrypoint will continue to be supported with a deprecation warning until v7 is released.

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

Extra props on the DatePicker Input will be passed to the Input. Useful for adding IDs to assign labels.
Additional config components can be used to pass props to the button and popover.

```react
showSource: true
state: { selectedDate: null }
---
<div style={{ overflowY: 'hidden' }}>
	<label htmlFor="date-picker-input">The selected date is {dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</label>
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
	</DatePickerInput>
</div>
```
