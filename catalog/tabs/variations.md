## Component Variations

A tab controller with screen reader and keyboard navigation support

```react
showSource: true
---
<TabDemo>
	<TabManager>
		<TabList>
			<Tab>First Tab</Tab>
			<Tab>Second Tab</Tab>
			<Tab>Third Tab</Tab>
		</TabList>
		<TabPanels>
			<TabPanel>First Tab!</TabPanel>
			<TabPanel>Second Tab!</TabPanel>
			<TabPanel>Third Tab!</TabPanel>
		</TabPanels>
	</TabManager>
</TabDemo>
```

### Style Variations

```react
showSource: true
---
<TabDemo>
	<TabManager theme={{ tabHighlightColor: 'plum' }} styleOverrides={{ width: '200px' }}>
		<TabList>
			<Tab>First Tab</Tab>
			<Tab disabled>Disabled Tab</Tab>
			<Tab>Third Tab</Tab>
		</TabList>
		<TabPanels>
			<TabPanel>First Tab!</TabPanel>
			<TabPanel>Second Tab!</TabPanel>
			<TabPanel>Third Tab!</TabPanel>
		</TabPanels>
	</TabManager>
</TabDemo>
```

### Controlled

```react
showSource: true
state: { currentTab: 0 }
---
<TabDemo>
	The current tab index is {state.currentTab}
	<Button primary medium onClick={() => setState({ currentTab: 0 })}>First tab</Button>
	<TabManager selectedTab={state.currentTab} onSelectedTabChange={tabIndex => setState({ currentTab: tabIndex })}>
		<TabList>
			<Tab>First Tab</Tab>
			<Tab>Second Tab</Tab>
			<Tab>Third Tab</Tab>
		</TabList>
		<TabPanels>
			<TabPanel>First Tab!</TabPanel>
			<TabPanel>Second Tab!</TabPanel>
			<TabPanel>Third Tab!</TabPanel>
		</TabPanels>
	</TabManager>
</TabDemo>
```
