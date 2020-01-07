### Small

```react
showSource: true
state: { value: 'Washington' }
---
<InputSpacer>
	<Input variant="small" value={state.value} onChange={event => setState({ value: event.target.value })} />
	<Button variant="primary" size="small">Search</Button>
</InputSpacer>
```

### Medium

```react
showSource: true
state: { value: 'Washington' }
---
<InputSpacer>
	<Input variant="medium" value={state.value} onChange={event => setState({ value: event.target.value })} />
	<Button variant="primary" size="medium">Search</Button>
</InputSpacer>
```

### Large

```react
showSource: true
state: { value: 'Washington' }
---
<InputSpacer>
	<Input variant="large" value={state.value} onChange={event => setState({ value: event.target.value })} />
	<Button variant="primary" size="large">Search</Button>
</InputSpacer>
```

### Responsive

```react
showSource: true
state: { value: 'Washington' }
---
<InputSpacer>
	<Input variant={['medium', 'small']} value={state.value} onChange={event => setState({ value: event.target.value })} />
	<Button variant="primary" size={['medium', 'small']}>Search</Button>
</InputSpacer>
```

### Textarea

```react
showSource: true
state: { value: '' }
---
<InputSpacer>
	<Input textarea placeholder='My favorite state is...' value={state.value} onChange={event => setState({ value: event.target.value })} height="120px" width="280px" />
	<Button variant="primary" size="small">Search</Button>
</InputSpacer>
```

## FilterInput

Use in UI that needs to inline-filter a list.

```react
showSource: true
state: { value: 'Washington' }
---
<FilterInput variant="medium" value={state.value} onChange={event => setState({ value: event.target.value })} onClear={() => setState({ value: '' })} />
```

## Select on Focus

```react
showSource: true
state: { value: 'Washington' }
---
<Input selectOnFocus placeholder='My favorite state is...' value={state.value} onChange={event => setState({ value: event.target.value })} />
```
