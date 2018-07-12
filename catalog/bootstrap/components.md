Most Bootstrap 4 components can be used in existing projects, powered by Reactstrap.

Bootstrap components expect an opinionated CSS reset to be present. When using a component from this library, it will be automatically wrapped in an outer container element with the CSS reset styles applied to it. If the component contains other Bootstrap components (e.g. a group of form elements), only the outer-most component will be wrapped.

## How to use

Import the scoped Bootstrap stylesheet into your application:
```
import { Bootstrap } from '@faithlife/styled-ui';
import '@faithlife/styled-ui/dist/main.css';

const MyComponent = props => <Button color="primary">primary</Button>;

```

See the [Reactstrap](https://reactstrap.github.io/) documentation for the component documentation.

## Examples

```hint
Click the <> on the right to view the sample source.
```

### Buttons

```react
showSource: false
---
<div>
	<Button color="primary">primary</Button>{' '}
	<Button color="secondary">secondary</Button>{' '}
	<Button color="success">success</Button>{' '}
	<Button color="info">info</Button>{' '}
	<Button color="warning">warning</Button>{' '}
	<Button color="danger">danger</Button>{' '}
	<Button color="link">link</Button>
	</div>
```

### Button with Dropdown

```react
showSource: false
state: { isOpen: false }
---
<div>
<ButtonDropdown isOpen={state.isOpen} toggle={() => setState({ isOpen: !state.isOpen })}>
	<Button id="caret" color="primary">Split Button</Button>
	<DropdownToggle caret color="primary" />
	<DropdownMenu>
		<DropdownItem header>Header</DropdownItem>
		<DropdownItem disabled>Action</DropdownItem>
		<DropdownItem>Another Action</DropdownItem>
		<DropdownItem divider/>
		<DropdownItem>Another Action</DropdownItem>
	</DropdownMenu>
</ButtonDropdown>
</div>
```

## Modal

```react
showSource: false
state: { modal: false }
---
<div>
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

## Alerts

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

## Navbar

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

## Carousel

```react
showSource: false
---
<div>
	<CarouselDemo />
</div>
```

```react
showSource: flase
---
<Row>
	<div className="text-center">0%</div>
	<Progress />
	<div className="text-center">25%</div>
	<Progress value="25" />
	<div className="text-center">50%</div>
	<Progress value={50} />
	<div className="text-center">75%</div>
	<Progress value={75} />
	<div className="text-center">100%</div>
	<Progress value="100" />
	<div className="text-center">Multiple bars</div>
	<Progress multi>
		<Progress bar value="15" />
		<Progress bar color="success" value="30" />
		<Progress bar color="info" value="25" />
		<Progress bar color="warning" value="20" />
		<Progress bar color="danger" value="5" />
	</Progress>
</Row>
```

## List group

```react
showSource: false
---
<div>
	<ListGroup>
		<ListGroupItem>Cras justo odio</ListGroupItem>
		<ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
		<ListGroupItem>Morbi leo risus</ListGroupItem>
		<ListGroupItem>Porta ac consectetur ac</ListGroupItem>
		<ListGroupItem>Vestibulum at eros</ListGroupItem>
	</ListGroup>
</div>
```

## Input Groups

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

## Forms

```react
showSource: false
---
<div>
	<Form>
		<FormGroup>
			<Label for="exampleCheckbox">Checkboxes</Label>
			<div>
				<CustomInput type="checkbox" id="exampleCustomCheckbox" label="Check this custom checkbox" />
				<CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Or this one" />
				<CustomInput type="checkbox" id="exampleCustomCheckbox3" label="But not this disabled one" disabled />
			</div>
		</FormGroup>
		<FormGroup>
			<Label for="exampleCheckbox">Radios</Label>
			<div>
				<CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Select this custom radio" />
				<CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Or this one" />
				<CustomInput type="radio" id="exampleCustomRadio3" label="But not this disabled one" disabled />
			</div>
		</FormGroup>
		<FormGroup>
			<Label for="exampleCheckbox">Inline</Label>
			<div>
				<CustomInput type="checkbox" id="exampleCustomInline" label="An inline custom input" inline />
				<CustomInput type="checkbox" id="exampleCustomInline2" label="and another one" inline />
			</div>
		</FormGroup>
		<FormGroup>
			<Label for="exampleCustomSelect">Custom Select</Label>
			<CustomInput type="select" id="exampleCustomSelect" name="customSelect">
				<option value="">Select</option>
				<option>Value 1</option>
				<option>Value 2</option>
				<option>Value 3</option>
				<option>Value 4</option>
				<option>Value 5</option>
			</CustomInput>
		</FormGroup>
		<FormGroup>
			<Label for="exampleCustomMutlipleSelect">Custom Multiple Select</Label>
			<CustomInput type="select" id="exampleCustomMutlipleSelect" name="customSelect" multiple>
				<option value="">Select</option>
				<option>Value 1</option>
				<option>Value 2</option>
				<option>Value 3</option>
				<option>Value 4</option>
				<option>Value 5</option>
			</CustomInput>
		</FormGroup>
		<FormGroup>
			<Label for="exampleCustomSelectDisabled">Custom Select Disabled</Label>
			<CustomInput type="select" id="exampleCustomSelectDisabled" name="customSelect" disabled>
				<option value="">Select</option>
				<option>Value 1</option>
				<option>Value 2</option>
				<option>Value 3</option>
				<option>Value 4</option>
				<option>Value 5</option>
			</CustomInput>
		</FormGroup>
		<FormGroup>
			<Label for="exampleCustomMutlipleSelectDisabled">Custom Multiple Select Disabled</Label>
			<CustomInput type="select" id="exampleCustomMutlipleSelectDisabled" name="customSelect" multiple disabled>
				<option value="">Select</option>
				<option>Value 1</option>
				<option>Value 2</option>
				<option>Value 3</option>
				<option>Value 4</option>
				<option>Value 5</option>
			</CustomInput>
		</FormGroup>
		<FormGroup>
			<Label for="exampleCustomFileBrowser">File Browser</Label>
			<CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
		</FormGroup>
		<FormGroup>
			<Label for="exampleCustomFileBrowser">File Browser with Custom Label</Label>
			<CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label="Yo, pick a file!" />
		</FormGroup>
		<FormGroup>
			<Label for="exampleCustomFileBrowser">File Browser Disabled</Label>
			<CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" disabled />
		</FormGroup>
		<FormGroup>
			<Label for="exampleEmail">Input without validation</Label>
			<Input />
			<FormFeedback>You will not be able to see this</FormFeedback>
			<FormText>Example help text that remains unchanged.</FormText>
		</FormGroup>
		<FormGroup>
			<Label for="exampleEmail">Valid input</Label>
			<Input valid />
			<FormFeedback valid>Sweet! that name is available</FormFeedback>
			<FormText>Example help text that remains unchanged.</FormText>
		</FormGroup>
		<FormGroup>
			<Label for="examplePassword">Invalid input</Label>
			<Input invalid />
			<FormFeedback>Oh noes! that name is already taken</FormFeedback>
			<FormText>Example help text that remains unchanged.</FormText>
		</FormGroup>
	</Form>
</div>
```

