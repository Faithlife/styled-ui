A text input control with a clickable inline confidence indicator.

## How to use
See the [standard components](/bootstrap/components) page for details on how to import the stylesheet into your project.

```
import { Bootstrap } from '@faithlife/styled-ui';
const { InferredText } = Bootstrap;
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
<DocgenTable component={InferredText} />
```
