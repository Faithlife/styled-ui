Most Bootstrap 4 components can be used in existing projects, powered by Reactstrap.

```hint
These components require the [Faithlife Bootstrap base stylesheet](/bootstrap/stylesheet) to be loaded globally in your app.
```

## How to use

Import the scoped Bootstrap stylesheet into your application:
```
import { Bootstrap } from '@faithlife/styled-ui';

const { Button, InputGroup } = Bootstrap;

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
	<RowWithMargin>
		<Button className="m-1" color="primary">Primary</Button>
		<Button className="m-1" color="primary" outline>Outline</Button>
		<Button className="m-1" color="link">link</Button>
	</RowWithMargin>
	<RowWithMargin>
		<div><Button className="m-1" color="primary" size="sm">Small</Button></div>
		<div><Button className="m-1" color="primary" size="md">Medium</Button></div>
		<div><Button className="m-1" color="primary" size="lg">Large</Button></div>
	</RowWithMargin>
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

