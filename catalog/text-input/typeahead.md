A typeahead control with keyboard navigation.

```hint|directive
These components require the [Faithlife Bootstrap base stylesheet](/bootstrap/stylesheet) to be loaded globally in your app.
```

Source: [`react-bootstrap-typeahead`](https://github.com/Faithlife/react-bootstrap-typeahead)

[Component documentation](https://github.com/Faithlife/react-bootstrap-typeahead/blob/master/docs/Usage.md)
[More component demos](http://ericgio.github.io/react-bootstrap-typeahead/)

```
import { Typeahead } from '@faithlife/styled-ui/dist/text-input.js';
import '@faithlife/dist/text-input.css';
```

```react
showSource: true
state: { selection: '' }
---
<div>
	<FormGroup>
		<Label>Current selection: {state.selection}</Label>
		<Typeahead
			onChange={value => { setState({ selection: value })}}
			options={['Washington','California','Texas']}
			placeholder="Choose a state..."
		/>
	</FormGroup>
</div>
```

### Tags demo
```react
showSource: true
state: { tags: [] }
---
<div>
	<FormGroup>
		<Label>Current tags: {JSON.stringify(state.tags)}</Label>
		<Typeahead
			multiple
			allowNew
			onChange={value => { setState({ tags: value })}}
			options={['very cool','outrageous','slick']}
			placeholder="Add some tags..."
			newSelectionPrefix="New entry: "
			selectHintOnEnter
		/>
	</FormGroup>
</div>
```
