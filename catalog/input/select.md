A typeahead control with keyboard navigation based on react-select.

[Component documentation](https://github.com/JedWatson/react-select)

### Migration guide from V1 to v2:

- Change the import to `text-input-v2` (see below)
- The dedicated CSS import is not required for v2. Delete the typeahead and bootstrap CSS imports when upgrading.
- `options` now requires an array of objects instead of strings
- `multiple` should be changed to `isMulti` enable the tags input

```
import { Select } from '@faithlife/styled-ui/dist/text-input-v2';
```

### Single select

```react
showSource: true
state: { selection: '' }
---
<div>
	<div>Current selection: {state.selection}</div>
	<Select
		onChange={({ value }) => {
			setState({ selection: value });
		}}
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
		onChange={({ value }) => {
			setState({ selection: value });
		}}
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
state: { modal: false, value: '', selection: '' }
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
				onChange={({ value }) => {
					setState({ selection: value });
				}}
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
state: { tags: [] }
---
<div>
	<div>Current selection: {state.selection}</div>
	<Select
		onChange={({ value }) => {
			setState({ selection: value });
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
state: { tags: [] }
---
<div>
	<div>Current selection: {state.selection}</div>
	<CreatableSelect
		onChange={({ value }) => {
			setState({ selection: value });
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

### Async select

```react
showSource: true
state: { tags: [] }
---
<AsyncSelectDemo />
```
