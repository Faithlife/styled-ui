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
			<AccordionHeader renderCustomIndicator={AccordionCustomIndicator}>
				Section One Title
			</AccordionHeader>
			<AccordionPanel>
				<div><input placeholder="Name" /></div>
				<div><input placeholder="Email" /></div>
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader renderCustomIndicator={AccordionCustomIndicator}>
				Section Two Title
			</AccordionHeader>
			<AccordionPanel>
				<div><input placeholder="Home address" /></div>
				<div><input placeholder="Zip code" /></div>
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader renderCustomIndicator={AccordionCustomIndicator}>
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

### With subtitles

In most cases the subtitle should be hidden on mobile viewports, but that is a responsibility of the consumer.

```react
plain: true
showSource: true
state: { expandedSections: [] }
---
<AccordionDemo>
	<Accordion expandedSections={state.expandedSections} onExpansion={expandedSections => setState({expandedSections})}>
		<AccordionItem>
			<AccordionHeader subtitle="The first book of the Bible.">
				Genesis
			</AccordionHeader>
			<AccordionPanel>
				<div>In the beginning, God created the heavens and the earth.</div>
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader subtitle="The second book of the Bible.">
				Exodus
			</AccordionHeader>
			<AccordionPanel>
				<div>And these are the names of the sons of Israel who came to Egypt; with Jacob, they each came with his ⌊family⌋:</div>
			</AccordionPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionHeader subtitle="The third book of the Bible.">
				Leviticus
			</AccordionHeader>
			<AccordionPanel>
				<div>Thena Yahweh called to Moses and spoke to him from the tent of assembly, saying,</div>
			</AccordionPanel>
		</AccordionItem>
	</Accordion>
</AccordionDemo>
```
