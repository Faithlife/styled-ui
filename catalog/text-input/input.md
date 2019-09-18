### Small

```react
showSource: true
state: { value: 'Washington' }
---
<InputSpacer>
	<Input small value={state.value} onChange={event => setState({ value: event.target.value })} />
	<Button variant="primary" size="small">Search</Button>
</InputSpacer>
```

### Medium

```react
showSource: true
state: { value: 'Washington' }
---
<InputSpacer>
	<Input medium value={state.value} onChange={event => setState({ value: event.target.value })} />
	<Button variant="primary" size="medium">Search</Button>
</InputSpacer>
```

### Large

```react
showSource: true
state: { value: 'Washington' }
---
<InputSpacer>
	<Input large value={state.value} onChange={event => setState({ value: event.target.value })} />
	<Button variant="primary" size="large">Search</Button>
</InputSpacer>
```

### Textarea

```react
showSource: true
state: { value: '' }
---
<InputSpacer>
	<Input textarea placeholder='My favorite state is...' value={state.value} onChange={event => setState({ value: event.target.value })} styleOverrides={{ height: '120px', width: '280px' }} />
	<Button variant="primary" size="small">Search</Button>
</InputSpacer>
```
