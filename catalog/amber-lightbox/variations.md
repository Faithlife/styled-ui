### Default theme

```react
state: {
	file: null,
}
---
<div>
	<AmberLightboxDemo>
		<AmberLightbox
			localizationProps={{cancelText: 'Cancel (localized)'}}
			onFileSelected={(file) => setState({ file: file })}
		/>
	</AmberLightboxDemo>
	<FileContainer>
		File name: {state.file ? state.file.name : ''}
	</FileContainer>
</div>
```
