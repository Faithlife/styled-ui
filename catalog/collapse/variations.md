This is a straight port of the component from [Reactstrap](https://reactstrap.github.io/components/collapse/), using only `styled-components`

```react
state: { isOpen: false }
showSource: true
---
<div>
		<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })} style={{ marginBottom: '1rem' }}>Toggle</Button>
		<Collapse
			isOpen={state.isOpen}
		>
			<img src="https://www.bellinghamherald.com/news/local/l6de4z/picture53186905/alternates/LANDSCAPE_1140/Faithlife%201" alt="Faithlife campus" style={{ maxWidth: '100%' }} />
		</Collapse>
	</div>
```
