## Default Date Picker

```react
showSource: true
state: { selectedDate: null }
---
<DatePickerDemo>
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
</DatePickerDemo>
```
