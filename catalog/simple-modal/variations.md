## Simple Modal

Simple modal does not have any internal padding or features. Only contains an absolute positioned close button in the corner.
Consider using the new v6 Modal: [/v6 Modal Examples](/modal/v6)

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<SimpleModal
		isOpen={state.modal}
		onClose={() => setState({ modal: false })}
	>
		<SimpleModalDemoModalContent>
			<SimpleModalDemoSuccess>
				<svg x="0px" y="0px"
					viewBox="0 0 426.667 426.667">
					<path style={{fill: "#6AC259" }} d="M213.333,0C95.518,0,0,95.514,0,213.333s95.518,213.333,213.333,213.333
					c117.828,0,213.333-95.514,213.333-213.333S331.157,0,213.333,0z M174.199,322.918l-93.935-93.931l31.309-31.309l62.626,62.622
					l140.894-140.898l31.309,31.309L174.199,322.918z"/>
				</svg>
			</SimpleModalDemoSuccess>
			<div>Success!</div>
			<SimpleModalDemoMessage>Wide content that goes all the way to the edge.</SimpleModalDemoMessage>
		</SimpleModalDemoModalContent>
	</SimpleModal>
</div>
```
