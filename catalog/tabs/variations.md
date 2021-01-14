```react
noSource: true
---
<React.Fragment>
	<V6Banner>
		<AcceptsStyledSystemProps />
	</V6Banner>
</React.Fragment>
```

## Component Variations

A tab controller with screen reader and keyboard navigation support

```react
showSource: true
---
<TabDemo>
	<Tab.Manager>
		<Tab.List>
			<Tab>First Tab</Tab>
			<Tab>Second Tab</Tab>
			<Tab>Third Tab</Tab>
			<Tab disabled>Disabled Tab</Tab>
		</Tab.List>
		<Tab.Panels>
			<Tab.Panel>First Tab!</Tab.Panel>
			<Tab.Panel>Second Tab!</Tab.Panel>
			<Tab.Panel>Third Tab!</Tab.Panel>
			<Tab.Panel>Disabled Tab!</Tab.Panel>
		</Tab.Panels>
	</Tab.Manager>
</TabDemo>
```

Supports modal (default) and page variants

```react
showSource: true
---
<TabDemo>
	<Tab.Manager variant="page">
		<Tab.List>
			<Tab>First Tab</Tab>
			<Tab>Second Tab</Tab>
			<Tab>Third Tab</Tab>
			<Tab disabled>Disabled Tab</Tab>
		</Tab.List>
		<Tab.Panels>
			<Tab.Panel>First Tab!</Tab.Panel>
			<Tab.Panel>Second Tab!</Tab.Panel>
			<Tab.Panel>Third Tab!</Tab.Panel>
			<Tab.Panel>Disabled Tab!</Tab.Panel>
		</Tab.Panels>
	</Tab.Manager>
</TabDemo>
```

### Style Variations

Both the Tab and Tab.Panel components extend the Box component and accept styled-system props.

```react
showSource: true
---
<TabDemo>
	<Tab.Manager>
		<Tab.List>
			<Tab width="200px">First Tab</Tab>
			<Tab disabled>Disabled Tab</Tab>
			<Tab>Third Tab</Tab>
		</Tab.List>
		<Tab.Panels>
			<Tab.Panel backgroundColor="gray4" padding={5}>First Tab!</Tab.Panel>
			<Tab.Panel>Second Tab!</Tab.Panel>
			<Tab.Panel>Third Tab!</Tab.Panel>
		</Tab.Panels>
	</Tab.Manager>
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
		<Tab.Manager selectedTab={state.currentTab} onSelectedTabChange={tabIndex => setState({ currentTab: tabIndex })}>
			<Tab.List>
				<Tab>First Tab</Tab>
				<Tab>Second Tab</Tab>
				<Tab>Third Tab</Tab>
			</Tab.List>
			<Tab.Panels>
				<Tab.Panel>First Tab!</Tab.Panel>
				<Tab.Panel>Second Tab!</Tab.Panel>
				<Tab.Panel>Third Tab!</Tab.Panel>
			</Tab.Panels>
		</Tab.Manager>
	</div>
</TabDemo>
```
