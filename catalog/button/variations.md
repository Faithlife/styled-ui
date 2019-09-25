Buttons allow users to command the computer to take some action. Buttons, like all standard form components, usually have 16 px space between them.

## Component Variations

### Scale Factor

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
	<Button variant="primary" condensed size="small" icon={<GearIcon />} />
	<Button minorTransparent condensed size="small" icon={<GearIcon />} />
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

### With Attached Ref

```react
showSource: true
---
<ButtonDemo>
	<Button variant="primary" size="small" onClick={() => buttonRef.current.focus()}>
		Focus
	</Button>
	<Button variant="primaryOutline" size="small" ref={buttonRef}>
		Target Button
	</Button>
</ButtonDemo>
```

### Supported style customizations

Do not use the `style` prop to style this component (it will be ignored). Instead, if there is missing customization that you need for this component, ask to have it added. The `theme` prop can be used to control color variations while the `styleOverrides` prop can be used for other styles.

```react
showSource: true
---
<ButtonDemo>
	<Button variant="primary" size="large" defaultColor="plum" hoverColor="darkslateblue">
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

- `small` -- this is the default size for web applications.
- `medium` -- this is the default size for mobile applications and marketing web pages.
- `large` -- for extra-special calls to action, used sparingly.

### Relative Emphasis

```react
showSource: true
---
<div>
	<ButtonDemo>
		<Button variant="primary" size="medium">
			Primary
		</Button>
		<Button variant="primaryOutline" size="medium">
			Primary Outline
		</Button>
		<Button variant="minor" size="medium">
			Minor
		</Button>
		<Button variant="primaryTransparent" size="medium" condensed>
			Primary Transparent
		</Button>
		<Button variant="minorTransparent" size="medium" condensed>
			Minor Transparent
		</Button>
	</ButtonDemo>
	<div>
		Here is some text with an inline <Button variant="primaryTransparent">primary</Button> and <Button variant="minorTransparent">minor</Button>.
	</div>
</div>
```

- `primary` -- for the most important or most common action for a user to take in a given context/scope. This button variant grabs the user's attention. In marketing pages, this style is for the "call to action" on a page.
- `primaryOutline` -- for actions related to, or nearby the primary button in terms of visual hieararchy that are less common or less critical. Use this button when you want the user's casual attention.
- `minor` -- for apps, not marketing pages. When there are a lot of common actions that are all of equal weight, consider using minor buttons.
- `link` -- for situations where a hyperlink is indicated, but must be aligned with a row of buttons. Is very lightweight in terms of visual attention.

## Disabled states

```react
showSource: true
---
<ButtonDemo>
	<Button variant="primary" size="medium" disabled>
		Primary
	</Button>
	<Button variant="primaryOutline" size="medium" disabled>
		Primary Outline
	</Button>
	<Button variant="minor" size="medium" disabled>
		Minor
	</Button>
	<Button variant="primaryTransparent" size="medium" disabled>
		Primary Transparent
	</Button>
	<Button variant="minorTransparent" size="medium" disabled>
		Minor Transparent
	</Button>
</ButtonDemo>
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
	<Button variant="primary" size="small" icon={<GearIcon />} styleOverrides={{ justifyContent: 'flex-start' }}>
		Settings
	</Button>
	<Button variant="primary" size="small" styleOverrides={{ justifyContent: 'flex-start' }}>
		Settings
	</Button>
	<Button variant="primary" size="small" icon={<GearIcon />} styleOverrides={{ justifyContent: 'flex-end' }}>
		Settings
	</Button>
	<Button variant="primary" size="small" styleOverrides={{ justifyContent: 'flex-end' }}>
		Settings
	</Button>
	<Button variant="primary" condensed size="small" icon={<GearIcon />} />
	<Button variant="minorTransparent" condensed size="small" icon={<GearIcon />} />
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
	<Button variant="primaryOutline" size="medium">
		Rent
	</Button>
	<Button variant="minor" size="medium">
		Learn more
	</Button>
</ButtonDemo>
```
