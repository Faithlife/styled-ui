## Component Variations

### Basic

```react
showSource: true
state: {
	fileNames: [],
}
---
<DropZoneDemo>
	<DropZone
		onDrop={dropEvent => {
			dropEvent.preventDefault();
			dropEvent.stopPropagation();

			const files = dropEvent.dataTransfer.files;
			const fileNames = [];
			for (const file of files) {
				fileNames.push(file.name);
			}

			setState(prevState => ({
				fileNames: [...prevState.fileNames, ...fileNames],
			}));
		}}
	>
		Drop files
	</DropZone>
	<DroppedFiles>
		{state.fileNames.map((name, i) => <div key={`${name}_{i}`}>Dropped file: {name}</div>)}
	</DroppedFiles>
</DropZoneDemo>
```

### With more complex children

```react
showSource: true
state: {
	fileNames: [],
}
---
<DropZoneDemo>
	<DropZone
		onDrop={dropEvent => {
			dropEvent.preventDefault();
			dropEvent.stopPropagation();

			const files = dropEvent.dataTransfer.files;
			const fileNames = [];
			for (const file of files) {
				fileNames.push(file.name);
			}

			setState(prevState => ({
				fileNames: [...prevState.fileNames, ...fileNames],
			}));
		}}
	>
		<IconsContainer>
			<svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="0"
				viewBox="0 0 512 512"
				height="28"
				width="28"
			>
				<path d="M470.4 1.5l-304 96C153.1 101.7 144 114 144 128v264.6c-14.1-5.4-30.5-8.6-48-8.6-53 0-96 28.7-96 64s43 64 96 64 96-28.7 96-64V220.5l272-85.9v194c-14.1-5.4-30.5-8.6-48-8.6-53 0-96 28.7-96 64s43 64 96 64 96-28.7 96-64V32c0-21.7-21.1-37-41.6-30.5z" />
			</svg>
			<svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="0"
				viewBox="0 0 384 512"
				height="28"
				width="28"
			>
				<path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
			</svg>
		</IconsContainer>
		<DropZoneMessage>Drag & drop to upload chord charts, tracks, etc.</DropZoneMessage>
	</DropZone>
	<DroppedFiles>
		{state.fileNames.map((name, i) => <div key={`${name}_{i}`}>Dropped file: {name}</div>)}
	</DroppedFiles>
</DropZoneDemo>
```
