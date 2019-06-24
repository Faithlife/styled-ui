## Colors and Their Meaning

```react
<div>
	<HelpBox handleClose={() => true}>
		<HelpBox.Body>This is a helpful alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox danger handleClose={() => true}>
		<HelpBox.Body>This is an error alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox success handleClose={() => true}>
		<HelpBox.Body>This is a successful alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox warning handleClose={() => true}>
		<HelpBox.Body>This is a cautious alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox minor handleClose={() => true}>
		<HelpBox.Body>This is a minor alert.</HelpBox.Body>
		<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
	</HelpBox>
</div>
```

## Variations

```react
<div>
	<HelpBox showLightBulb handleClose={() => true}>
		<HelpBox.Body>This is an alert with a light bulb.</HelpBox.Body>
	</HelpBox>
	<HelpBox hideIcon handleClose={() => true}>
		<HelpBox.Body>This alert has its icon hidden.</HelpBox.Body>
	</HelpBox>
	<HelpBox showRightIcon>
		<HelpBox.Body>This alert is showing its icon on both sides.</HelpBox.Body>
	</HelpBox>
	<HelpBox stacked handleClose={() => true}>
		<HelpBox.Body>This alert's contents are stacked.</HelpBox.Body>
		<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
	</HelpBox>
	<HelpBox>
		<HelpBox.Body>This alert doesn't handle closing.</HelpBox.Body>
		<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
	</HelpBox>
</div>
```

## Large Alerts

```react
<div>
	<HelpBox large handleClose={() => true}>
		<HelpBox.Body>This is a large alert.</HelpBox.Body>
	</HelpBox>
	<HelpBox showLightBulb large handleClose={() => true}>
		<HelpBox.Body>This is a large alert with a light bulb.</HelpBox.Body>
	</HelpBox>
</div>
```
