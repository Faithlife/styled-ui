## Colors and Their Meaning

```react
<div>
	<HelpBox handleClose={() => true}>
		<HelpBox.Content>
			<HelpBox.Body>This is a helpful alert.</HelpBox.Body>
			<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
		</HelpBox.Content>
	</HelpBox>
	<HelpBox danger handleClose={() => true}>
		<HelpBox.Content>
			<HelpBox.Body>This is an error alert.</HelpBox.Body>
			<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
		</HelpBox.Content>
	</HelpBox>
	<HelpBox success handleClose={() => true}>
		<HelpBox.Content>
			<HelpBox.Body>This is a successful alert.</HelpBox.Body>
			<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
		</HelpBox.Content>
	</HelpBox>
	<HelpBox warning handleClose={() => true}>
		<HelpBox.Content>
			<HelpBox.Body>This is a cautious alert.</HelpBox.Body>
			<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
		</HelpBox.Content>
	</HelpBox>
	<HelpBox minor handleClose={() => true}>
		<HelpBox.Content>
			<HelpBox.Body>This is a minor alert.</HelpBox.Body>
			<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
		</HelpBox.Content>
	</HelpBox>
</div>
```

## Variations

```react
<div>
	<HelpBox showLightBulb handleClose={() => true}>
		<HelpBox.Content>
			<HelpBox.Body>This is an alert with a light bulb.</HelpBox.Body>
		</HelpBox.Content>
	</HelpBox>
	<HelpBox hideIcon handleClose={() => true}>
		<HelpBox.Content>
			<HelpBox.Body>This alert has its icon hidden.</HelpBox.Body>
		</HelpBox.Content>
	</HelpBox>
	<HelpBox showRightIcon>
		<HelpBox.Content>
			<HelpBox.Body>This alert is showing its icon on both sides.</HelpBox.Body>
		</HelpBox.Content>
	</HelpBox>
	<HelpBox stacked handleClose={() => true}>
		<HelpBox.Content>
			<HelpBox.Body>This alert's contents are stacked.</HelpBox.Body>
			<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
		</HelpBox.Content>
	</HelpBox>
	<HelpBox>
		<HelpBox.Content>
			<HelpBox.Body>This alert doesn't handle closing.</HelpBox.Body>
			<HelpBox.Footer><Button primary style={{ height: '26px', width: '80px' }}>CTA</Button></HelpBox.Footer>
		</HelpBox.Content>
	</HelpBox>
</div>
```

## Large Alerts

```react
<div>
	<HelpBox large handleClose={() => true}>
		<HelpBox.Content>
			<HelpBox.Body>This is a large alert.</HelpBox.Body>
		</HelpBox.Content>
	</HelpBox>
	<HelpBox showLightBulb large handleClose={() => true}>
		<HelpBox.Content>
			<HelpBox.Body>This is a large alert with a light bulb.</HelpBox.Body>
		</HelpBox.Content>
	</HelpBox>
</div>
```
