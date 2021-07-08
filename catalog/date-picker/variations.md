```react
noSource: true
---
<React.Fragment>
	<VNextBanner v6Hash="date-picker/v6" />
</React.Fragment>
```

## Date Picker

Date pickers require date functions to be be provided to it either through context via `DateFunctionsContextProvider` or through the `dateFunctions` prop.

The current date function providers are:

- date-fns v2: `import DateFunctions from '@faithlife/styled-ui/date-functions/date-fns';`

```react
showSource: true
state: { selectedDate: null }
---
<Stack spacing={3} width="250px">
	<DateFunctionsContextProvider dateFunctions={DateFunctions}>
		<span>The selected date is {formatDate(state.selectedDate)}</span>
		<Button ref={refs[0]} onClick={() => setState({ isOpen: !state.isOpen })}>Select Date</Button>
		{state.isOpen && (
			<Popover reference={refs[0].current} placement="right" onFocusAway={() => setState({ isOpen: false })}>
				<DatePicker
					value={state.selectedDate}
					onChange={(date) => setState({ selectedDate: date })}
				/>
			</Popover>
		)}
	</DateFunctionsContextProvider>
</Stack>
```

## Day Picker

When a day is selected the `onChange` will be called with the number of the day of the week selected (0 = Sunday)

```react
showSource: true
state: { selectedDay: null }
---
<Stack spacing={3} width="200px">
	<DateFunctionsContextProvider dateFunctions={DateFunctions}>
		<span>The selected day is {`${state.selectedDay}`}</span>
		<Button ref={refs[3]} onClick={() => setState({ isOpen: !state.isOpen })}>Select Date</Button>
		{state.isOpen && (
			<Popover reference={refs[3].current} placement="right" onFocusAway={() => setState({ isOpen: false })}>
				<DayPicker
					value={state.selectedDay}
					onChange={(date) => setState({ selectedDay: date })}
				/>
			</Popover>
		)}
	</DateFunctionsContextProvider>
</Stack>
```

## Localization

```react
showSource: true
state: { selectedDate: null }
---
{/* import DateFunctions from '@faithlife/styled-ui/date-functions/date-fns' */}
{/* import ru from 'date-fns/locale/ru' */}
{/* const russianLocaleDateFunctions = new DateFunctions({ locale: ru }); */}

<Stack spacing={3} width="250px">
	<span>The selected date is {formatDate(state.selectedDate)}</span>
	<Button ref={refs[1]} onClick={() => setState({ isOpen: !state.isOpen })}>Select Date</Button>
	{state.isOpen && (
		<Popover reference={refs[1].current} placement="right" onFocusAway={() => setState({ isOpen: false })}>
			<DatePicker
				value={state.selectedDate}
				onChange={(date) => setState({ selectedDate: date })}
				dateFunctions={russianLocaleDateFunctions}
			/>
		</Popover>
	)}
</Stack>
```
