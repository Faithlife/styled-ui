```react
noSource: true
---
<React.Fragment>
	<V6Banner>
		<AcceptsStyledSystemProps />
	</V6Banner>
</React.Fragment>
```

## Popover

onFocusAway should always be used according to the spec.

```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })} ref={refs[0]}>
		Show a Popover!
	</Button>
	{state.isOpen && (
		<Popover reference={refs[0].current} placement="top" onFocusAway={() => setState({ isOpen: false })}>
			Hello!
		</Popover>
	)}
</PopoverDemo>
```

## Placement

```react
showSource: true
state: { isOpen1: false, isOpen2: false, isOpen3: false, isOpen4: false }
---
<PopoverDemo>
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen1: !state.isOpen1 })} ref={refs[1]}>
		Show a Popover!
	</Button>
	{state.isOpen1 && (
		<Popover reference={refs[1].current} placement="top" onFocusAway={() => setState({ isOpen1: false })}>
			Hello!
		</Popover>
	)}
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen2: !state.isOpen2 })} ref={refs[2]}>
		Show a Popover!
	</Button>
	{state.isOpen2 && (
		<Popover reference={refs[2].current} placement="bottom" onFocusAway={() => setState({ isOpen2: false })}>
			Hello!
		</Popover>
	)}
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen3: !state.isOpen3 })} ref={refs[3]}>
		Show a Popover!
	</Button>
	{state.isOpen3 && (
		<Popover reference={refs[3].current} placement="left" onFocusAway={() => setState({ isOpen3: false })}>
			Hello!
		</Popover>
	)}
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen4: !state.isOpen4 })} ref={refs[4]}>
		Show a Popover!
	</Button>
	{state.isOpen4 && (
		<Popover reference={refs[4].current} placement="right" onFocusAway={() => setState({ isOpen4: false })}>
			Hello!
		</Popover>
	)}
</PopoverDemo>
```

## Options

```react
showSource: true
state: { isOpen1: false, isOpen2: false, isOpen3: false }
---
<PopoverDemo>
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen1: !state.isOpen1 })} ref={refs[5]}>
		Show a blue Popover!
	</Button>
	{state.isOpen1 && (
		<Popover
			reference={refs[5].current}
			placement="top"
			onFocusAway={() => setState({ isOpen1: false })}
			backgroundColor="#ebf7ff"
		>
			Hello!
		</Popover>
	)}
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen2: !state.isOpen2 })} ref={refs[6]}>
		Show a Popover with multiple custom styles!
	</Button>
	{state.isOpen2 && (
		<Popover
			reference={refs[6].current}
			placement="top"
			onFocusAway={() => setState({ isOpen2: false })}
			boxShadow=""
			padding="18px"
			width="200px"
			border="black solid 1px"
			zIndex={10}
		>
			Hello!
		</Popover>
	)}
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen3: !state.isOpen3 })} ref={refs[7]}>
		Show a Popover without an arrow!
	</Button>
	{state.isOpen3 && (
		<Popover
			reference={refs[7].current}
			placement="top"
			onFocusAway={() => setState({ isOpen3: false })}
			hideArrow
		>
			Hello!
		</Popover>
	)}
</PopoverDemo>
```

## Using container prop

```react
showSource: true
state: { isOpen1: false, isOpen2 }
---
// overflow: hidden
<PopoverOverflowDemo>
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen1: !state.isOpen1 })} ref={refs[8]}>
		Show a Popover!
	</Button>
	{state.isOpen1 && (
		<Popover reference={refs[8].current} placement="top" onFocusAway={() => setState({ isOpen1: false })}>
			I'm inline
		</Popover>
	)}
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen2: !state.isOpen2 })} ref={refs[9]}>
		Show a Popover!
	</Button>
	{state.isOpen2 && (
		<Popover
			reference={refs[9].current}
			placement="top"
			container="body"
			onFocusAway={() => setState({ isOpen2: false })}
		>
			I'm thinking with portals!
		</Popover>
	)}
</PopoverOverflowDemo>
```

## Tooltip

```react
showSource: true
---
<PopoverDemo>
	<Tooltip content="hovered!">
		Hover me!
	</Tooltip>
	<Tooltip delay={1000} content="delayed!">
		No, Hover me!
	</Tooltip>
</PopoverDemo>
```
