## Listbox

Refer to the dropdown docs for more info

```react
showSource: true
state: { isOpen: false, selected: 0 }
---
<ListboxDemo>
	<Label id="listboxLabel">Pick you favorite browser:</Label>
	<Listbox
		isOpen={state.isOpen}
		onItemSelect={id => setState({ selected: id })}
		selectedId={state.selected}
		onToggleMenu={() => setState({ isOpen: !state.isOpen })}
		labelledBy="listboxLabel"
	>
		<ListboxToggle primary medium icon={<DownArrow />} styleOverrides={{width: '100px'}}>{browserList[state.selected]}</ListboxToggle>
		<ListboxMenu>
			{browserList.map((name, index) => <ListItem id={index}>{name}</ListItem>)}
			<ListItem id="ie" disabled>Internet Explorer</ListItem>
		</ListboxMenu>
	</Listbox>
</ListboxDemo>
```
