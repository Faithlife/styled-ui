## Default Date Picker

```react
showSource: true
state: { selectedDate: null }
---
<DatePickerDemo>
	<span>The selected date is {dateFunctions.format(state.selectedDate, 'MM-dd-yyyy')}</span>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Select Date</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="bottom" maxWidth="1000px">
			<DatePicker
				selectedDate={state.selectedDate}
				setSelectedDate={(date) => setState({ selectedDate: date })}
				dateFunctions={dateFunctions}
				validate={() => true}
			/>
		</Popover>
	</PopoverManager>
</DatePickerDemo>
```

## Default Date Range Picker

```react
showSource: true
state: { selectedDateRange: null }
---
<DatePickerDemo>
	<span>The selected date range is {(state.selectedDateRange ? dateFunctions.format(state.selectedDateRange.start, 'MM-dd-yyyy') : null)} to {(state.selectedDateRange ? dateFunctions.format(state.selectedDateRange.end, 'MM-dd-yyyy') : null)}</span>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Select Dates</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="bottom" maxWidth="1000px">
			<DatePicker
				selectedDateRange={state.selectedDateRange}
				setSelectedDate={(dateRange) => setState({ selectedDateRange: dateRange })}
				dateFunctions={dateFunctions}
				validate={() => true}
				asDateRangePicker
			/>
		</Popover>
	</PopoverManager>
</DatePickerDemo>
```

## Date Period Picker

```react
showSource: true
state: { selectedDateRange: null }
---
<DatePickerDemo>
	<span style={{ marginRight: '8px' }}>The selected date range is {(state.selectedDateRange ? dateFunctions.format(state.selectedDateRange.start, 'MM-dd-yyyy') : null)} to {(state.selectedDateRange ? dateFunctions.format(state.selectedDateRange.end, 'MM-dd-yyyy') : null)}</span>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Select Dates</Button>
		</PopoverReference>
		<PopoverBase isOpen={state.isOpen} placement="bottom" borderRadius={1}>
			<DatePeriodPicker
				selectedDateRange={state.selectedDateRange}
				setSelectedDate={(dateRange) => setState({ selectedDateRange: dateRange })}
				dateFunctions={dateFunctions}
				validate={date => date >= new Date(1970, 0, 1)}
				parseDate={dateFunctions.parse}
				datePeriods={[{
					displayName: 'Last 7 Days',
					dateRange: { start: dateFunctions.addDays(new Date(), -7), end: new Date() }
				},{
					displayName: 'Last 30 Days',
					dateRange: { start: dateFunctions.addDays(new Date(), -30), end: new Date() }
				},{
					displayName: 'Last 90 Days',
					dateRange: { start: dateFunctions.addDays(new Date(), -90), end: new Date() }
				}]}
			/>
		</PopoverBase>
	</PopoverManager>
</DatePickerDemo>
```
