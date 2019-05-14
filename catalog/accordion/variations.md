These `<Accordion>` components follow the [WAI-AIRA spec for accordions](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion).

We do not currently support any options for requiring that one section always be open, or else limiting that no more than one section can be open. If you need this functionality, consider opening a PR.

An `<Accordion>` can have any number of `<AccordionItem>` children.
Each `<AccordionItem>` should have exactly one `<AccordionHeader>` and one `<AccordionPanel>` as children.

## Component Variations

### With arrows

```react
plain: true
showSource: true
state: { expandedSections: [0] }
---
<AccordionDemo>
	<Accordion expandedSections={state.expandedSections} onExpansion={expandedSections => setState({expandedSections})}>
		<AccordionItem>
			<AccordionHeader subtitle="Subtitle for Section One.">
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

For usability, it is suggested that custom indicators have `tabindex: -1` and not be a part of the tab order.

```react
plain: true
showSource: true
state: { expandedSections: [0, 2] }
---
<AccordionDemo>
	<Accordion hideArrows expandedSections={state.expandedSections} onExpansion={expandedSections => setState({expandedSections})}>
		<AccordionItem>
			<AccordionHeader customIndicator={AccordionCustomIndicator}>
				Section One Title
			</AccordionHeader>
			<AccordionPanel>
				<div><input placeholder="Name" /></div>
				<div><input placeholder="Email" /></div>
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader customIndicator={AccordionCustomIndicator}>
				Section Two Title
			</AccordionHeader>
			<AccordionPanel>
				<div><input placeholder="Home address" /></div>
				<div><input placeholder="Zip code" /></div>
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader customIndicator={AccordionCustomIndicator}>
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
