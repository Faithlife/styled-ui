## Popover

 ```react
showSource: true
state: { isOpen: false}
---
<PopoverDemo>
	<Button id="basicButton" primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
	<Popover isOpen={state.isOpen} anchorElement={window.basicButton}>Hello!</Popover>
</PopoverDemo>
```

 ## Placement

 ```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<Button id="topButton" primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show Popovers!</Button>
	<Popover isOpen={state.isOpen} anchorElement={window.topButton} placement="top">Hello!</Popover>

	<Button id="bottomButton" primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show Popovers!</Button>
	<Popover isOpen={state.isOpen} anchorElement={window.bottomButton} placement="bottom">Hello!</Popover>

	<Button id="leftButton" primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show Popovers!</Button>
	<Popover isOpen={state.isOpen} anchorElement={window.leftButton} placement="left">Hello!</Popover>

	<Button id="rightButton" primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show Popovers!</Button>
	<Popover isOpen={state.isOpen} anchorElement={window.rightButton} placement="right">Hello!</Popover>
</PopoverDemo>
```

 ## Options

 ```react
showSource: true
state: { isOpen: false }
---
<PopoverDemo>
	<Button id="themeButton" primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
	<Popover isOpen={state.isOpen} anchorElement={window.themeButton} theme={{ backgroundColor: '#ebf7ff', border: 'black solid 1px' }}>Hello!</Popover>

	<Button id="styleButton" primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
	<Popover isOpen={state.isOpen} anchorElement={window.styleButton} styleOverrides={{ padding: '18px', hideShadow: true, width: '200px' }}>Hello!</Popover>
	
	<Button id="arrowButton" primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
	<Popover isOpen={state.isOpen} anchorElement={window.arrowButton} showArrow>Hello!</Popover>

	<Button id="delayButton" primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover w/ a delay!</Button>
	<Popover isOpen={state.isOpen} anchorElement={window.delayButton} delay={1000}>Hello!</Popover>
</PopoverDemo>
```

 ## Using container prop

 ```react
showSource: true
state: { isOpen: false }
---
<PopoverOverflowDemo>
	<Button id="inlineButton" primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
	<Popover isOpen={state.isOpen} anchorElement={window.inlineButton} placement="top">I'm inline</Popover>

	<Button id="bodyButton" primary medium onClick={() => setState({ isOpen: !state.isOpen })}>Show a Popover!</Button>
	<Popover isOpen={state.isOpen} anchorElement={window.bodyButton} placement="top" breakOut>I'm thinking with portals!</Popover>
</PopoverOverflowDemo>
```
