## Popover

onFocusAway should always be used according to the spec.

```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })}>
				Show a Popover!
			</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top">
			Hello!
		</Popover>
	</PopoverManager>
</PopoverDemo>
```

## PopoverBase

```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })}>
				Show a Popover!
			</Button>
		</PopoverReference>
		<PopoverBase isOpen={state.isOpen} placement="top">
			Notice my lack of style!
		</PopoverBase>
	</PopoverManager>
</PopoverDemo>
```

## Placement

```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })}>
				Show a Popover!
			</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top">
			Hello!
		</Popover>
	</PopoverManager>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })}>
				Show a Popover!
			</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="bottom">
			Hello!
		</Popover>
	</PopoverManager>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })}>
				Show a Popover!
			</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="left">
			Hello!
		</Popover>
	</PopoverManager>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })}>
				Show a Popover!
			</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="right">
			Hello!
		</Popover>
	</PopoverManager>
</PopoverDemo>
```

## Options

```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })}>
				Show a Popover!
			</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top" theme={{ backgroundColor: '#ebf7ff' }}>
			Hello!
		</Popover>
	</PopoverManager>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })}>
				Show a Popover with zIndex!
			</Button>
		</PopoverReference>
		<Popover
			isOpen={state.isOpen}
			placement="top"
			styleOverrides={{
				padding: '18px',
				hideShadow: true,
				width: '200px',
				border: 'black solid 1px',
				zIndex: 10,
			}}
		>
			Hello!
		</Popover>
	</PopoverManager>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })}>
				Show a Popover!
			</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top" hideArrow>
			Hello!
		</Popover>
	</PopoverManager>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })}>
				Show a Popover w/ a delay!
			</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top" delay={{ show: 1000, hide: 1000 }}>
			Hello!
		</Popover>
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
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })}>
				Show a Popover!
			</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top">
			I'm inline
		</Popover>
	</PopoverManager>
	<PopoverManager onFocusAway={() => setState({ isOpen: false })}>
		<PopoverReference>
			<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })}>
				Show a Popover!
			</Button>
		</PopoverReference>
		<Popover isOpen={state.isOpen} placement="top" container="body">
			I'm thinking with portals!
		</Popover>
	</PopoverManager>
</PopoverOverflowDemo>
```

## Tooltip

All props for normal popovers are available to tooltips.
Tooltips will be hidden on mobile.

```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<Tooltip content="Hello!">
		<Button variant="primary" size="medium">
			Uncontrolled Tooltip
		</Button>
	</Tooltip>

	<Tooltip content="Hello!" isOpen={state.isOpen}>
		<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })}>
			Controlled Tooltip
		</Button>
	</Tooltip>

	<Tooltip content={<StyledDiv>Hello!</StyledDiv>}>
		<Button variant="primary" size="medium">
			Tooltip with jsx
		</Button>
	</Tooltip>

	<Tooltip content={<StyledDiv>Hello!</StyledDiv>} toggleOnClick>
		<Button variant="primary" size="medium">
			Tooltip that opens on tap
		</Button>
	</Tooltip>
</PopoverDemo>
```

## Avoiding extra DOM elements

By default `PopoverReference` wraps its children in a container, which is used to attach event handlers. If you need to avoid the extra DOM element, you can pass a function child. The function receives a single argument containing an object of required props that must be spread onto a component in order for the popover to function. Both `Tooltip` and `PopoverReference` support this API.

```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<Tooltip content="Hello!">
		{tooltipProps => (
			<Button variant="primary" size="medium" {...tooltipProps}>
				Uncontrolled Tooltip
			</Button>
		)}
	</Tooltip>
</PopoverDemo>
```
