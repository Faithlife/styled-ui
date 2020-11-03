## Dropdown v6

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
			<Dropdown.Item disabled onClick={() => alert("Menu Item 3")}>Menu Item 3</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
</DropdownDemo>
```

## Split Dropdown Toggle

```react
showSource: true
state: { isOpen: false }
---
<DropdownDemo>
	<Dropdown isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
		<Dropdown.Toggle>
			<Dropdown.ActionButton onClick={() => alert("Different Action")}>Show a Dropdown!</Dropdown.ActionButton>
		</Dropdown.Toggle>
		<Dropdown.Menu>
			<Dropdown.Item onClick={() => alert("Menu Item 1")}>Menu Item 1</Dropdown.Item>
			<Dropdown.Item onClick={() => alert("Menu Item 2")}>Menu Item 2</Dropdown.Item>
			<Dropdown.Item disabled onClick={() => alert("Menu Item 3")}>Menu Item 3</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
</DropdownDemo>
```

## Dropdown Menu Items

```react
showSource: true
state: { isOpen: false, isChecked: false }
---
<DropdownDemo>
	<Dropdown isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
		<Dropdown.Toggle>Show a Dropdown!</Dropdown.Toggle>
		<Dropdown.Menu>
			<Dropdown.Title>Dropdown</Dropdown.Title>
			<Dropdown.Separator />
			<Dropdown.Item onClick={() => alert("Menu Item")}>Menu Item</Dropdown.Item>
			<Dropdown.CheckboxItem isChecked={state.isChecked} onToggle={() => setState({ isChecked: !state.isChecked })}>Menu Checkbox</Dropdown.CheckboxItem>
			<Dropdown.LinkItem href="https://faithlife.github.io/styled-ui/#/icons" target="_blank">Menu Link</Dropdown.LinkItem>
		</Dropdown.Menu>
	</Dropdown>
</DropdownDemo>
```

## Using custom toggle component

```react
showSource: true
state: { isOpen: false }
---
<DropdownDemo>
	<Dropdown isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
		<Dropdown.Toggle>
			{(ref, {onKeyDown, onClick, ariaProps}) =>
				<Button variant="primary" size="medium" ref={ref} onKeyDown={onKeyDown} onClick={onClick} {...ariaProps}>Show a Dropdown!</Button>}
		</Dropdown.Toggle>
		<Dropdown.Menu>
			<Dropdown.Item onClick={() => alert("Menu Item 1")}>Menu Item 1</Dropdown.Item>
			<Dropdown.Item onClick={() => alert("Menu Item 2")}>Menu Item 2</Dropdown.Item>
			<Dropdown.Item onClick={() => alert("Menu Item 3")}>Menu Item 3</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
</DropdownDemo>
```

## With icon

variant = icon | thumbnail | avatar

```react
showSource: true
state: { isOpen: false }
---
<DropdownDemo>
	<Dropdown isOpen={state.isOpen} width="280px" onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
		<Dropdown.Toggle>Show a Dropdown!</Dropdown.Toggle>
		<Dropdown.Menu>
			<Dropdown.Item onClick={() => alert("Menu Item 1")}>
				<Dropdown.ItemIcon><FavoriteFilled /></Dropdown.ItemIcon>
				<Dropdown.ItemPrimaryText>Menu Item 1</Dropdown.ItemPrimaryText>
				<Dropdown.ItemSecondaryText>Variant = Icon</Dropdown.ItemSecondaryText>
			</Dropdown.Item>
			<Dropdown.Item onClick={() => alert("Menu Item 2")}>
				<Dropdown.ItemIcon src={thumbnailSrc} variant="thumbnail" />
				<Dropdown.ItemPrimaryText>Menu Item 2</Dropdown.ItemPrimaryText>
				<Dropdown.ItemSecondaryText>Variant = Thumbnail</Dropdown.ItemSecondaryText>
			</Dropdown.Item>
			<Dropdown.Item onClick={() => alert("Menu Item 3")}>
				<Dropdown.ItemIcon src={avatarSrc} variant="avatar" />
				<Dropdown.ItemPrimaryText fontWeight={1}>Menu Item 3 (Avatar)</Dropdown.ItemPrimaryText>
			</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
</DropdownDemo>
```

## Styling

Toggle, Menu, Title, Item, Item variants, and Item config children all accept styled-system props.

```react
showSource: true
state: { isOpen: false }
---
<DropdownDemo>
	<Dropdown isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
		<Dropdown.Toggle variant="minor">Show a Dropdown!</Dropdown.Toggle>
		<Dropdown.Menu>
			<Dropdown.Item onClick={() => alert("Menu Item 1")}>Menu Item 1</Dropdown.Item>
			<Dropdown.Item onClick={() => alert("Menu Item 2")}>Menu Item 2</Dropdown.Item>
			<Dropdown.Item color="red" onClick={() => alert("Menu Item 3")}>Menu Item 3</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
</DropdownDemo>
```
