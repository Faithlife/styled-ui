## Possible polyfill requirements

This component assumes the availability of the following APIs, which may require polyfills in your application:

- `ResizeObserver`

## Automatic layout for in-memory collections

## Modal with v6 API

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
	>
		<Modal.Header title="Location" subtitle="Help us locate you" />
		<Modal.Content width={['100vw', 400]}>
			<Input
				value={state.value}
				onChange={value => setState({ value: value.value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
			/>
		</Modal.Content>
		<Modal.Footer>
			<Modal.FooterButtons
				commitButton={{ text: 'Save', onClick: () => alert('Saved') }}
				cancelButton={{ text: 'Cancel', onClick: () => setState({ modal: !state.modal }) }}
				deleteButton={{ text: 'Delete Forever', onClick: () => alert('Deleted') }}
			/>
		</Modal.Footer>
	</Modal>
</div>
```

## Modal with 24px spacing and 24px title

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
		contentPadding={6}
	>
		<Modal.Header title="Location" subtitle="Help us locate you" textStyle={'h.24'} />
		<Modal.Content width={['100vw', 400]}>
			<Input
				value={state.value}
				onChange={value => setState({ value: value.value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
			/>
		</Modal.Content>
		<Modal.Footer>
			<Modal.FooterButtons
				commitButton={{ text: 'Save', onClick: () => alert('Saved') }}
				cancelButton={{ text: 'Cancel', onClick: () => setState({ modal: !state.modal }) }}
				deleteButton={{ text: 'Delete Forever', onClick: () => alert('Deleted') }}
			/>
		</Modal.Footer>
	</Modal>
</div>
```

## Modal with 16px title

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
	>
		<Modal.Header title="Location" subtitle="Help us locate you" textStyle={'h.16'} />
		<Modal.Content width={['100vw', 400]}>
			<Input
				value={state.value}
				onChange={value => setState({ value: value.value, isValid: value !== '' })}
				placeholder="Bellingham"
				title="Location"
			/>
		</Modal.Content>
		<Modal.Footer>
			<Modal.FooterButtons
				commitButton={{ text: 'Save', onClick: () => alert('Saved') }}
				cancelButton={{ text: 'Cancel', onClick: () => setState({ modal: !state.modal }) }}
				deleteButton={{ text: 'Delete Forever', onClick: () => alert('Deleted') }}
			/>
		</Modal.Footer>
	</Modal>
</div>
```

## Fullscreen modal

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
		contentPadding={6}
		fullscreen
	>
		<Modal.Header title="Fullscreen modal" textStyle="h.24" />
		<Modal.Content
			paddingX={0}
			paddingBottom={0}
		>
			<Box
				backgroundImage="url(https://www.bellinghamherald.com/news/local/l6de4z/picture53186905/alternates/LANDSCAPE_1140/Faithlife%201)"
				backgroundSize="cover"
				height="100%"
			>
				&nbsp;
			</Box>
		</Modal.Content>
	</Modal>
</div>
```

## Fullscreen modal with really long content

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
		fullscreen
	>
		<Modal.Header title="Fullscreen modal" textStyle="h.24" />
		<Modal.Content overflowY="auto">
			{JSON.stringify(new Array(3000))}
		</Modal.Content>
	</Modal>
</div>
```
