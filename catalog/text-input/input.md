### Small

```react
state: { value: 'Washington' }
---
<InputSpacer>
	<Input small value={state.value} onChange={event => setState({ value: event.target.value })} />
	<Button small primary>Search</Button>
</InputSpacer>
```

### Medium

```react
state: { value: 'Washington' }
---
<InputSpacer>
	<Input medium value={state.value} onChange={event => setState({ value: event.target.value })} />
	<Button medium primary>Search</Button>
</InputSpacer>
```

### Large

```react
state: { value: 'Washington' }
---
<InputSpacer>
	<Input large value={state.value} onChange={event => setState({ value: event.target.value })} />
	<Button large primary>Search</Button>
</InputSpacer>
```
