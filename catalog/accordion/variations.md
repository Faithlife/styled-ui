These `<Accordion>` components follow the [WAI-AIRA spec for accordions](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion).

This component does not directly support any options for requiring that one section always be open, or else limiting that no more than one section can be open. However, this component uses a fully-controlled pattern and this functionality could be implemented with a wrapping component in consuming code.

An `<Accordion>` can have any number of `<Accordion.Item>` children.
Each `<Accordion.Item>` should have exactly one `<Accordion.Header>` and one `<Accordion.Panel>` as children.

## Component Variations

### With arrows

```react
plain: true
showSource: true
state: { expandedSections: [0] }
---
<AccordionDemo>
	<Accordion expandedSections={state.expandedSections} onExpansion={expandedSections => setState({expandedSections})}>
		<Accordion.Item>
			<Accordion.Header>
				<Accordion.Title>Section One Title</Accordion.Title>
				<Accordion.Subtitle>Subtitle for Section One.</Accordion.Subtitle>
			</Accordion.Header>
			<Accordion.Panel>
				<Form>
					<Input small placeholder="Name" />
					<Input small placeholder="Email" />
				</Form>
			</Accordion.Panel>
		</Accordion.Item>
		<Accordion.Item>
			<Accordion.Header>
				<Accordion.Title>Section One Title</Accordion.Title>
				<Accordion.Subtitle>Subtitle for Section One.</Accordion.Subtitle>
			</Accordion.Header>
			<Accordion.Panel>
				<Form>
					<Input small placeholder="Home address" />
					<Input small placeholder="Zip code" />
				</Form>
			</Accordion.Panel>
		</Accordion.Item>
		<Accordion.Item>
			<Accordion.Header>
				<Accordion.Title>Section Three Title</Accordion.Title>
			</Accordion.Header>
			<Accordion.Panel>
				<Form>
					<Input small placeholder="Mother's maiden name" />
					<Input small placeholder="Name of your first pet" />
				</Form>
			</Accordion.Panel>
		</Accordion.Item>
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
		<Accordion.Item>
			<Accordion.Header renderCustomIndicator={AccordionCustomIndicator}>
				<Accordion.Title>Section One Title</Accordion.Title>
			</Accordion.Header>
			<Accordion.Panel>
				<Form>
					<Input small placeholder="Name" />
					<Input small placeholder="Email" />
				</Form>
			</Accordion.Panel>
		</Accordion.Item>
		<Accordion.Item>
			<Accordion.Header renderCustomIndicator={AccordionCustomIndicator}>
				<Accordion.Title>Section Two Title</Accordion.Title>
			</Accordion.Header>
			<Accordion.Panel>
				<Form>
					<Input small placeholder="Home address" />
					<Input small placeholder="Zip code" />
				</Form>
			</Accordion.Panel>
		</Accordion.Item>
		<Accordion.Item>
			<Accordion.Header renderCustomIndicator={AccordionCustomIndicator}>
				<Accordion.Title>Section Three Title</Accordion.Title>
			</Accordion.Header>
			<Accordion.Panel>
				<Form>
					<Input small placeholder="Mother's maiden name" />
					<Input small placeholder="Name of your first pet" />
				</Form>
			</Accordion.Panel>
		</Accordion.Item>
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
		<Accordion.Item>
			<Accordion.Header>
				<Accordion.Title>Genesis</Accordion.Title>
				<Accordion.Subtitle>The first book of the Bible.</Accordion.Subtitle>
			</Accordion.Header>
			<Accordion.Panel>
				<div>In the beginning, God created the heavens and the earth.</div>
			</Accordion.Panel>
		</Accordion.Item>
		<Accordion.Item>
			<Accordion.Header>
				<Accordion.Title>Exodus</Accordion.Title>
				<Accordion.Subtitle>The second book of the Bible.</Accordion.Subtitle>
			</Accordion.Header>
			<Accordion.Panel>
				<div>And these are the names of the sons of Israel who came to Egypt; with Jacob, they each came with his ⌊family⌋:</div>
			</Accordion.Panel>
		</Accordion.Item>
		<Accordion.Item>
			<Accordion.Header>
				<Accordion.Title>Leviticus</Accordion.Title>
				<Accordion.Subtitle>The third book of the Bible.</Accordion.Subtitle>
			</Accordion.Header>
			<Accordion.Panel>
				<div>Then Yahweh called to Moses and spoke to him from the tent of assembly, saying,</div>
			</Accordion.Panel>
		</Accordion.Item>
	</Accordion>
</AccordionDemo>
```
