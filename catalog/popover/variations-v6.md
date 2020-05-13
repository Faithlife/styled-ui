## Popover v6

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
state: { isOpen: false }
---
<PopoverDemo>
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })} ref={refs[1]}>
		Show a Popover!
	</Button>
	{state.isOpen && (
		<Popover reference={refs[1].current} placement="top" onFocusAway={() => setState({ isOpen: false })}>
			Hello!
		</Popover>
	)}
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })} ref={refs[2]}>
		Show a Popover!
	</Button>
	{state.isOpen && (
		<Popover reference={refs[2].current} placement="bottom" onFocusAway={() => setState({ isOpen: false })}>
			Hello!
		</Popover>
	)}
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })} ref={refs[3]}>
		Show a Popover!
	</Button>
	{state.isOpen && (
		<Popover reference={refs[3].current} placement="left" onFocusAway={() => setState({ isOpen: false })}>
			Hello!
		</Popover>
	)}
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })} ref={refs[4]}>
		Show a Popover!
	</Button>
	{state.isOpen && (
		<Popover reference={refs[4].current} placement="right" onFocusAway={() => setState({ isOpen: false })}>
			Hello!
		</Popover>
	)}
</PopoverDemo>
```

## Options

```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })} ref={refs[5]}>
		Show a blue Popover!
	</Button>
	{state.isOpen && (
		<Popover
			reference={refs[5].current}
			placement="top"
			onFocusAway={() => setState({ isOpen: false })}
			backgroundColor="#ebf7ff"
		>
			Hello!
		</Popover>
	)}
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })} ref={refs[6]}>
		Show a Popover with multiple custom styles!
	</Button>
	{state.isOpen && (
		<Popover
			reference={refs[6].current}
			placement="top"
			onFocusAway={() => setState({ isOpen: false })}
			boxShadow=""
			padding="18px"
			width="200px"
			border="black solid 1px"
			zIndex={10}
		>
			Hello!
		</Popover>
	)}
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })} ref={refs[7]}>
		Show a Popover without an arrow!
	</Button>
	{state.isOpen && (
		<Popover
			reference={refs[7].current}
			placement="top"
			onFocusAway={() => setState({ isOpen: false })}
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
state: { isOpen: false }
---
// overflow: hidden
<PopoverOverflowDemo>
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })} ref={refs[8]}>
		Show a Popover!
	</Button>
	{state.isOpen && (
		<Popover reference={refs[8].current} placement="top" onFocusAway={() => setState({ isOpen: false })}>
			I'm inline
		</Popover>
	)}
	<Button variant="primary" size="medium" onClick={() => setState({ isOpen: !state.isOpen })} ref={refs[9]}>
		Show a Popover!
	</Button>
	{state.isOpen && (
		<Popover
			reference={refs[9].current}
			placement="top"
			container="body"
			onFocusAway={() => setState({ isOpen: false })}
		>
			I'm thinking with portals!
		</Popover>
	)}
</PopoverOverflowDemo>
```
