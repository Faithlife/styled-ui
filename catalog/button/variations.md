Buttons allow users to command the computer to take some action. Buttons, like all standard form components, usually have 16 px space between them.

## Component Variations

### Scale Factor

```react
showSource: true
---
<ButtonDemo>
	<Button primary small>
		Small
	</Button>
	<Button primary medium>
		Medium
	</Button>
	<Button primary large>
		Large
	</Button>
</ButtonDemo>
```

### With Icon

```react
showSource: true
---
<ButtonDemo>
	<Button primary large icon={<GearIcon />}>
		Settings
	</Button>
	<Button primary small icon={<GearIcon />}>
		Settings
	</Button>
	<Button primary condensed small icon={<GearIcon />} />
	<Button minorTransparent condensed small icon={<GearIcon />} />
</ButtonDemo>
```

### With Attached Ref

```react
showSource: true
---
<ButtonDemo>
	<Button primary small onClick={() => buttonRef.current.focus()}>
		Focus
	</Button>
	<Button primaryOutline small ref={buttonRef}>
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
	<Button primary large theme={{ defaultColor: 'plum', hoverColor: 'darkslateblue' }}>
		Plum
	</Button>
	<Button primary large styleOverrides={{ width: '200px' }}>
		200px Wide
	</Button>
	<Button primary styleOverrides={{ fontSize: '12px', padding: '8px' }}>
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
		<Button primary medium>
			Primary
		</Button>
		<Button primaryOutline medium>
			Primary Outline
		</Button>
		<Button minor medium>
			Minor
		</Button>
		<Button primaryTransparent medium condensed>
			Primary Transparent
		</Button>
		<Button minorTransparent medium condensed>
			Minor Transparent
		</Button>
	</ButtonDemo>
	<div>
		Here is some text with an inline <Button primaryTransparent>primary</Button> and <Button minorTransparent>minor</Button>.
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
	<Button primary medium disabled>
		Primary
	</Button>
	<Button primaryOutline medium disabled>
		Primary Outline
	</Button>
	<Button minor medium disabled>
		Minor
	</Button>
	<Button primaryTransparent medium disabled>
		Primary Transparent
	</Button>
	<Button minorTransparent medium disabled>
		Minor Transparent
	</Button>
</ButtonDemo>
```

### Stretched buttons

```react
showSource: true
---
<ButtonGrid>
	<Button primary small icon={<GearIcon />}>
		Settings
	</Button>
	<Button primary small>
		Settings
	</Button>
	<Button primary small icon={<GearIcon />} styleOverrides={{ justifyContent: 'left' }}>
		Settings
	</Button>
	<Button primary small styleOverrides={{ justifyContent: 'left' }}>
		Settings
	</Button>
	<Button primary small icon={<GearIcon />} styleOverrides={{ justifyContent: 'right' }}>
		Settings
	</Button>
	<Button primary small styleOverrides={{ justifyContent: 'right' }}>
		Settings
	</Button>
	<Button primary condensed small icon={<GearIcon />} />
	<Button minorTransparent condensed small icon={<GearIcon />} />
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
	<Button primary small>
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
	<Button primary medium>
		Buy now
	</Button>
	<Button primaryOutline medium>
		Rent
	</Button>
	<Button minor medium>
		Learn more
	</Button>
</ButtonDemo>
```
