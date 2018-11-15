## Modal with default footer

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
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
		<ModalDemoWideContent>
			<Input
				value={state.value}
				onChange={value => setState({ value: value.value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
			/>
		</ModalDemoWideContent>
	</Modal>
</div>
```

## Modal with no delete option

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
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
		<ModalDemoWideContent>
			<Input
				value={state.value}
				onChange={value => setState({ value: value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
				debounce={200}
			/>
		</ModalDemoWideContent>
	</Modal>
</div>
```

## Modal with only a delete option

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
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
		<ModalDemoWideContent>
			<Input
				value={state.value}
				onChange={value => setState({ value: value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
				debounce={200}
			/>
		</ModalDemoWideContent>
	</Modal>
</div>
```

## Modal with stacked buttons

Modal buttons stack at 320px for 3 buttons configurations and 220px for 1 or 2 button configurations.

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
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
		<ModalDemoStackedContent>
			<Input
				value={state.value}
				onChange={value => setState({ value: value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
				debounce={200}
			/>
		</ModalDemoStackedContent>
	</Modal>
</div>
```

## Modal with custom footer

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
	<Button primary medium onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		onClose={() => setState({ modal: false })}
		title="Location"
		subtitle="Help us locate you"
		renderFooter={() => <ModalFooter>
				<ModalDemoButtonContainer>
					<Button primaryOutline medium onClick={() => setState({ modal: false })}>Option 1</Button>
				</ModalDemoButtonContainer>
				<ModalDemoButtonContainer>
					<Button primaryOutline medium onClick={() => setState({ modal: false })}>Option 2</Button>
				</ModalDemoButtonContainer>
				<ModalDemoButtonContainer>
					<Button primaryOutline medium onClick={() => setState({ modal: false })}>Option 3</Button>
				</ModalDemoButtonContainer>
				<Button primary medium onClick={() => {}}>Yes!</Button>
			</ModalFooter>}
	>
		<ModalDemoWideContent>
			<Input
				value={state.value}
				onChange={value => setState({ value: value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
				debounce={200}
			/>
		</ModalDemoWideContent>
	</Modal>
</div>
```

## Modal with no footer

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
	<Button primary medium onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		onClose={() => setState({ modal: false })}
		title="Location"
		subtitle="Help us locate you"
		withoutFooter
	>
		<ModalDemoContent>
			<Input
				value={state.value}
				onChange={value => setState({ value: value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
				debounce={200}
			/>
		</ModalDemoContent>
	</Modal>
</div>
```

## Modal with really long content

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
	<Button primary medium onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		onClose={() => setState({ modal: false })}
		title="Lots of content"
	>
		<ModalDemoContent>
			{JSON.stringify(new Array(1000))}
		</ModalDemoContent>
	</Modal>
</div>
```

## Modal with no title border

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
	<Button primary medium onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		onClose={() => setState({ modal: false })}
		title="Modal with no title border"
		styleOverrides={{ bottomBorder: 'none' }}
	>
		<ModalDemoContent>
			This modal has no title border!
		</ModalDemoContent>
	</Modal>
</div>
```
