### Default theme

```react
state: {
	file: null,
	tabs: [{ title: 'Title 1', vaultId: 5698187, filter: ''}, { title: 'Title 2', vaultId: 5698187, filter: ''}]
}
---
<div>
	<AmberLightboxDemo>
		<AmberLightbox
			localizationProps={{cancelText: 'Cancel (localized)'}}
			onFileSelected={(file) => setState({ file: file })}
			tabs={state.tabs}
		/>
	</AmberLightboxDemo>
	<FileContainer>
		File : {!state.file ? 'nothing selected' : state.file.title || state.file.uri}
		{console.log('file is', state.file)}
	</FileContainer>
</div>
```
