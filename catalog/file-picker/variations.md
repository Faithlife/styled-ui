## File Picker

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
<Box height={600}>
	<FilePicker
		onFilesSelected={files => {
			if (files.kind === 'files') {
				alert(files.files);
			} else if (files.kind === 'assets') {
				alert(JSON.stringify(files.assets));
			} else if (files.kind === 'filter') {
				alert(JSON.stringify(files.filterData));
			} else {
				console.error(files);
				alert('Invalid response');
			}
		}}
		onCancel={() => alert('You called the onCancelFunction. This should be used to hide the component')}
		onImageLoadError={imageSource => alert(`${imageSource} failed to load`)}
		allowMultiSelect
	>
		<TabManager>
			<TabList>
				<Tab paddingX={4}>
					{state.localizedResources.uploadFiles}
				</Tab>
				<Tab paddingX={4}>{'Stock photos'}</Tab>
				<Tab paddingX={4}>{'Filter'}</Tab>
			</TabList>
			<TabPanels display="grid">
				<TabPanel padding={4} display="grid">
					<FileUpload />
				</TabPanel>
				<TabPanel padding={0} display="grid">
					<AmberContent
						accountId={6817140}
						filter={'kind:"image"'}
						footerText={'This panel selects assets'}
						sort={'relevance'}
						viewStyle={'tinygrid'}
						height="100%"
					/>
				</TabPanel>
				<TabPanel padding={0} display="grid">
					<AmberContent
						accountId={6817140}
						filter={'kind:"image"'}
						footerText={'This panel returns a filter'}
						pickerMode={'filter'}
						sort={'relevance'}
						viewStyle={'tinygrid'}
						height="100%"
					/>
				</TabPanel>
			</TabPanels>
		</TabManager>
	</FilePicker>
</Box>
```

## File Picker in a Modal

```react
showSource: true
state: {
	modal: false,
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
<div>
	<Button variant="primary" size="medium" onClick={() => setState({ modal: !state.modal })}>Open a modal!</Button>
	<Modal
		isOpen={state.modal}
		container="body"
		onClose={() => setState({ modal: false })}
		fullscreen
	>
		<Modal.Header title="File Picker" textStyle="h.24" />
		<Modal.Content>
			<FilePicker
				onFilesSelected={files => {
					if (files.kind === 'files') {
						alert(files.files);
					} else if (files.kind === 'assets') {
						alert(JSON.stringify(files.assets));
					} else if (files.kind === 'filter') {
						alert(JSON.stringify(files.filterData));
					} else {
						console.error(files);
						alert('Invalid response');
					}
				}}
				onCancel={() => alert('You called the onCancelFunction. This should be used to hide the component')}
				onImageLoadError={imageSource => alert(`${imageSource} failed to load`)}
				allowMultiSelect
			>
				<TabManager>
					<TabList>
						<Tab paddingX={4}>
							{state.localizedResources.uploadFiles}
						</Tab>
						<Tab paddingX={4}>{'Stock photos'}</Tab>
						<Tab paddingX={4}>{'Filter'}</Tab>
					</TabList>
					<TabPanels display="grid">
						<TabPanel padding={4} display="grid">
							<FileUpload />
						</TabPanel>
						<TabPanel padding={0} display="grid">
							<AmberContent
								accountId={6817140}
								filter={'kind:"image"'}
								footerText={'This panel selects assets'}
								sort={'relevance'}
								viewStyle={'tinygrid'}
								height="100%"
							/>
						</TabPanel>
						<TabPanel padding={0} display="grid">
							<AmberContent
								accountId={6817140}
								filter={'kind:"image"'}
								footerText={'This panel returns a filter'}
								pickerMode={'filter'}
								sort={'relevance'}
								viewStyle={'tinygrid'}
								height="100%"
							/>
						</TabPanel>
					</TabPanels>
				</TabManager>
			</FilePicker>
		</Modal.Content>
	</Modal>
</div>
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
