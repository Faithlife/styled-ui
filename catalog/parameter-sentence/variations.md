## Listbox

Refer to the dropdown docs for more info

```react
showSource: true
state: { isOpen: false, selected: 'threeMonths' }
---
<ListboxDemo>
	<ParameterSelect selectedId={state.selected} onItemSelect={item => setState({ selected: item })} options={timeSpans} />
</ListboxDemo>
```
