## Dropdown

```react
showSource: true
state: { isOpen: false }
---
<DropdownDemo>
	<Dropdown isOpen={state.isOpen} onToggleIsOpen={() => setState({ isOpen: false })}>
		<DropdownToggle primary medium onToggleMenu={() => setState({ isOpen: !state.isOpen })}>Show a Dropdown!</DropdownToggle>
		<DropdownMenu>
			<MenuItem onClick={() => alert("Menu Item 1")}>Menu Item 1</MenuItem>
			<MenuItem onClick={() => alert("Menu Item 2")}>Menu Item 2</MenuItem>
			<MenuItem onClick={() => alert("Menu Item 3")}>Menu Item 3</MenuItem>
		</DropdownMenu>
	</Dropdown>
</DropdownDemo>
```

## Dropdown Menu Items

```react
showSource: true
state: { isOpen: false, isChecked: false }
---
<DropdownDemo>
	<Dropdown isOpen={state.isOpen} onToggleIsOpen={() => setState({ isOpen: false })}>
		<DropdownToggle primary medium onToggleMenu={() => setState({ isOpen: !state.isOpen })}>Show a Dropdown!</DropdownToggle>
		<DropdownMenu>
			<h3>Dropdown</h3>
			<MenuSeparator />
			<MenuItem onClick={() => alert("Menu Item 1")}>Menu Item 1</MenuItem>
			<MenuItem disabled onClick={() => alert("Menu Item 2")}>Menu Item 2</MenuItem>
			<MenuCheckbox onClick={() => setState({ isChecked: !state.isChecked })} isChecked={state.isChecked}>Menu Checkbox</MenuCheckbox>
		</DropdownMenu>
	</Dropdown>
</DropdownDemo>
```
