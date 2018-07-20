A typeahead control with keyboard navigation.

Source: [`react-bootstrap-typeahead`](https://github.com/Faithlife/react-bootstrap-typeahead)

## How to use
See the [standard components](/bootstrap/components) page for details on how to import the stylesheet into your project.

[Component documentation](https://github.com/Faithlife/react-bootstrap-typeahead/blob/master/docs/Usage.md)
[More component demos](http://ericgio.github.io/react-bootstrap-typeahead/)

```
import { Bootstrap } from '@faithlife/styled-ui';
const { Typeahead } = Bootstrap;
```

```react
showSource: true
state: { selection: '' }
---
<Row>
	<FormGroup>
		<Label>Current selection: {state.selection}</Label>
		<Typeahead
			onChange={value => { setState({ selection: value })}}
			options={['Washington','California','Texas']}
			placeholder="Choose a state..."
		/>
	</FormGroup>
</Row>
```

### Tags demo
```react
showSource: true
state: { tags: [] }
---
<Row>
	<FormGroup>
		<Label>Current tags: {JSON.stringify(state.tags)}</Label>
		<Typeahead
			multiple
			allowNew
			onChange={value => { setState({ tags: value })}}
			options={['very cool','outrageous','slick']}
			placeholder="Add some tags..."
		/>
	</FormGroup>
</Row>
```
