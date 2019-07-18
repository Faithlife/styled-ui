### Sequenced Tab Navigation

```react
showSource: true
---
<TabDemo>
	<TabManager>
		<SequencedTabList>
			<SequencedTab>First Tab</SequencedTab>
			<SequencedTab>Second Tab</SequencedTab>
			<SequencedTab>Third Tab</SequencedTab>
			<SequencedTab>Fourth Tab</SequencedTab>
			<SequencedTab>Fifth Tab, Text is Wrapped</SequencedTab>
		</SequencedTabList>
	</TabManager>
</TabDemo>
```

### With Associated Tab Content

```react
showSource: true
---
<TabDemo>
	<TabManager>
		<SequencedTabList>
			<SequencedTab>First Tab</SequencedTab>
			<SequencedTab>Second Tab</SequencedTab>
			<SequencedTab>Third Tab</SequencedTab>
			<SequencedTab>Fourth Tab</SequencedTab>
			<SequencedTab>Fifth Tab</SequencedTab>
		</SequencedTabList>
		<TabPanels>
			<TabPanel>First Tab!</TabPanel>
			<TabPanel>Second Tab!</TabPanel>
			<TabPanel>Third Tab!</TabPanel>
			<TabPanel>Fourth Tab!</TabPanel>
			<TabPanel>Fifth Tab!</TabPanel>
		</TabPanels>
	</TabManager>
</TabDemo>
```

### Using Disabled and Completed Flags

A tab with `completed` set should not be skipped.

```react
showSource: true
---
<TabDemo>
	<TabManager>
		<SequencedTabList>
			<SequencedTab>First Tab</SequencedTab>
			<SequencedTab>Second Tab</SequencedTab>
			<SequencedTab disabled>Third Tab</SequencedTab>
			<SequencedTab completed>Fourth Tab</SequencedTab>
			<SequencedTab>Fifth Tab</SequencedTab>
		</SequencedTabList>
	</TabManager>
</TabDemo>
```
