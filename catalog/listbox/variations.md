## Listbox

A list box should be used in situations simmilar to a html select. Refer to the dropdown docs for more info on varriations.

```react
showSource: true
state: { isOpen: false, selected: 0 }
---
<ListboxDemo>
	<Label id="listboxLabel">Pick your favorite browser:</Label>
	<Listbox
		isOpen={state.isOpen}
		onItemSelect={id => setState({ selected: id })}
		selectedId={state.selected}
		onToggleMenu={() => setState({ isOpen: !state.isOpen })}
		labelledBy="listboxLabel"
	>
		<ListboxToggle primary medium icon={<ChevronDown color="white" />} styleOverrides={{width: '100px'}}>{browserList[state.selected]}</ListboxToggle>
		<ListboxMenu>
			{browserList.map((name, index) => <ListItem id={index}>{name}</ListItem>)}
			<ListItem id="ie" disabled>Internet Explorer</ListItem>
		</ListboxMenu>
	</Listbox>
</ListboxDemo>
```
