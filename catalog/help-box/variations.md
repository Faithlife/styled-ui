## Colors and Their Meaning

```react
<div>
	<HelpBox theme={theme} handleClose={() => true}>
		<HelpBox.Body>This is a helpful alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox theme={theme} variant='danger' handleClose={() => true}>
		<HelpBox.Body>This is an error alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox theme={theme} variant='success' handleClose={() => true}>
		<HelpBox.Body>This is a successful alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox theme={theme} variant='warning' handleClose={() => true}>
		<HelpBox.Body>This is a cautious alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox theme={theme} variant='minor' handleClose={() => true}>
		<HelpBox.Body>This is a minor alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
</div>
```

## Variations

```react
<div>
	<HelpBox theme={theme} showLightBulb handleClose={() => true}>This is an alert with a light bulb.</HelpBox>
	<HelpBox theme={theme} hideIcon handleClose={() => true}>This alert has its icon hidden.</HelpBox>
	<HelpBox theme={theme} showRightIcon>This alert is showing its icon on both sides.</HelpBox>
	<HelpBox theme={theme} stacked handleClose={() => true}>
		<HelpBox.Body>This alert's contents are stacked.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox theme={theme}>
		<HelpBox.Body>This alert doesn't handle closing.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
</div>
```

## Large Alerts

```react
<div>
	<HelpBox theme={theme} large handleClose={() => true}>This is a large alert.</HelpBox>
	<HelpBox theme={theme} showLightBulb large handleClose={() => true}>This is a large alert with a light bulb.</HelpBox>
</div>
```
