## Colors and Their Meaning

```react
<Stack spacing={4}>
	<HelpBox handleClose={() => true}>
		<HelpBox.Body>This is a helpful alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox variant='danger' handleClose={() => true}>
		<HelpBox.Body>This is an error alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox variant='success' handleClose={() => true}>
		<HelpBox.Body>This is a successful alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox variant='warning' handleClose={() => true}>
		<HelpBox.Body>This is a cautious alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox variant='minor' handleClose={() => true}>
		<HelpBox.Body>This is a minor alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
</Stack>
```

## Variations

```react
<Stack spacing={4}>
	<HelpBox showLightBulb handleClose={() => true}>This is an alert with a light bulb.</HelpBox>
	<HelpBox hideIcon handleClose={() => true}>This alert has its icon hidden.</HelpBox>
	<HelpBox showRightIcon>This alert is showing its icon on both sides.</HelpBox>
	<HelpBox stacked handleClose={() => true}>
		<HelpBox.Body>This alert's contents are stacked.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox>
		<HelpBox.Body>This alert doesn't handle closing.</HelpBox.Body>
		<HelpBox.Footer><Button primary small>CTA</Button></HelpBox.Footer>
	</HelpBox>
</Stack>
```

## Large Alerts

```react
<Stack spacing={5}>
	<HelpBox large handleClose={() => true}>This is a large alert.</HelpBox>
	<HelpBox showLightBulb large handleClose={() => true}>This is a large alert with a light bulb.</HelpBox>
</Stack>
```
