A typeahead control with keyboard navigation based on [React Select](https://react-select.com).

### Upgrading from v5 to v6

1. Import from `'@faithlife/styled-ui/text-input'` instead of `'@faithlife/styled-ui/dist/text-input-v2'`.
2. `onChange` behaves a bit differently now when `isMulti` is `true`. If one or more options are selected and then later all selected options are removed, upon the removal of the last option the value passed to `onChange` will be `null`. In v5, the value passed to `onChange` in this situation would have been `[]`. See the [React Select v3 upgrade guide](https://github.com/JedWatson/react-select/issues/3585) for more details.

### Single select

```react
showSource: true
state: { selection: '' }
---
<div>
	<div>Current selection: {state.selection}</div>
	<Select
		onChange={selectedOption => setState({ selection: selectedOption ? selectedOption.value : '' })}
		options={[
			{ value: "washington", label: "Washington" },
			{ value: "california", label: "California" },
			{ value: "Texas", label: "Texas" }
		]}
		placeholder="Choose a state..."
	/>
</div>
```

### Single select without search

```react
showSource: true
state: { selection: '' }
---
<div>
	<div>Current selection: {state.selection}</div>
	<Select
		onChange={selectedOption => setState({ selection: selectedOption ? selectedOption.value : '' })}
		isSearchable={false}
		options={[
			{ value: "washington", label: "Washington" },
			{ value: "california", label: "California" },
			{ value: "Texas", label: "Texas" }
		]}
		placeholder="Choose a state..."
	/>
</div>
```

### Single select in a modal

```react
showSource: true
state: { modal: false, selection: '' }
---
<div>
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		container="body"
		onClose={() => setState({ modal: false })}
		title="Test"
		footerProps={{
			cancelButton: { text: 'Cancel', onClick: () => setState({ modal: !state.modal })},
		}}
	>
		<DemoDiv>
			<div>Current selection: {state.selection}</div>
			<Select
				onChange={selectedOption =>
					setState({ selection: selectedOption ? selectedOption.value : '' })}
				options={[
					{ value: "washington", label: "Washington" },
					{ value: "california", label: "California" },
					{ value: "Texas", label: "Texas" }
				]}
				placeholder="Choose a state..."
			/>
		</DemoDiv>
	</Modal>
</div>
```

### Multi select

```react
showSource: true
state: { selection: [] }
---
<div>
	<div>Current selection: {state.selection.join(', ')}</div>
	<Select
		onChange={(selectedOptions) => {
			setState({ selection: selectedOptions ? selectedOptions.map(option => option.value) : [] });
		}}
		isMulti
		options={[
			{ value: "washington", label: "Washington" },
			{ value: "california", label: "California" },
			{ value: "Texas", label: "Texas" }
		]}
		placeholder="Choose a state..."
	/>
</div>
```

### Multi select with custom entries

```react
showSource: true
state: { selection: [] }
---
<div>
	<div>Current selection: {state.selection.join(', ')}</div>
	<CreatableSelect
		onChange={(selectedOptions) => {
			setState({ selection: selectedOptions ? selectedOptions.map(option => option.value) : [] });
		}}
		isMulti
		options={[
			{ value: "washington", label: "Washington" },
			{ value: "california", label: "California" },
			{ value: "Texas", label: "Texas" }
		]}
		placeholder="Choose a state..."
	/>
</div>
```

### Multi select with checkbox add

```react
showSource: true
state: { selection: [], pendingSelectedValues: [{value: 'Texas', label: 'Texas'}] }
---
<div>
	<div>Current selection: {state.selection.join(', ')}</div>
	<CreatableSelect
		onChange={(selectedOptions) => {
			setState({ selection: selectedOptions ? selectedOptions.map(option => option.value) : [] });
		}}
		isMulti
		options={[
			{ value: "washington", label: "Washington" },
			{ value: "california", label: "California" },
			{ value: "Texas", label: "Texas" }
		]}
		showCheckboxes={true}
		getIsOptionChecked={(data) => {
			return data.value && !!state.pendingSelectedValues.find((x) => x.value === data.value);
		}}
		placeholder="Choose a state..."
	/>
</div>
```

### Async select

```react
showSource: true
state: { tags: [] }
---
<AsyncSelectDemo />
```

### Avatar Select

```react
showSource: true
---
<Select
	components={avatarComponents}
	isMulti
	options={[
		{ value: "california", label: "California" },
		{ value: "washington", label: "Washington", avatar: "https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA" },
		{ value: "texas", label: "Texas", avatar: "https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA", "secondaryLabel": "The Lonestar State" }
	]}
/>
```

### Custom Options select

```react
showSource: true
---
<CustomOptionsSelectDemo />
```
