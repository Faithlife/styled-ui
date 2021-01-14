```react
noSource: true
---
<React.Fragment>
	<V6Banner>
		<AcceptsStyledSystemProps />
	</V6Banner>
</React.Fragment>
```

### Sequenced Tab Navigation

```react
showSource: true
---
<TabDemo>
	<Tab.Manager>
		<SequencedTab.List>
			<SequencedTab>First Tab</SequencedTab>
			<SequencedTab>Second Tab</SequencedTab>
			<SequencedTab>Third Tab</SequencedTab>
			<SequencedTab>Fourth Tab</SequencedTab>
			<SequencedTab>Fifth Tab, Text is Wrapped</SequencedTab>
		</SequencedTab.List>
	</Tab.Manager>
</TabDemo>
```

### With Associated Tab Content

```react
showSource: true
---
<TabDemo>
	<Tab.Manager>
		<SequencedTab.List>
			<SequencedTab>First Tab</SequencedTab>
			<SequencedTab>Second Tab</SequencedTab>
			<SequencedTab>Third Tab</SequencedTab>
			<SequencedTab>Fourth Tab</SequencedTab>
			<SequencedTab>Fifth Tab</SequencedTab>
		</SequencedTab.List>
		<Tab.Panels>
			<Tab.Panel>First Tab!</Tab.Panel>
			<Tab.Panel>Second Tab!</Tab.Panel>
			<Tab.Panel>Third Tab!</Tab.Panel>
			<Tab.Panel>Fourth Tab!</Tab.Panel>
			<Tab.Panel>Fifth Tab!</Tab.Panel>
		</Tab.Panels>
	</Tab.Manager>
</TabDemo>
```

### Using Disabled and Completed Flags

A tab with `completed` set should not be skipped.

```react
showSource: true
---
<TabDemo>
	<Tab.Manager>
		<SequencedTab.List>
			<SequencedTab>First Tab</SequencedTab>
			<SequencedTab>Second Tab</SequencedTab>
			<SequencedTab disabled>Third Tab</SequencedTab>
			<SequencedTab completed>Fourth Tab</SequencedTab>
			<SequencedTab>Fifth Tab</SequencedTab>
		</SequencedTab.List>
	</Tab.Manager>
</TabDemo>
```
