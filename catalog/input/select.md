A typeahead control with keyboard navigation based on [React Select](https://react-select.com).

### Upgrading from v5 to v6

1. Import from `'@faithlife/styled-ui/text-input'` instead of `'@faithlife/styled-ui/dist/text-input-v2'`.
2. `onChange` behaves a bit differently now when `isMulti` is `true`. If one or more options are selected and then later all selected options are removed, upon the removal of the last option the value passed to `onChange` will be `null`. In v5, the value passed to `onChange` in this situation would have been `[]`. See the [React Select v3 upgrade guide](https://github.com/JedWatson/react-select/issues/3585) for more details.

### Note on customizing re-exported features from ReactSelect

If you want to use the [components](https://react-select.com/components) prop of the `<Select>` component to replace or extend the components supplied by ReactSelect, it is strongly recommended that you use the components exported by the same version of ReactSelect. For your convenience, Styled-UI re-exports this object for you as `reactSelectComponents`, and all the other exports from ReactSelect in the `reactSelectFunctions` export.

```code
import { Select, reactSelectComponents, reactSelectFunctions } from '@faithlife/styled-ui/text-input';
```

In v7 these exports come from React Select v5. In particular, use `reactSelectComponents.Input` for custom inputs rather than an Input from a separate v3 dependency. Preserve the supplied props/ref when adding attributes such as `autoComplete`. Inputs have the accessible role `combobox`, including non-searchable selects; tests should query that role rather than `textbox`.

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

`AsyncSelect` and `AsyncCreatableSelect` accept either callback-style `loadOptions(inputValue, callback)` or a loader returning a promise of options. If a loader does both, only its first completion is used. `debounceInterval` delays requests until typing pauses; `0` disables the delay.

Inline loaders can change identity on parent renders without dropping queued or in-flight requests. Queued requests use the latest loader and its captured data; already-started requests finish using the loader that started them. Changing the loader alone does not reload completed/cached options: issue a new query, change `cacheOptions` to invalidate the cache, or remount for new default options. Changing the debounce interval or removing the loader cancels and settles pending work; unmounting cancels without updating the unmounted component.

Failed current requests (including synchronous throws) settle loading and call `onLoadError(error, inputValue)` once. This optional **synchronous** callback should report the failure using your application's error UI. Without it, errors are explicitly reported with `console.error(error)`; no success-shaped option array is returned. Errors thrown by the reporter are logged as well, without leaving loading unsettled. Obsolete or unmounted requests do not report new failures. For example:

```jsx
<AsyncSelect
	loadOptions={search}
	onLoadError={(error, inputValue) => showSearchError(error, inputValue)}
/>
```

```react
showSource: true
state: { tags: [] }
---
const fetchMovies = async query => {
	await new Promise(resolve => setTimeout(resolve, 250));
	return movies
		.map((label, value) => ({ value, label }))
		.filter(({ label }) => label.toLowerCase().includes(query.toLowerCase()))
		.slice(0, 5);
};

<AsyncCreatableSelect
	placeholder="Search for movies"
	isMulti
	defaultOptions
	debounceInterval={100}
	loadOptions={fetchMovies}
/>
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
		{ value: "texas", label: "Texas", avatar: "https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA", "secondaryLabel": "The Lonestar State" },
		{ value: "arizona", label: "Arizona", avatar: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arizona.svg" },
		{ value: "florida", label: "Florida", avatar: "https://farm4.staticflickr.com/3495/3732163874_7677a346da_z.jpg" },
	]}
/>
```

### Custom Options select

```react
showSource: true
---
<CustomOptionsSelectDemo />
```

### Disabled state

```react
showSource: false
state: { selection: '' }
---
<div>
	<div>Current selection: {state.selection}</div>
	<Select
		disabled
		options={[
			{ value: "washington", label: "Washington" },
			{ value: "california", label: "California" },
			{ value: "Texas", label: "Texas" }
		]}
		value={{ value: "washington", label: "Washington" }}
	/>
</div>
```