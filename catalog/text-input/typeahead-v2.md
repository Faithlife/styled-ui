A typeahead control with keyboard navigation based on react-select.

[Component documentation](https://github.com/JedWatson/react-select)

### Migration guide from V1 to v2:

The dedicated stylesheets are not required for v2. Delete the typeahead and boostrap CSS imports when upgrading.

```
import { Select } from '@faithlife/styled-ui/dist/text-input-v2';
```

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

### Tags demo
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
