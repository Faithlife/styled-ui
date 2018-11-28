## Default Date Picker

```react
showSource: true
state: { selectedDate: null }
---
<DatePickerDemo>
<div>
<span>The selected date is {dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</span>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Select Date</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="bottom">
			<DatePicker
				selectedDate={state.selectedDate}
				setSelectedDate={(date) => setState({ selectedDate: date })}
				dateFunctions={dateFunctions}
				validate={() => true}
			/>
		</Popover>
	</PopoverManager>
</div>
</DatePickerDemo>
```

## Default Date Range Picker

```react
showSource: true
state: { selectedDateRange: null }
---
<DatePickerDemo>
<div>
	<span>The selected date range is {(state.selectedDateRange ? dateFunctions.format(state.selectedDateRange.start, 'MM-dd-yyyy') : null)} to {(state.selectedDateRange ? dateFunctions.format(state.selectedDateRange.end, 'MM-dd-yyyy') : null)}</span>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Select Dates</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="bottom">
			<DatePicker
				selectedDateRange={state.selectedDateRange}
				setSelectedDate={(dateRange) => setState({ selectedDateRange: dateRange })}
				dateFunctions={dateFunctions}
				validate={() => true}
				asDateRangePicker
			/>
		</Popover>
	</PopoverManager>
</div>
</DatePickerDemo>
```
