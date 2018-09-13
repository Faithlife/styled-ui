### Show on hover

```react
showSource: true
---
<TooltipDemo>
	<Tooltip
		showOnHover
		placement="top"
		text={'Hello!'}
	>
		<Button primary small>Hover On Me</Button>
	</Tooltip>
</TooltipDemo>
```

### Show with props

```react
showSource: true
state: { isOpen: false }
---
<TooltipDemo>
	<Tooltip
		isOpen={state.isOpen}
		text={'Hello!'}
	>
		<Button primary small onClick={() => setState({ isOpen: !state.isOpen })}>
			Toggle Tooltip
		</Button>
	</Tooltip>

</TooltipDemo>
```

### Custom Theme

```react
showSource: true
---
<TooltipDemo>
	<Tooltip
		isOpen
		text={'Hello!'}
		theme={{
			backgroundColor: '#b69bd3',
			textColor: '#f5f5f5',
			shadow: '0 4px 4px 0 rgba(0, 0, 0, 0.2)'
		}}
	>
		Tooltip
	</Tooltip>

</TooltipDemo>
```

### Varitations

```react
showSource: true
---
<MultiTooltipDemo>
	<Tooltip
		isOpen
		text={'Hello!'}
	>
		Normal Tooltip
	</Tooltip>

	<Tooltip
		isOpen
		placement="bottom"
		text={'Hello!'}
	>
		Bottom Tooltip
	</Tooltip>

	<Tooltip
		isOpen
		placement="left"
		text={'Hello!'}
	>
		Left Tooltip
	</Tooltip>

	<Tooltip
		isOpen
		placement="right"
		text={'Hello!'}
	>
		Right Tooltip
	</Tooltip>

</MultiTooltipDemo>
```
