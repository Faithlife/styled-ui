Buttons allow users to command the computer to take some action. Buttons, like all standard form components, usually have 16 px space between them.

## Button Groups

```react
showSource: true
---
<div>
	<ButtonDemo>
		<SegmentedButtonGroup>
			<Button variant="transparent" active size="medium">
				Primary
			</Button>
			<Button variant="transparent" size="medium">
				Secondary
			</Button>
			<Button variant="transparent" size="medium">
				Minor
			</Button>
		</SegmentedButtonGroup>
	</ButtonDemo>
</div>
```

## Component Variations

### Variants

```react
showSource: true
---
<div>
	<ButtonDemo>
		<Button variant="primary" size="medium">
			Primary
		</Button>
		<Button variant="secondary" size="medium">
			Secondary
		</Button>
		<Button variant="minor" size="medium">
			Minor
		</Button>
		<Button variant="transparent" size="medium">
			Transparent
		</Button>
		<Button variant="link" size="medium">
			Link
		</Button>
		<Button variant="danger" size="medium">
			Danger
		</Button>
	</ButtonDemo>
</div>
```

### Size

```react
showSource: true
---
<ButtonDemo>
	<Button variant="primary" size="small">
		Small
	</Button>
	<Button variant="primary" size="medium">
		Medium
	</Button>
	<Button variant="primary" size="large">
		Large
	</Button>
</ButtonDemo>
```

### With Icon

```react
showSource: true
---
<ButtonDemo>
	<Button variant="primary" size="large" icon={<GearIcon />}>
		Settings
	</Button>
	<Button variant="primary" size="small" icon={<GearIcon />}>
		Settings
	</Button>
	<Button variant="primary" size="small" icon={<GearIcon />} />
	<Button variant="transparent" size="small" icon={<GearIcon />} />
</ButtonDemo>
```

### Responsive Sizes

Pass an array of sizes corresponding to breakpoints.

```react
showSource: true
---
<Button variant="primary" size={['large', 'medium']}>
	Go
</Button>
```

### Supported style customizations

This component accepts styled-system props.

```react
showSource: true
---
<ButtonDemo>
	<Button variant="primary" size="large" backgroundColor="plum">
		Plum
	</Button>
	<Button variant="primary" size="large" width="200px">
		200px Wide
	</Button>
	<Button variant="primary" textStyle="ui.12" padding={3}>
		12px Font, 8px Padding
	</Button>
</ButtonDemo>
```

## Disabled states

```react
showSource: true
---
<div>
	<ButtonDemo>
		<Button variant="primary" size="medium" disabled>
			Primary
		</Button>
		<Button variant="secondary" size="medium" disabled>
			Secondary
		</Button>
		<Button variant="minor" size="medium" disabled>
			Minor
		</Button>
		<Button variant="transparent" size="medium" disabled>
			Transparent
		</Button>
		<Button variant="link" size="medium" disabled>
			Link
		</Button>
		<Button variant="danger" size="medium" disabled>
			Danger
		</Button>
	</ButtonDemo>
</div>
```

### Stretched buttons

```react
showSource: true
---
<ButtonGrid>
	<Button variant="primary" size="small" icon={<GearIcon />}>
		Settings
	</Button>
	<Button variant="primary" size="small">
		Settings
	</Button>
	<Button variant="primary" size="small" icon={<GearIcon />} justifyContent="flex-start">
		Settings
	</Button>
	<Button variant="primary" size="small" justifyContent="flex-start">
		Settings
	</Button>
	<Button variant="primary" size="small" icon={<GearIcon />} justifyContent="flex-end">
		Settings
	</Button>
	<Button variant="primary" size="small" justifyContent="flex-end">
		Settings
	</Button>
	<Button variant="primary" size="small" icon={<GearIcon />} />
	<Button variant="transparent" size="small" icon={<GearIcon />} />
</ButtonGrid>
```

## Button Text

- Button text should be as concise as possible, but as long as necessary (for clarity).
- Buttons are usually verbs (or short phrases that begin with a verb).

Buttons are generally interpreted as imperatives, with the computer as agent ("hey computer, do the thing"), the text of the thing to be done as a verb ("frob"), and a direct object to take the action on if needed ("frob widgets"). Thus a button that reads "frob widgets" will normally be interpreted by the user as them issuing the command: "Hey computer, frob the widgets!"

There are some exceptions, such as "Buy Now" buttons, which are generally interpreted as: "Hey computer, I want to buy [something] now!"

Some buttons are noun phrases, but there should always be an implied verb. For example: a "Settings" button that launches a settings dialog in the current context has an implied verb of "Show" or "Launch" (if the user is thinking of what the computer will do) or "Edit" or "Change" (if they're thinking of what they want to do).

Button text should never wrap, and should generally never need ellipses. If you do need them, you will need to supply the styles yourself:

```react
showSource: true
---
<ButtonDemo>
	<Button variant="primary" size="small">
		<div style={{ overflow:'hidden', textOverflow:'ellipsis', maxWidth: 230 }}>
			Really long button text for demonstration purposes
		</div>
	</Button>
</ButtonDemo>
```

## Examples

A product sales page enables three possible user actions: Buy the product, rent the product, or learn more about the product. Appropriate button styles and text would be: "Buy now" (primary), "Rent" (primaryOutline), and "Learn more" (minor). If they are all in a row, they would come in the order: "Learn more", "Rent", and "Buy now" on the right.

```react
showSource: true
---
<ButtonDemo>
	<Button variant="primary" size="medium">
		Buy now
	</Button>
	<Button variant="secondary" size="medium">
		Rent
	</Button>
	<Button variant="minor" size="medium">
		Learn more
	</Button>
</ButtonDemo>
```
