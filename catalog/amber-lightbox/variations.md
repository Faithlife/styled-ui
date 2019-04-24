### Default theme

```react
state: {
	file: null,
	tabs: [{ title: 'Title 1', vaultId: 5698187, viewStyle: 'tinygrid'}, { title: 'Title 2', vaultId: 5698187, filter: ''}]
}
---
<div>
	<AmberLightboxDemo>
		<AmberLightbox
			onFileSelected={(file) => setState({ file: file })}
			tabs={state.tabs}
			onCancel={() => alert('You called the onCancelFunction')}
		/>
	</AmberLightboxDemo>
	<FileContainer>
		File : {!state.file ? 'nothing selected' : (state.file.name || state.file.uri)}
		{console.log('file is', state.file)}
	</FileContainer>
</div>
```
