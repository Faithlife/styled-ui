## Popover

```react
showSource: true
state: { isOpen: false }
---
<DropdownDemo>
	<Dropdown isOpen={state.isOpen} onToggleIsOpen={() => setState({ isOpen: false })}>
		<DropdownToggle primary medium onToggleMenu={() => setState({ isOpen: !state.isOpen })}>Show a Dropdown!</DropdownToggle>
		<DropdownMenu>
			<MenuItem onClick={() => { alert("Menu Item 1") }}>Menu Item 1</MenuItem>
			<MenuItem onClick={() => { alert("Menu Item 2") }}>Menu Item 2</MenuItem>
			<MenuItem onClick={() => { alert("Menu Item 3") }}>Menu Item 3</MenuItem>
		</DropdownMenu>
	</Dropdown>
</DropdownDemo>
```
