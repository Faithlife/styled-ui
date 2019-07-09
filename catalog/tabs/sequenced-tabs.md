### Sequenced Tab Navigation

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
			<SequencedTab>Sixth Tab</SequencedTab>
		</SequencedTabList>
	</TabManager>
</TabDemo>
```

```react
showSource: true
state: { currentTab: 0 }
---
const tabTitles = ["First Tab", "Second Tab", "Third Tab", "Fourth Tab", "Fifth Tab", "Sixth Tab"];
const tabContent = [
	<Button primary small>I do nothing</Button>,
	<Button primary medium disabled>I am disabled</Button>,
	<Button primary small onClick={() => setState({ currentTab: 0 })}>Back to the beginning!</Button>,
	<Button primary large>I do nothing but really big</Button>,
	<Button minor small>I do nothing but minorly</Button>,
	<Button primary large onClick={() => setState({ currentTab: 2 })}>Back to the middle!</Button>,
];

<TabDemo>
	<TabManager selectedTab={state.currentTab} onSelectedTabChange={tabIndex => setState({ currentTab: tabIndex })}>
		<SequencedTabList>
			<SequencedTab styleOverrides={{ width: '121px' }}>{tabTitles[0]}</SequencedTab>
			<SequencedTab styleOverrides={{ width: '121px' }}>{tabTitles[1]}</SequencedTab>
			<SequencedTab styleOverrides={{ width: '121px' }}>{tabTitles[2]}</SequencedTab>
			<SequencedTab styleOverrides={{ width: '121px' }}>{tabTitles[3]}</SequencedTab>
			<SequencedTab styleOverrides={{ width: '121px' }}>{tabTitles[4]}</SequencedTab>
			<SequencedTab styleOverrides={{ width: '121px' }}>{tabTitles[5]}</SequencedTab>
		</SequencedTabList>
		<TabPanels>
			<TabPanel>{tabContent[0]}</TabPanel>
			<TabPanel>{tabContent[1]}</TabPanel>
			<TabPanel>{tabContent[2]}</TabPanel>
			<TabPanel>{tabContent[3]}</TabPanel>
			<TabPanel>{tabContent[4]}</TabPanel>
			<TabPanel>{tabContent[5]}</TabPanel>
		</TabPanels>
	</TabManager>
	<Button disabled={state.currentTab === 0} primary medium onClick={() => setState({ currentTab: state.currentTab - 1 })}>
		Back
	</Button>
	<Button disabled={state.currentTab === tabTitles.length - 1} primary medium onClick={() => setState({ currentTab: state.currentTab + 1 })}>
		Next
	</Button>
</TabDemo>
```
