## Modal with default footer

```react
showSource: true
state: { modal: false, value: '' }
---
<ModalDemo>
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
				onChange={value => setState({ value: value.value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
			/>
		</div>
	</Modal>
</ModalDemo>
```

## Modal with no delete option

```react
showSource: true
state: { modal: false, value: '' }
---
<ModalDemo>
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
</ModalDemo>
```

## Modal with only a delete option

```react
showSource: true
state: { modal: false, value: '' }
---
<ModalDemo>
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
</ModalDemo>
```

## Modal with stacked buttons

Modal buttons stack at 320px for 3 buttons configurations and 220px for 1 or 2 button configurations.

```react
showSource: true
state: { modal: false, value: '' }
---
<ModalDemo>
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
		<div className="stacked-content">
			<Input
				value={state.value}
				onChange={value => setState({ value: value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
				debounce={200}
			/>
		</div>
	</Modal>
</ModalDemo>
```

## Modal with custom footer

```react
showSource: true
state: { modal: false, value: '' }
---
<ModalDemo>
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
</ModalDemo>
```

## Modal with no footer

```react
showSource: true
state: { modal: false, value: '' }
---
<ModalDemo>
	<Button primary medium onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		onClose={() => setState({ modal: false })}
		title="Location"
		subtitle="Help us locate you"
		withoutFooter
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
</ModalDemo>
```

## Modal with really long content

```react
showSource: true
state: { modal: false, value: '' }
---
<ModalDemo>
	<Button primary medium onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		onClose={() => setState({ modal: false })}
		title="Lots of content"
	>
		<div className="content">
			{JSON.stringify(new Array(1000))}
		</div>
	</Modal>
</ModalDemo>
```
## Modal with no title border 

```react
showSource: true
state: { modal: false, value: '' }
---
<ModalDemo>
	<Button primary medium onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		onClose={() => setState({ modal: false })}
		title="Modal with no title border"
		styleOverrides={{ bottomBorder: 'none' }}
	>
		<div className="content">
			This modal has no title border!
		</div>
	</Modal>
</ModalDemo>
```
