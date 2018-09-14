AnchorButtons allow users to command the computer to navigate.

## Component Variations
AnchorButton supports same variations as Button. See [Button Variations](/button/variations) for details.

### Sample

```react
showSource: true
---
<ButtonDemo>
	<AnchorButton href="#settings" primary small icon={<GearIcon />}>
		Settings
	</AnchorButton>
	<AnchorButton href="#settings" primary condensed small icon={<GearIcon />} />
	<AnchorButton href="#settings" primary small>Settings</AnchorButton>
	<AnchorButton href="#settings" primaryTransparent small>Settings</AnchorButton>
</ButtonDemo>
```