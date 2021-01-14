```react
noSource: true
---
<React.Fragment>
	<V6Banner>
		<AcceptsStyledSystemProps />
		<AriaCompliant />
	</V6Banner>
</React.Fragment>
```

A `Listbox` is a dropdown should be used in situations similar to an HTML select. Refer to the `Menu` docs for more info on variations.

```react
showSource: true
state: { isOpen: false, selected: 0 }
---
<ListboxDemo>
	<Label id="listboxLabel">Pick your favorite browser:</Label>
	<Listbox
		isOpen={state.isOpen}
		onItemSelect={id => {console.log(id); setState({ selected: id })}}
		selectedId={state.selected}
		onToggleMenu={() => setState({ isOpen: !state.isOpen })}
		labelledBy="listboxLabel"
		width="100px"
	>
		<Listbox.Toggle>{browserList[state.selected]}</Listbox.Toggle>
		<Listbox.Dropdown>
			{browserList.map((name, index) => <Listbox.Option id={index}>{name}</Listbox.Option>)}
			<Listbox.Option id="ie" disabled>Internet Explorer</Listbox.Option>
		</Listbox.Dropdown>
	</Listbox>
</ListboxDemo>
```
