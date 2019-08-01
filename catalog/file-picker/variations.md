```react
state: {
	files: null,
	tabs: [{
		title: 'Stock Photos',
		accountId: 6817140,
		viewStyle: 'tinygrid',
		filter: ''
	}
	],
	localizedResources: {
		reccomendedMinSize: 'reccomended minimum image size: 800 x 400',
		uploadFile: 'Upload File',
		uploadFiles: 'Upload Files'
	},
}
---
<div>
	<FilePickerDemo>
		<FilePicker
			onFilesSelected={files => { alert( files ); }}
			tabs={state.tabs}
			onCancel={() => alert('You called the onCancelFunction. This should be used to hide the component')}
			allowMultiSelect
			localizedResources={state.localizedResources}
		/>
	</FilePickerDemo>
</div>
```
