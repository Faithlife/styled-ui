Accordions.

## Component Variations

### With arrows

```react
plain: true
showSource: true
---
<AccordionDemo>
	<Accordion>
		<AccordionItem>
			<AccordionHeader>
				Section One Title
			</AccordionHeader>
			<AccordionPanel>
				<div><input placeholder="Name" /></div>
				<div><input placeholder="Email" /></div>
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader>
				Section Two Title
			</AccordionHeader>
			<AccordionPanel>
				<div><input placeholder="Home address" /></div>
				<div><input placeholder="Zip code" /></div>
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader>
				Section Three Title
			</AccordionHeader>
			<AccordionPanel>
				<div><input placeholder="Mother's maiden name" /></div>
				<div><input placeholder="Name of your first pet" /></div>
			</AccordionPanel>
		</AccordionItem>
	</Accordion>
</AccordionDemo>
```

### With hideArrows

```react
plain: true
showSource: true
---
<AccordionDemo>
	<Accordion hideArrows>
		<AccordionItem>
			<AccordionHeader>
				Section One Title
			</AccordionHeader>
			<AccordionExtraButton>
				<Checkbox isChecked />
			</AccordionExtraButton>
			<AccordionPanel>
				<div><input placeholder="Name" /></div>
				<div><input placeholder="Email" /></div>
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader>
				Section Two Title
			</AccordionHeader>
			<AccordionExtraButton>
				<Checkbox isChecked />
			</AccordionExtraButton>
			<AccordionPanel>
				<div><input placeholder="Home address" /></div>
				<div><input placeholder="Zip code" /></div>
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader>
				Section Three Title
			</AccordionHeader>
			<AccordionExtraButton>
				<Checkbox isChecked />
			</AccordionExtraButton>
			<AccordionPanel>
				<div><input placeholder="Mother's maiden name" /></div>
				<div><input placeholder="Name of your first pet" /></div>
			</AccordionPanel>
		</AccordionItem>
	</Accordion>
</AccordionDemo>
```
