### Default theme

```react
state: {
	files: null,
	tabs: [{ title: 'Title 1', vaultId: 5698187, viewStyle: 'tinygrid'}, { title: 'Title 2', vaultId: 5698187, filter: ''}]
}
---
<div>
	<AmberLightboxDemo>
		<AmberLightbox
			onFileSelected={files => { alert( files ); }}
			tabs={state.tabs}
			onCancel={() => alert('You called the onCancelFunction. This should be used to hide the component')}
			allowMultiSelect
			userId={6531175}
		/>
	</AmberLightboxDemo>
</div>
```
