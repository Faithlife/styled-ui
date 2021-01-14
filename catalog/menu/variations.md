```react
noSource: true
---
<React.Fragment>
	<AcceptsStyledSystemProps />
	<AriaCompliant />
</React.Fragment>
```

## Dropdown v6

Dropdown is an umbrella term for any component that shows a popover when clicked or hovered. The v5 Dropdown component implements the `menu` pattern and as such has been renamed to `Menu` for role clarity.

```react
showSource: true
state: { isOpen: false }
---
<MenuDemo>
	<Menu isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
		<Menu.Toggle>Show a Dropdown!</Menu.Toggle>
		<Menu.Dropdown>
			<Menu.Item onClick={() => alert("Menu Item 1")}>Menu Item 1</Menu.Item>
			<Menu.Item onClick={() => alert("Menu Item 2")}>Menu Item 2</Menu.Item>
			<Menu.Item disabled onClick={() => alert("Menu Item 3")}>Menu Item 3</Menu.Item>
		</Menu.Dropdown>
	</Menu>
</MenuDemo>
```

## Split Dropdown Toggle

```react
showSource: true
state: { isOpen: false }
---
<MenuDemo>
	<Menu isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
		<Menu.Toggle>
			<Menu.ActionButton onClick={() => alert("Different Action")}>Show a Dropdown!</Menu.ActionButton>
		</Menu.Toggle>
		<Menu.Dropdown>
			<Menu.Item onClick={() => alert("Menu Item 1")}>Menu Item 1</Menu.Item>
			<Menu.Item onClick={() => alert("Menu Item 2")}>Menu Item 2</Menu.Item>
			<Menu.Item disabled onClick={() => alert("Menu Item 3")}>Menu Item 3</Menu.Item>
		</Menu.Dropdown>
	</Menu>
</MenuDemo>
```

## Dropdown Menu Items

```react
showSource: true
state: { isOpen: false, isChecked: false }
---
<MenuDemo>
	<Menu isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
		<Menu.Toggle>Show a Dropdown!</Menu.Toggle>
		<Menu.Dropdown>
			<Menu.Title>Dropdown</Menu.Title>
			<Menu.Separator />
			<Menu.Item onClick={() => alert("Menu Item")}>Menu Item</Menu.Item>
			<Menu.CheckboxItem isChecked={state.isChecked} onToggle={() => setState({ isChecked: !state.isChecked })}>Menu Checkbox</Menu.CheckboxItem>
			<Menu.LinkItem href="https://faithlife.github.io/styled-ui/#/icons" target="_blank">Menu Link</Menu.LinkItem>
		</Menu.Dropdown>
	</Menu>
</MenuDemo>
```

## Using custom toggle component

```react
showSource: true
state: { isOpen: false }
---
<MenuDemo>
	<Menu isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
		<Menu.Toggle>
			{(ref, {onKeyDown, onClick, ariaProps}) =>
				<Button variant="primary" size="medium" ref={ref} onKeyDown={onKeyDown} onClick={onClick} {...ariaProps}>Show a Dropdown!</Button>}
		</Menu.Toggle>
		<Menu.Dropdown>
			<Menu.Item onClick={() => alert("Menu Item 1")}>Menu Item 1</Menu.Item>
			<Menu.Item onClick={() => alert("Menu Item 2")}>Menu Item 2</Menu.Item>
			<Menu.Item onClick={() => alert("Menu Item 3")}>Menu Item 3</Menu.Item>
		</Menu.Dropdown>
	</Menu>
</MenuDemo>
```

## With icon

variant = icon | thumbnail | avatar

```react
showSource: true
state: { isOpen: false }
---
<MenuDemo>
	<Menu isOpen={state.isOpen} width="280px" onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
		<Menu.Toggle>Show a Dropdown!</Menu.Toggle>
		<Menu.Dropdown>
			<Menu.Item onClick={() => alert("Menu Item 1")}>
				<Menu.ItemIcon><FavoriteFilled /></Menu.ItemIcon>
				<Menu.ItemPrimaryText>Menu Item 1</Menu.ItemPrimaryText>
				<Menu.ItemSecondaryText>Variant = Icon</Menu.ItemSecondaryText>
			</Menu.Item>
			<Menu.Item onClick={() => alert("Menu Item 2")}>
				<Menu.ItemIcon src={thumbnailSrc} variant="thumbnail" />
				<Menu.ItemPrimaryText>Menu Item 2</Menu.ItemPrimaryText>
				<Menu.ItemSecondaryText>Variant = Thumbnail</Menu.ItemSecondaryText>
			</Menu.Item>
			<Menu.Item onClick={() => alert("Menu Item 3")}>
				<Menu.ItemIcon src={avatarSrc} variant="avatar" />
				<Menu.ItemPrimaryText fontWeight={1}>Menu Item 3 (Avatar)</Menu.ItemPrimaryText>
			</Menu.Item>
		</Menu.Dropdown>
	</Menu>
</MenuDemo>
```

## Styling

Toggle, Menu, Title, Item, Item variants, and Item config children all accept styled-system props.

```react
showSource: true
state: { isOpen: false }
---
<MenuDemo>
	<Menu isOpen={state.isOpen} onToggleMenu={() => setState({ isOpen: !state.isOpen })}>
		<Menu.Toggle variant="minor">Show a Dropdown!</Menu.Toggle>
		<Menu.Dropdown>
			<Menu.Item onClick={() => alert("Menu Item 1")}>Menu Item 1</Menu.Item>
			<Menu.Item onClick={() => alert("Menu Item 2")}>Menu Item 2</Menu.Item>
			<Menu.Item color="red" onClick={() => alert("Menu Item 3")}>Menu Item 3</Menu.Item>
		</Menu.Dropdown>
	</Menu>
</MenuDemo>
```
