This is a demo of using bootstrap components.

Powered by [Reactstrap](https://reactstrap.github.io/)

```react
showSource: false
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
showSource: false
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
showSource: false
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

```react
showSource: false
state: { isOpen: false }
---
 <div>
	<Navbar color="light" light expand="md">
		<NavbarBrand href="/">reactstrap</NavbarBrand>
		<NavbarToggler onClick={() => setState({ isOpen: !state.isOpen})} />
		<Collapse isOpen={state.isOpen} navbar>
		<Nav className="ml-auto" navbar>
			<NavItem>
			<NavLink href="/components/">Components</NavLink>
			</NavItem>
			<NavItem>
			<NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
			</NavItem>
			<UncontrolledDropdown nav inNavbar>
			<DropdownToggle nav caret>
				Options
			</DropdownToggle>
			<DropdownMenu right>
				<DropdownItem>
				Option 1
				</DropdownItem>
				<DropdownItem>
				Option 2
				</DropdownItem>
				<DropdownItem divider />
				<DropdownItem>
				Reset
				</DropdownItem>
			</DropdownMenu>
			</UncontrolledDropdown>
		</Nav>
		</Collapse>
	</Navbar>
</div>
```

```react
showSource: false
state: { isOpen: false }
---
 <div>
	<InputGroup>
		<InputGroupAddon addonType="prepend">@</InputGroupAddon>
		<Input placeholder="username" />
	</InputGroup>
	<br />
	<InputGroup>
		<InputGroupAddon addonType="prepend">
			<InputGroupText>
				<Input addon type="checkbox" aria-label="Checkbox for following text input" />
			</InputGroupText>
		</InputGroupAddon>
		<Input placeholder="Check it out" />
	</InputGroup>
	<br />
	<InputGroup>
		<Input placeholder="username" />
		<InputGroupAddon addonType="append">@example.com</InputGroupAddon>
	</InputGroup>
	<br />
	<InputGroup>
		<InputGroupAddon addonType="prepend">
			<InputGroupText>$</InputGroupText>
			<InputGroupText>$</InputGroupText>
		</InputGroupAddon>
		<Input placeholder="Dolla dolla billz yo!" />
		<InputGroupAddon addonType="append">
			<InputGroupText>$</InputGroupText>
			<InputGroupText>$</InputGroupText>
		</InputGroupAddon>
	</InputGroup>
	<br />
	<InputGroup>
		<InputGroupAddon addonType="prepend">$</InputGroupAddon>
		<Input placeholder="Amount" type="number" step="1" />
		<InputGroupAddon addonType="append">.00</InputGroupAddon>
	</InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend"><Button>I'm a button</Button></InputGroupAddon>
          <Input />
        </InputGroup>
        <br />
        <InputGroup>
          <Input />
          <InputGroupButtonDropdown addonType="append" isOpen={state.dropdownOpen} toggle={() => setState({ dropdownOpen: !state.dropdownOpen})}>
            <DropdownToggle caret>
              Button Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupButtonDropdown addonType="prepend" isOpen={state.splitButtonOpen} toggle={() => setState({ splitButtonOpen: !state.splitButtonOpen}) }>
            <Button outline>Split Button</Button>
            <DropdownToggle split outline />
            <DropdownMenu>
              <DropdownItem header>Header</DropdownItem>
              <DropdownItem disabled>Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Another Action</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input placeholder="and..." />
          <InputGroupAddon addonType="append"><Button color="secondary">I'm a button</Button></InputGroupAddon>
        </InputGroup>
</div>

```
