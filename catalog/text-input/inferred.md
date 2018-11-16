A text input control with a clickable inline confidence indicator.

```hint|directive
These components require the [Faithlife Bootstrap base stylesheet](/bootstrap/stylesheet) to be loaded globally in your app.
```

### Inferred typeahead

```
import { InferredTypeahead } from '@faithlife/styled-ui/dist/text-input';
import '@faithlife/styled-ui/dist/text-input.css';
```

```react
showSource: false
state: { value: 'Washington', confirmed: false }
---
<div>
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
</div>
```

### Inferred text input

```
import { InferredText } from '@faithlife/styled-ui/dist/text-input';
```

```react
showSource: false
state: { value: 'This value was guessed', confirmed: false }
---
<div>
	<FormGroup>
		<Label>High Confidence</Label>
		<InferredText
			confidence={state.confirmed ? null : 0.9}
			onChange={e => setState({ value: e.target.value, confirmed: true })}
			onConfirm={() => setState({ confirmed: true })}
			value={state.value}
		/>
	</FormGroup>
</div>
```

```react
showSource: false
state: { value: 'This value was guessed', confirmed: false }
---
<div>
	<FormGroup>
		<Label>Medium Confidence</Label>
		<InferredText
			confidence={state.confirmed ? null : 0.7}
			onChange={e => setState({ value: e.target.value, confirmed: true })}
			onConfirm={() => setState({ confirmed: true })}
			value={state.value}
		/>
	</FormGroup>
</div>
```

```react
showSource: false
state: { value: 'This value was guessed', confirmed: false }
---
<div>
	<FormGroup>
		<Label>Low Confidence</Label>
		<InferredText
			confidence={state.confirmed ? null : 0.6}
			onChange={e => setState({ value: e.target.value, confirmed: true })}
			onConfirm={() => setState({ confirmed: true })}
			value={state.value}
		/>
	</FormGroup>
</div>
```

### Focusable Input
```react
showSource: false
---
<InferredTypeaheadFocusDemo />
```

```react
showSource: false
---
<InferredTextFocusDemo />
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
