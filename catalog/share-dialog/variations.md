## Share Dialog with default footer

```react
showSource: true
state: { isOpen: false, shareUrl: 'https://examplecommunity.church/', message: 'Checkout our awesome church website' }
---
<ModalDemo>
	<Button primary medium onClick={() => setState({ isOpen: true })}>Open a modal!</Button>
	<ShareDialog
		isOpen={state.isOpen}
		shareUrl={state.shareUrl}
		message={state.message}
		onClose={() => setState({ isOpen: false })}
	/>
</ModalDemo>
```
