## Modal with default footer

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		container="body"
		onClose={() => setState({ modal: false })}
		title="Location"
		subtitle="Help us locate you"
		footerProps={{
			commitButton: { text: 'Save', onClick: () => alert('Saved') },
			cancelButton: { text: 'Cancel', onClick: () => setState({ modal: !state.modal }) },
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

## Modal with spacious variant

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		container="body"
		onClose={() => setState({ modal: false })}
		title="Location"
		subtitle="Help us locate you"
		footerProps={{
			commitButton: { text: 'Save', onClick: () => alert('Saved') },
			cancelButton: { text: 'Cancel', onClick: () => setState({ modal: !state.modal }) },
			deleteButton: { text: 'Delete Forever', onClick: () => alert('Deleted') }
		}}
		variant="24px"
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

## Modal attached as child

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
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
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		container="body"
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
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		container="body"
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
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		container="body"
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
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		container="body"
		onClose={() => setState({ modal: false })}
		title="Location"
		subtitle="Help us locate you"
		renderFooter={() => <ModalFooter>
				<ModalDemoButtonContainer>
					<Button variant="primaryOutline" size="medium" onClick={() => setState({ modal: false })}>Option 1</Button>
				</ModalDemoButtonContainer>
				<ModalDemoButtonContainer>
					<Button variant="primaryOutline" size="medium" onClick={() => setState({ modal: false })}>Option 2</Button>
				</ModalDemoButtonContainer>
				<ModalDemoButtonContainer>
					<Button variant="primaryOutline" size="medium" onClick={() => setState({ modal: false })}>Option 3</Button>
				</ModalDemoButtonContainer>
				<Button variant="primary" size="medium" onClick={() => {}}>Yes!</Button>
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
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		container="body"
		onClose={() => setState({ modal: false })}
		title="Location"
		subtitle="Help us locate you"
		withoutFooter
	>
		<ModalContent paddingX={5} paddingBottom={5}>
			<Input
				value={state.value}
				onChange={value => setState({ value: value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
				debounce={200}
			/>
		</ModalContent>
	</Modal>
</div>
```

## Modal with really long content

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		container="body"
		onClose={() => setState({ modal: false })}
		title="Lots of content"
	>
		<div>
			{JSON.stringify(new Array(1000))}
		</div>
	</Modal>
</div>
```

## Modal with custom content padding

```react
showSource: true
state: { modal: false, value: '' }
---
<div>
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		container="body"
		onClose={() => setState({ modal: false })}
		title="Modal with full width content"
		withoutFooter
	>
		<ModalContent padding={0}>
			<img src="https://www.bellinghamherald.com/news/local/l6de4z/picture53186905/alternates/LANDSCAPE_1140/Faithlife%201" alt="Faithlife campus" style={{ display: 'block' }} />
		</ModalContent>
	</Modal>
</div>
```
