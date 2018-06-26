### Inferred inputs

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
