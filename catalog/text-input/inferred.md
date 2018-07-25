A text input control with a clickable inline confidence indicator.

## How to use
See the [standard components](/bootstrap/components) page for details on how to import the stylesheet into your project.

### Inferred typeahead

```
import { InferredTypeahead } from '@faithlife/styled-ui/dist/text-input.js';
```

```react
showSource: false
state: { value: 'Washington', confirmed: false }
---
<Row>
	<FormGroup>
		<Label>Current selection: {state.value}</Label>
		<InferredTypeahead
			confidence={state.confirmed ? null : 0.9}
			onChange={value => { setState({ value, confirmed: true })}}
			onConfirm={value => { setState({ confirmed: true })}}
			options={['Washington','California','Texas']}
			placeholder="Choose a state..."
			defaultInputValue={state.value}
		/>
	</FormGroup>
</Row>
```

### Inferred text input

```
import { InferredText } from '@faithlife/styled-ui/dist/text-input.js';
```

```react
showSource: false
state: { value: 'This value was guessed', confirmed: false }
---
<Row>
	<FormGroup>
		<Label>High Confidence</Label>
		<InferredText
			confidence={state.confirmed ? null : 0.9}
			onChange={e => setState({ value: e.target.value, confirmed: true })}
			onConfirm={() => setState({ confirmed: true })}
			value={state.value}
		/>
	</FormGroup>
</Row>
```

```react
showSource: false
state: { value: 'This value was guessed', confirmed: false }
---
<Row>
	<FormGroup>
		<Label>Medium Confidence</Label>
		<InferredText
			confidence={state.confirmed ? null : 0.7}
			onChange={e => setState({ value: e.target.value, confirmed: true })}
			onConfirm={() => setState({ confirmed: true })}
			value={state.value}
		/>
	</FormGroup>
</Row>
```

```react
showSource: false
state: { value: 'This value was guessed', confirmed: false }
---
<Row>
	<FormGroup>
		<Label>Low Confidence</Label>
		<InferredText
			confidence={state.confirmed ? null : 0.6}
			onChange={e => setState({ value: e.target.value, confirmed: true })}
			onConfirm={() => setState({ confirmed: true })}
			value={state.value}
		/>
	</FormGroup>
</Row>
```

## Component PropTypes
```react
noSource: true
---
<div>
	<DocgenTable component={InferredTypeahead} />
	<DocgenTable component={InferredText} />
</div>
```
