### Default theme

```react
state: {
	files: null,
	tabs: [{ title: 'Your Group', vaultId: 5698187, viewStyle: 'tinygrid'}, { title: 'Stock Photos', vaultId: 6817140, filter: ''}]
}
---
<div>
	<FilePickerDemo>
		<FilePicker
			onFilesSelected={files => { alert( files ); }}
			tabs={state.tabs}
			onCancel={() => alert('You called the onCancelFunction. This should be used to hide the component')}
			allowMultiSelect
			minFileSize={'minimum image size: 800 x 400'}
		/>
	</FilePickerDemo>
</div>
```
