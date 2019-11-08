`import { Button } from '@faithlife/styled-ui/v6';`

Buttons allow users to command the computer to take some action. Buttons, like all standard form components, usually have 16 px space between them.

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
		<Button variant="dangerSpecial" size="medium">
			Danger (Special)
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
			danger
		</Button>
		<Button variant="dangerSpecial" size="medium" disabled>
			Danger (Special)
		</Button>
	</ButtonDemo>
</div>
```

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
