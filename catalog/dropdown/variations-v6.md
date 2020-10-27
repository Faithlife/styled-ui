## Dropdown

```react
showSource: true
state: { isOpen: false }
---
<DropdownDemo>
	<Dropdown isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
		<Dropdown.Toggle>Show a Dropdown!</Dropdown.Toggle>
		<Dropdown.Menu>
			<Dropdown.Item onClick={() => alert("Menu Item 1")}>Menu Item 1</Dropdown.Item>
			<Dropdown.Item onClick={() => alert("Menu Item 2")}>Menu Item 2</Dropdown.Item>
			<Dropdown.Item onClick={() => alert("Menu Item 3")}>Menu Item 3</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
</DropdownDemo>
```
