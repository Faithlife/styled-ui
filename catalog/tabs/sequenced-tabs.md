### Sequenced Tab Navigation

```react
showSource: true
state: { currentTab: 0 }
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

```react
showSource: true
state: { currentTab: 0 }
---
<TabDemo>
	<TabManager>
		<SequencedTabList>
			<SequencedTab>First Tab</SequencedTab>
			<SequencedTab>Second Tab</SequencedTab>
			<SequencedTab>Third Tab</SequencedTab>
		</SequencedTabList>
	</TabManager>
</TabDemo>
```

### With Associated Tab Content

```react
showSource: true
state: { currentTab: 0 }
---
<TabDemo>
	<TabManager selectedTab={state.currentTab} onSelectedTabChange={tabIndex => setState({ currentTab: tabIndex })}>
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
	<Button disabled={state.currentTab === 0} primary medium onClick={() => setState({ currentTab: state.currentTab - 1 })}>
		Back
	</Button>
	<Button disabled={state.currentTab === 4} primary medium onClick={() => setState({ currentTab: state.currentTab + 1 })}>
		Next
	</Button>
</TabDemo>
```
