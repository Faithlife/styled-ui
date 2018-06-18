This is a demo of using bootstrap components.

Powered by [Reactstrap](https://reactstrap.github.io/)

```react
showSource: true
---
<div className="container"><style>{`.container > * { margin: 8px; }`}</style>
	<Button color="primary">primary</Button>{' '}
	<Button color="secondary">secondary</Button>{' '}
	<Button color="success">success</Button>{' '}
	<Button color="info">info</Button>{' '}
	<Button color="warning">warning</Button>{' '}
	<Button color="danger">danger</Button>{' '}
	<Button color="link">link</Button>
</div>
```

```react
showSource: true
state: { modal: false }
---
<div className="container"><style>{`.container > * { margin: 8px; }`}</style>
	<Button color="danger" onClick={() => setState({ modal: !state.modal })}>CLICK ME</Button>
	<Modal isOpen={state.modal} toggle={() => setState({ modal: !state.modal })}>
		<ModalHeader toggle={() => setState({ modal: !state.modal })}>Modal title</ModalHeader>
		<ModalBody>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</ModalBody>
		<ModalFooter>
		<Button color="primary" onClick={() => setState({ modal: !state.modal })}>Do Something</Button>{' '}
		<Button color="secondary" onClick={() => setState({ modal: !state.modal })}>Cancel</Button>
		</ModalFooter>
	</Modal>
</div>
```

```react
showSource: true
---
<div>
	<Alert color="primary">
		This is a primary alert — check it out!
	</Alert>
	<Alert color="secondary">
		This is a secondary alert — check it out!
	</Alert>
	<Alert color="success">
		This is a success alert — check it out!
	</Alert>
	<Alert color="danger">
		This is a danger alert — check it out!
	</Alert>
	<Alert color="warning">
		This is a warning alert — check it out!
	</Alert>
	<Alert color="info">
		This is a info alert — check it out!
	</Alert>
	<Alert color="light">
		This is a light alert — check it out!
	</Alert>
	<Alert color="dark">
		This is a dark alert — check it out!
	</Alert>
</div>
```
