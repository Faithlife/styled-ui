```react
showSource: true
state: {
	files: null,
	localizedResources: {
		recommendedMinSize: 'recommended minimum image size: 800 x 400',
		uploadFile: 'Upload File',
		uploadFiles: 'Upload Files',
		addText: 'Insert',
		cancelText: 'Cancel',
		dragDropText: 'Drag and drop to upload image',
		browseText: 'or browse files',
	},
}
---
<FilePickerDemo>
	<FilePicker
		onFilesSelected={files => {
			if (files.kind === 'files') {
				alert(files.files);
			} else {
				alert(files.assets);
			}
		}}
		onCancel={() => alert('You called the onCancelFunction. This should be used to hide the component')}
		onImageLoadError={imageSource => alert(`${imageSource} failed to load`)}
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
					<FileUpload />
				</TabPanel>
				<TabPanel>
					<AmberContent
						accountId={6817140}
						filter={'kind:"image"'}
						footerText={'Custom footer text'}
						sort={'relevance'}
						viewStyle={'tinygrid'}
					/>
				</TabPanel>
			</TabPanels>
		</TabManager>
	</FilePicker>
</FilePickerDemo>
```

# Localized Resources defaults

```code
lang: javascript
---
	localizedResources: {
		recommendedMinSize: 'recommended minimum image size: 800 x 400',
		uploadFile: 'Upload File',
		uploadFiles: 'Upload Files',
		addText: 'Insert',
		cancelText: 'Cancel',
		dragDropText: 'Drag and drop to upload image',
		browseText: 'or browse files',
	}
```
