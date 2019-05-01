Accordions.

## Component Variations

### Scale Factor

```react
showSource: true
---
<AccordionDemo>
	<Accordion>
		<AccordionItem>
			<AccordionHeader>
				Section One Title
			</AccordionHeader>
			<AccordionPanel>
				Section One Body
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader>
				Section Two Title
			</AccordionHeader>
			<div style={{ gridRow: 'header', gridColumn: 'extra'}}>
				Hey!
			</div>
			<AccordionPanel>
				Section Two Body
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader>
				Section Three Title
			</AccordionHeader>
			<AccordionPanel>
				Section Three Body
			</AccordionPanel>
		</AccordionItem>
	</Accordion>
</AccordionDemo>
```
