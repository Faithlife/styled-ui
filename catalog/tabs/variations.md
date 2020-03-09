## Component Variations

A tab controller with screen reader and keyboard navigation support

```react
showSource: true
---
<TabDemo>
	<NewTab.Manager variant="page">
		<NewTab.List>
			<NewTab>First Tab</NewTab>
			<NewTab>Second Tab</NewTab>
			<NewTab>Third Tab</NewTab>
			<NewTab disabled>Disabled Tab</NewTab>
		</NewTab.List>
		<NewTab.Panels>
			<NewTab.Panel>First Tab!</NewTab.Panel>
			<NewTab.Panel>Second Tab!</NewTab.Panel>
			<NewTab.Panel>Third Tab!</NewTab.Panel>
			<NewTab.Panel>Disabled Tab!</NewTab.Panel>
		</NewTab.Panels>
	</NewTab.Manager>
</TabDemo>
```

### Style Variations

Both the Tab and TabPanel components extend the Box component and accept styled-system props.

```react
showSource: true
---
<TabDemo>
	<TabManager>
		<TabList>
			<Tab width="200px">First Tab</Tab>
			<Tab disabled>Disabled Tab</Tab>
			<Tab>Third Tab</Tab>
		</TabList>
		<TabPanels>
			<TabPanel backgroundColor="gray4" padding={5}>First Tab!</TabPanel>
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
<TabDemo spacing={5}>
	<Button variant="primary" size="medium" onClick={() => setState({ currentTab: 0 })}>First tab</Button>
	<Paragraph>The current tab index is {state.currentTab}</Paragraph>
	<div>
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
	</div>
</TabDemo>
```
