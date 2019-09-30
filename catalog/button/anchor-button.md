AnchorButtons allow users to command the computer to navigate.

## Component Variations

AnchorButton supports same variations as Button. See [Button Variations](/button/variations) for details.

### Sample

```react
showSource: true
---
<ButtonDemo>
	<AnchorButton href="#settings" variant="primary" size="small" icon={<GearIcon />}>
		Settings
	</AnchorButton>
	<AnchorButton href="#settings" variant="primary" condensed size="small" icon={<GearIcon />} />
	<AnchorButton href="#settings" variant="primary" size="small">Settings</AnchorButton>
	<AnchorButton href="#settings" variant="minor" size="small">Settings</AnchorButton>
	<AnchorButton href="#settings" variant="minorTransparent" size="small">Settings</AnchorButton>
	<AnchorButton href="#settings" variant="primaryOutline" size="small">Settings</AnchorButton>
	<AnchorButton href="#settings" variant="primaryTransparent" size="small">Settings</AnchorButton>
</ButtonDemo>
```
