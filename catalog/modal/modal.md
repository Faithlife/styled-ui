## Modal

```react
showSource: true
state: { modal: false }
---
<div  className="container">
	<style>
	{`
		.container {
			font-family: 'Source Sans Pro';
			color: #333333;
		}
		.content {
			width: 100%;
		}
		.button-container {
			margin-right: 16px;
		}
	`}
	</style>
	<Button primary medium onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal isOpen={state.modal} onClose={() => setState({ modal: false })} title="Location" subtitle="Help us locate you">
		<div className="content">
			<Input
				value={state.value}
				onChange={value => setState({ value: value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
				debounce={200}
			/>
			<ModalFooter>
				<div className="button-container">
					<Button primaryOutline medium onClick={() => setState({ modal: false })}>Cancel</Button>
				</div>
				<Button primary medium onClick={() => {}}>Commit</Button>
			</ModalFooter>
		</div>
	</Modal>
</div>
```
