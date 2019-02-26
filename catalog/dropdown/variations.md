## Dropdown

Note the toggle function being passed to the Button.

```react
showSource: true
---
<DropdownDemo>
	<Dropdown>
		<DropdownToggle>
			{toggleDropdown => <Button primary medium onClick={toggleDropdown}>Show a dropdown!</Button>}
		</DropdownToggle>
		<DropdownMenu>
			<DropdownItem onClick={()=>{}}>Blue</DropdownItem>
			<DropdownItem onClick={()=>{}}>Green</DropdownItem>
		</DropdownMenu>
	</Dropdown>
</DropdownDemo>
```

## Variations

All props available to a normal popover are available to a `DropdownMenu` (except `isOpen`). You can also pass a `childrenTheme` property to the theme prop. It has the same shape as the `localTheme` of the `DropdownItem`.

```react
showSource: true
---
<DropdownDemo>
	<Dropdown>
		<DropdownToggle>
			{toggleDropdown => <Button primary medium onClick={toggleDropdown}>Show a wide dropdown!</Button>}
		</DropdownToggle>
		<DropdownMenu styleOverrides={{ minWidth: 130 }}>
			<DropdownItem onClick={()=>{}}>Blue</DropdownItem>
			<DropdownItem onClick={()=>{}}>Green</DropdownItem>
		</DropdownMenu>
	</Dropdown>
	<Dropdown>
		<DropdownToggle>
			{toggleDropdown => <Button primary medium onClick={toggleDropdown}>Show a dropdown on the right!</Button>}
		</DropdownToggle>
		<DropdownMenu styleOverrides={{ minWidth: 130 }} placement="bottom-end">
			<DropdownItem onClick={()=>{}}>Blue</DropdownItem>
			<DropdownItem onClick={()=>{}}>Green</DropdownItem>
		</DropdownMenu>
	</Dropdown>
	<Dropdown>
		<DropdownToggle>
			{toggleDropdown => <Button primary medium onClick={toggleDropdown}>Show a styled dropdown!</Button>}
		</DropdownToggle>
		<DropdownMenu theme={{ childrenTheme: { hoverBackgroudColor: 'plum', textColor: 'green' } }}>
			<DropdownItem onClick={()=>{}} localTheme={{ textColor: 'blue' }}>Blue</DropdownItem>
			<DropdownItem onClick={()=>{}}>Green</DropdownItem>
		</DropdownMenu>
	</Dropdown>
</DropdownDemo>
```
