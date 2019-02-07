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

## With click away handler

The `onClickAway` function will be called on a `onMouseDown` or `onTouchStart` event not on the popover.

```react
showSource: true
state: { leftIsOpen: false, rightIsOpen: false }
---
<PopoverDemo>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ leftIsOpen: !state.leftIsOpen })}>Show a Popover!</Button>
		</PopoverReference>
		<Popover isOpen={state.leftIsOpen} placement="top" onClickAway={()=> setState({leftIsOpen: false})}>Hello!</Popover>
	</PopoverManager>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ rightIsOpen: !state.rightIsOpen })}>It even works with portals</Button>
		</PopoverReference>
		<Popover isOpen={state.rightIsOpen} placement="top" onClickAway={()=> setState({rightIsOpen: false})} container="body">I'm in a portal!</Popover>
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
		<Popover isOpen={state.isOpen} placement="top" theme={{ backgroundColor: '#ebf7ff' }}>Hello!</Popover>
	</PopoverManager>
	<PopoverManager>
		<PopoverReference>
			<Button primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover with zIndex!</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top" styleOverrides={{ padding: '18px', hideShadow: true, width: '200px', border: 'black solid 1px', zIndex: 10 }}>Hello!</Popover>
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
		<Popover isOpen={state.isOpen} placement="top" delay={{ show: 1000, hide: 1000 }}>Hello!</Popover>
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
