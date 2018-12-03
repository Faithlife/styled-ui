## Component Variations

### With Drop Target

```react
showSource: true
state: {
	files: [
		{
			id: 'one',
			mediaType: 'image/png',
			name: 'File one',
			byteCount: 1244124,
			isProcessing: false,
		},
		{
			id: 'two',
			mediaType: 'video/mp4',
			name: 'File two',
			byteCount: 123,
			isProcessing: false,
		},
		{
			id: 'three',
			mediaType: 'audio/mpeg',
			name: 'File three',
			byteCount: 923992344124,
			isProcessing: false,
		},
	],
}
---
<div>
	<FilesSection
		files={state.files}
		onFileClicked={file => console.log(file)}
		onUploadFiles={event => {
			event.stopPropagation();
			event.preventDefault();

			const files =
				(event.dataTransfer && event.dataTransfer.files) ||
				(event.target && event.target.files);

			const mappedFiles = [];
			for (const file of files) {
				mappedFiles.push({
					id: file.name,
					name: file.name,
					byteCount: file.size,
					mediaType: file.type,
				});
			}

			setState(prevState => ({
				files: [...prevState.files, ...mappedFiles],
			}));
		}}
	/>
</div>
```

## With file actions

```react
showSource: true
state: {
	files: [
		{
			id: 'one',
			mediaType: 'image/png',
			name: 'File one',
			byteCount: 1244124,
			isProcessing: false,
		},
		{
			id: 'two',
			mediaType: 'video/mp4',
			name: 'File two',
			byteCount: 123,
			isProcessing: false,
		},
		{
			id: 'three',
			mediaType: 'audio/mpeg',
			name: 'File three',
			byteCount: 923992344124,
			isProcessing: false,
		},
	],
}
---
<div>
	<FilesSection
		files={state.files}
		onFileClicked={file => console.log(file)}
		renderFileActions={file => (
			<div style={{ paddingTop: 4 }}>
				{file.mediaType.startsWith('image') && (
					<span style={{ padding: '0 16px 0 0' }}>
						<Button onClick={() => console.log('Print file', file)} title="Print" primaryTransparent>
							<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>
						</Button>
					</span>
				)}
				<Button onClick={() => console.log('Download file', file)} title="Download" primaryTransparent>
					<svg width="16px" height="16px" viewBox="0 0 16 16"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g fill="currentColor"><path d="M9,7.79516537 L9,1 L7,1 L7,7.56670377 L4.71728604,5.35377997 L3.32519442,6.78977472 L7.48559482,10.8229778 L8.21010405,11.5253364 L8.90589288,10.7945156 L12.86268,6.63850972 L11.4141755,5.25943949 L9,7.79516537 Z M14.5,16 L16,16 L16,10 L14,10 L14,14 L2,14 L2,10 L0,10 L0,16 L1.5,16 L14.5,16 L14.5,16 Z" /></g></g></svg>
				</Button>
			</div>
		)}
	/>
</div>
```

## With processing files

```react
showSource: true
state: {
	files: [
		{
			id: 'one',
			mediaType: 'image/png',
			name: 'File one',
			byteCount: 1244124,
			isProcessing: false,
		},
		{
			id: 'two',
			mediaType: 'video/mp4',
			name: 'File two',
			byteCount: 123,
			isProcessing: false,
		},
		{
			id: 'three',
			mediaType: 'audio/mpeg',
			name: 'File three',
			byteCount: 923992344124,
			isProcessing: true,
		},
	],
}
---
<div>
	<FilesSection
		files={state.files}
		onFileClicked={file => console.log(file)}
		renderLoadingSpinner={() => <LoadingSpinner small />}
	/>
</div>
```

## With localized strings

```react
showSource: true
state: {
	files: [
		{
			id: 'one',
			mediaType: 'image/png',
			name: 'Archivo uno',
			byteCount: 1244124,
			isProcessing: false,
		},
		{
			id: 'two',
			mediaType: 'video/mp4',
			name: 'Archivo dos',
			byteCount: 123,
			isProcessing: false,
		},
		{
			id: 'three',
			mediaType: 'audio/mpeg',
			name: 'Archivo tres',
			byteCount: 923992344124,
			isProcessing: false,
		},
	],
}
---
<div>
	<FilesSection
		title="Archivos"
		dropZoneText="Arrastra y suelta para subir archivos"
		browseFilesButtonText="o navegar archivos"
		mediaTypeLabels={{
			video: 'Vídeo',
			audio: 'Audio',
			image: 'Imagen',
			default: 'Otro',
		}}
		files={state.files}
		onFileClicked={file => console.log(file)}
		onUploadFiles={() => console.log('Handle upload files')}
	/>
</div>
```

## Without clickable files

```react
showSource: true
state: {
	files: [
		{
			id: 'one',
			mediaType: 'image/png',
			name: 'File one',
			byteCount: 1244124,
			isProcessing: false,
		},
		{
			id: 'two',
			mediaType: 'video/mp4',
			name: 'File two',
			byteCount: 123,
			isProcessing: false,
		},
		{
			id: 'three',
			mediaType: 'audio/mpeg',
			name: 'File three',
			byteCount: 923992344124,
			isProcessing: false,
		},
	],
}
---
<div>
	<FilesSection files={state.files} />
</div>
```

## With a large title

```react
showSource: true
state: {
	files: [
		{
			id: 'one',
			mediaType: 'image/png',
			name: 'File one',
			byteCount: 1244124,
			isProcessing: false,
		},
		{
			id: 'two',
			mediaType: 'video/mp4',
			name: 'File two',
			byteCount: 123,
			isProcessing: false,
		},
		{
			id: 'three',
			mediaType: 'audio/mpeg',
			name: 'File three',
			byteCount: 923992344124,
			isProcessing: false,
		},
	],
}
---
<div>
	<FilesSection files={state.files} titleFontSize="32px" />
</div>
```
