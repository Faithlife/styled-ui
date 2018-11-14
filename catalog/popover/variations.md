## Popover

```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top">Hello!</Popover>
	</PopoverManager>
</PopoverDemo>
```

## Placement

```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top">Hello!</Popover>
	</PopoverManager>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="bottom">Hello!</Popover>
	</PopoverManager>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="left">Hello!</Popover>
	</PopoverManager>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="right">Hello!</Popover>
	</PopoverManager>
</PopoverDemo>
```

## Options

```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top" theme={{ backgroundColor: '#ebf7ff', border: 'black solid 1px' }}>Hello!</Popover>
	</PopoverManager>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top" styleOverrides={{ padding: '18px', hideShadow: true, width: '200px' }}>Hello!</Popover>
	</PopoverManager>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top" hideArrow>Hello!</Popover>
	</PopoverManager>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover w/ a delay!</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top" delay={1000}>Hello!</Popover>
	</PopoverManager>
</PopoverDemo>
```

## Using container prop

```react
showSource: true
state: { isOpen: false }
---
// overflow: hidden
<PopoverOverflowDemo>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top">I'm inline</Popover>
	</PopoverManager>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top" container="body">I'm thinking with portals!</Popover>
	</PopoverManager>
</PopoverOverflowDemo>
```

## Tooltip

All props for normal popovers are available to tooltips.

```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<Tooltip text="Hello!">
		<Button primary medium>Uncontrolled Tooltip</Button>
	</Tooltip>

	<Tooltip text="Hello!" isOpen={state.isOpen}>
		<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Controlled Tooltip</Button>
	</Tooltip>

	<Tooltip text={<StyledDiv>Hello!</StyledDiv>}>
		<Button primary medium>Tooltip with jsx</Button>
	</Tooltip>
</PopoverDemo>
```
