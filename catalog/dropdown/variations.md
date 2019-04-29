## Dropdown

```react
showSource: true
state: { isOpen: false }
---
<DropdownDemo>
	<Dropdown isOpen={state.isOpen} onToggleIsOpen={() => setState({ isOpen: false })}>
		<DropdownToggle onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
			{({ref, onKeyDown, onClick, ariaProps}) =>
				<Button primary medium ref={ref} onKeyDown={onKeyDown} onClick={onClick} {...ariaProps}>Show a Dropdown!</Button>}
		</DropdownToggle>
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
		<DropdownToggle onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
			{({ariaProps, ...toggleProps}) =>
				<Button primary medium {...toggleProps} {...ariaProps}>Show a Dropdown!</Button>}
		</DropdownToggle>
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

## Style Variations

```react
showSource: true
state: { isOpen: false, isChecked: false }
---
<DropdownDemo>
	<Dropdown
		theme={{ hoverBackgroundColor: 'plum', checkboxPrimary: 'darkslateblue', checkboxBorder: 'purple' }}
		styleOverrides={{ fontSize: '14px', padding: '4px' }}
		isOpen={state.isOpen}
		onToggleIsOpen={() => setState({ isOpen: false })}
	>
		<DropdownToggle onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
			{({ariaProps, ...toggleProps}) =>
				<Button primary medium {...toggleProps} {...ariaProps}>Show a Dropdown!</Button>}
		</DropdownToggle>
		<DropdownMenu>
			<MenuItem onClick={() => alert("Menu Item 1")}>Menu Item 1</MenuItem>
			<MenuCheckbox onClick={() => setState({ isChecked: !state.isChecked })} isChecked={state.isChecked}>Menu Checkbox</MenuCheckbox>
		</DropdownMenu>
	</Dropdown>
</DropdownDemo>
```
