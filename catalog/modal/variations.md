## Modal with default footer

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
		.wide-content {
			width: 600px;
		}
		.button-container {
			margin-right: 16px;
		}
	`}
	</style>
	<Button primary medium onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		onClose={() => setState({ modal: false })}
		title="Location"
		subtitle="Help us locate you"
		footerProps={{
			commitButton: { text: 'Save', onClick: () => alert('Saved') },
			cancelButton: { text: 'Cancel', onClick: () => setState({ modal: !state.modal })},
			deleteButton: { text: 'Delete Forever', onClick: () => alert('Deleted') }
		}}
	>
		<div className="wide-content">
			<Input
				value={state.value}
				onChange={value => setState({ value: value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
				debounce={200}
			/>
		</div>
	</Modal>
</div>
```

## Modal with no delete option

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
		.wide-content {
			width: 600px;
		}
		.button-container {
			margin-right: 16px;
		}
	`}
	</style>
	<Button primary medium onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		onClose={() => setState({ modal: false })}
		title="Location"
		subtitle="Help us locate you"
		footerProps={{
			commitButton: { text: 'Save', onClick: () => alert('Saved') },
			cancelButton: { text: 'Cancel', onClick: () => setState({ modal: !state.modal })}
		}}
	>
		<div className="wide-content">
			<Input
				value={state.value}
				onChange={value => setState({ value: value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
				debounce={200}
			/>
		</div>
	</Modal>
</div>
```

## Modal with only a delete option

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
		.wide-content {
			width: 600px;
		}
		.button-container {
			margin-right: 16px;
		}
	`}
	</style>
	<Button primary medium onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		onClose={() => setState({ modal: false })}
		title="Location"
		subtitle="Help us locate you"
		footerProps={{
			deleteButton: { text: 'Delete Forever', onClick: () => alert('Deleted') }
		}}
	>
		<div className="wide-content">
			<Input
				value={state.value}
				onChange={value => setState({ value: value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
				debounce={200}
			/>
		</div>
	</Modal>
</div>
```

## Modal with custom footer

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
	<Modal
		isOpen={state.modal}
		onClose={() => setState({ modal: false })}
		title="Location"
		subtitle="Help us locate you"
		renderFooter={() => <ModalFooter>
				<div className="button-container">
					<Button primaryOutline medium onClick={() => setState({ modal: false })}>Option 1</Button>
				</div>
				<div className="button-container">
					<Button primaryOutline medium onClick={() => setState({ modal: false })}>Option 2</Button>
				</div>
				<div className="button-container">
					<Button primaryOutline medium onClick={() => setState({ modal: false })}>Option 3</Button>
				</div>
				<Button primary medium onClick={() => {}}>Yes!</Button>
			</ModalFooter>}
	>
		<div className="content">
			<Input
				value={state.value}
				onChange={value => setState({ value: value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
				debounce={200}
			/>
		</div>
	</Modal>
</div>
```
