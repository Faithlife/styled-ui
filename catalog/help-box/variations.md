## Colors and Their Meaning

```react
showSource: true
---
<Stack spacing={3}>
	<HelpBox handleClose={() => true}>
		<HelpBox.Body>This is a helpful alert.</HelpBox.Body>
		<HelpBox.Footer><Button variant="primary" size="small">CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox danger handleClose={() => true}>
		<HelpBox.Body>This is an error alert.</HelpBox.Body>
		<HelpBox.Footer><Button variant="primary" size="small">CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox success handleClose={() => true}>
		<HelpBox.Body>This is a successful alert.</HelpBox.Body>
		<HelpBox.Footer><Button variant="primary" size="small">CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox warning handleClose={() => true}>
		<HelpBox.Body>This is a cautious alert.</HelpBox.Body>
		<HelpBox.Footer><Button variant="primary" size="small">CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox minor handleClose={() => true}>
		<HelpBox.Body>This is a minor alert.</HelpBox.Body>
		<HelpBox.Footer><Button variant="primary" size="small">CTA</Button></HelpBox.Footer>
	</HelpBox>
</Stack>
```

## Variations

```react
showSource: true
---
<Stack spacing={3}>
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
showSource: true
---
<Stack spacing={3}>
	<HelpBox large handleClose={() => true}>This is a large alert.</HelpBox>
	<HelpBox showLightBulb large handleClose={() => true}>This is a large alert with a light bulb.</HelpBox>
</Stack>
```
