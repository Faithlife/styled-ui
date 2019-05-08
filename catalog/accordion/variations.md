These `<Accordion>` components follow the [WAI-AIRA spec for accordions](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion).

We do not currently support any options for requiring that one section always be open, or else limiting that no more than one section can be open. If you need this functionality, consider opening a PR.

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

### With `hideArrows` and custom indicators

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
			<AccordionCustomIndicator>
				<Checkbox isChecked />
			</AccordionCustomIndicator>
			<AccordionPanel>
				<div><input placeholder="Name" /></div>
				<div><input placeholder="Email" /></div>
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader>
				Section Two Title
			</AccordionHeader>
			<AccordionCustomIndicator>
				<Checkbox isChecked />
			</AccordionCustomIndicator>
			<AccordionPanel>
				<div><input placeholder="Home address" /></div>
				<div><input placeholder="Zip code" /></div>
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader>
				Section Three Title
			</AccordionHeader>
			<AccordionCustomIndicator>
				<Checkbox isChecked />
			</AccordionCustomIndicator>
			<AccordionPanel>
				<div><input placeholder="Mother's maiden name" /></div>
				<div><input placeholder="Name of your first pet" /></div>
			</AccordionPanel>
		</AccordionItem>
	</Accordion>
</AccordionDemo>
```
