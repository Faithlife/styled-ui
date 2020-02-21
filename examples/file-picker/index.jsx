import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@faithlife/styled-ui';
import { FilePicker } from '@faithlife/file-picker';
import localizedResources from '@faithlife/smart-media-editor/dist/locales/en-US/resources.json';

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleIsOpen = useCallback(() => {
		setIsOpen(previousState => !previousState);
	}, []);
	const handleCancel = useCallback(() => {
		setIsOpen(false);
	}, []);

	const [selectedFile, setSelectedFile] = useState(null);
	const handleFilesSelected = useCallback(selectedFiles => {
		const firstAsset = selectedFiles.assets[0];
		setSelectedFile(firstAsset);
		setIsOpen(false);
	}, []);

	let previewImage = null;
	if (selectedFile) {
		// This example app renders the preview image at 480px x 270px, so here we're using for the Amber Preview 512 format.
		// A more intelligent way to do this might be to iterate the available formats and look for the one that has the closest width.
		const smallPreviewFormat = selectedFile.formats.find(x => x.name === 'Amber Preview 512');

		// If the asset doesn't have that preview selected, we fallback to the original file.
		const bestPreviewFile = (smallPreviewFormat && smallPreviewFormat.file) || selectedFile.file;

		// asset.file.link.uri is returned by calls to getAsset, including after saving a new Smart Media asset
		// asset.file.linkUri is returned by inserting an existing asset with the embedded asset picker
		// asset.file.url is returned by selection events, which are stringified from Amber's view model instead of actual DTOs
		previewImage =
			bestPreviewFile && bestPreviewFile.link
				? bestPreviewFile.link.uri
				: bestPreviewFile.linkUri
				? bestPreviewFile.linkUri
				: bestPreviewFile.url
				? bestPreviewFile.url
				: null;
	}

	return (
		<Wrapper>
			<ImagePreview onClick={toggleIsOpen} previewImage={previewImage} />
			<FilePicker
				accountId={9863513}
				isOpen={isOpen}
				onFilesSelected={handleFilesSelected}
				onCancel={handleCancel}
				localizedResources={localizedResources}
			>
				<FilePicker.GroupVaultTab />
				<FilePicker.FaithlifeStockTab />
				<FilePicker.UnsplashTab />
			</FilePicker>
		</Wrapper>
	);
};

ReactDOM.render(<App />, document.querySelector('#app'));

function Wrapper({ children }) {
	return (
		<Box
			display="grid"
			top={0}
			left={0}
			right={0}
			minHeight="50vh"
			position="absolute"
			alignItems="center"
			justifyContent="center"
		>
			{children}
		</Box>
	);
}

function ImagePreview({ onClick, previewImage }) {
	return (
		<Box
			onClick={onClick}
			width={480}
			height={270}
			border="2px dashed"
			borderColor="blue4"
			display="grid"
			alignItems="center"
			justifyContent="center"
			color="blue4"
			fontWeight="bold"
			backgroundImage={previewImage ? `url(${previewImage})` : null}
			backgroundPosition="center"
			backgroundSize="cover"
			backgroundRepeat="no-repeat"
		>
			{!previewImage && '+ Add photo'}
		</Box>
	);
}
