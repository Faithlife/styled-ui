## Share Dialog with default footer

```react
showSource: true
state: { isOpen: false, shareUrl: 'facebook.com' }
---
<ModalDemo>
	<Button primary medium onClick={() => setState({ isOpen: true })}>Open a modal!</Button>
	<ShareDialog
		isOpen={state.isOpen}
		shareUrl={state.shareUrl}
		onClose={() => setState({ isOpen: false })}
	/>
</ModalDemo>
```
