A typeahead control with keyboard navigation.

Source: [`react-bootstrap-typeahead`](https://github.com/Faithlife/react-bootstrap-typeahead)

## How to use
See the [standard components](/bootstrap/components) page for details on how to import the stylesheet into your project.

[Component documentation](https://github.com/Faithlife/react-bootstrap-typeahead/blob/master/docs/Usage.md)

```
import { Bootstrap } from '@faithlife/styled-ui';
const { Typeahead } = Bootstrap;
```

```react
showSource: true
state: { selection: '' }
---
<Row>
	Current selection: {state.selection}
	<Typeahead
			onChange={value => { setState({ selection: value })}}
			options={['Washington','California','Texas']}
			placeholder="Choose a state..."
		/>
</Row>
```
