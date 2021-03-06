```react
noSource: true
---
<React.Fragment>
	<V6Banner>
		<AcceptsStyledSystemProps />
	</V6Banner>
</React.Fragment>
```

## Possible polyfill requirements

This component assumes the availability of the following APIs, which may require polyfills in your application:

- `ResizeObserver`

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

## Scrolling Modal with overflowing Dropdown Menu

The modal will automatically scroll when content is longer than the page height

```react
showSource: true
state: { modal: false, dropdown: false, value: '' }
---
<div>
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		container="body"
		onClose={() => setState({ modal: false })}
	>
		<Modal.Header title="Location" subtitle="Help us locate you" />
		<Modal.Content width={['100vw', 475]}>
			{JSON.stringify(new Array(3000), null, '\t')}
			<Menu isOpen={state.dropdown} onToggleMenu={() => setState({dropdown: !state.dropdown})}>
				<Menu.Toggle>Show a Dropdown Menu!</Menu.Toggle>
				<Menu.Dropdown>
					<Menu.Item onClick={() => {}}>Banana</Menu.Item>
					<Menu.Item onClick={() => {}}>Banana</Menu.Item>
					<Menu.Item onClick={() => {}}>Banana</Menu.Item>
					<Menu.Item onClick={() => {}}>Banana</Menu.Item>
					<Menu.Item onClick={() => {}}>Banana</Menu.Item>
					<Menu.Item onClick={() => {}}>Banana</Menu.Item>
					<Menu.Item onClick={() => {}}>Orange you glad I didn't say "banana"?</Menu.Item>
				</Menu.Dropdown>
			</Menu>
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

## Fullscreen modal with custom header actions

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
		<Modal.Header
			title="Fullscreen modal"
			textStyle="h.24"
			message={`Autosaved at ${new Date().toString()}`}
			actions={<Box display="grid" gridAutoFlow="column" gridAutoColumns="min-content" gridGap={[3,5]}>
				<Button size={['medium', 'small']} minWidth={78} variant="secondary" onClick={() => setState({ modal: !state.modal })}>
					Cancel
				</Button>
				<Button size={['medium', 'small']} minWidth={78} variant="primary" onClick={() => setState({ modal: !state.modal })}>
					Save
				</Button>
			</Box>}
		/>
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
		<Modal.Content paddingBottom={0}>
			{JSON.stringify(new Array(3000))}
		</Modal.Content>
	</Modal>
</div>
```

## Modal with no content

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
	/>
</div>
```
