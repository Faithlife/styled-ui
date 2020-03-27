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
			<Tab disabled>Disabled Tab</Tab>
		</TabList>
		<TabPanels>
			<TabPanel>First Tab!</TabPanel>
			<TabPanel>Second Tab!</TabPanel>
			<TabPanel>Third Tab!</TabPanel>
			<TabPanel>Disabled Tab!</TabPanel>
		</TabPanels>
	</TabManager>
</TabDemo>
```

Supports modal (default) and page variants

```react
showSource: true
---
<TabDemo>
	<TabManager variant="page">
		<TabList>
			<Tab>First Tab</Tab>
			<Tab>Second Tab</Tab>
			<Tab>Third Tab</Tab>
			<Tab disabled>Disabled Tab</Tab>
		</TabList>
		<TabPanels>
			<TabPanel>First Tab!</TabPanel>
			<TabPanel>Second Tab!</TabPanel>
			<TabPanel>Third Tab!</TabPanel>
			<TabPanel>Disabled Tab!</TabPanel>
		</TabPanels>
	</TabManager>
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
