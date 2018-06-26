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
			label="No confidence"
			confidence={state.confirmed ? null : 'high'}
			onChange={e => setState({ value: e.target.value })}
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
			label="No confidence"
			confidence={state.confirmed ? null : 'medium'}
			onChange={e => setState({ value: e.target.value })}
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
			label="No confidence"
			confidence={state.confirmed ? null : 'low'}
			onChange={e => setState({ value: e.target.value })}
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
