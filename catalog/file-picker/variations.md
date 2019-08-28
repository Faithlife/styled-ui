```react
showSource: true
state: {
	files: null,
	localizedResources: {
		reccomendedMinSize: 'reccomended minimum image size: 800 x 400',
		uploadFile: 'Upload File',
		uploadFiles: 'Upload Files',
		addText: 'Insert',
		cancelText: 'Cancel',
		dragDropText: 'Drag and drop to upload image',
		browseText: 'or browse files',
	},
}
---
<div>
	<FilePickerDemo>
		<FilePicker
			onFilesSelected={files => { alert( files ); }}
			onCancel={() => alert('You called the onCancelFunction. This should be used to hide the component')}
			allowMultiSelect
		>
			<TabManager>
				<TabList>
					<Tab>
						{state.localizedResources.uploadFiles}
					</Tab>
					<Tab>{'Stock photos'}</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<FileUpload/>
					</TabPanel>
					<TabPanel>
						<AmberContent
							accountId={6817140}
							filter={'kind:"image"'}
							viewStyle={'tinygrid'}
						/>
					</TabPanel>
				</TabPanels>
			</TabManager>
		</FilePicker>
	</FilePickerDemo>
</div>
```

# Localized Resources defaults

```code
lang: javascript
---
	localizedResources: {
		reccomendedMinSize: 'reccomended minimum image size: 800 x 400',
		uploadFile: 'Upload File',
		uploadFiles: 'Upload Files',
		addText: 'Insert',
		cancelText: 'Cancel',
		dragDropText: 'Drag and drop to upload image',
		browseText: 'or browse files',
	}
```