import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@faithlife/styled-ui';
import { FilePicker } from '@faithlife/file-picker';
import formatUri from '@faithlife/format-uri';
import {
	loadSmartMediaModelForAmberSmartMediaFamily,
	SmartMediaEditor,
	smartMediaToolbarFeatures,
	fetchFontFamilies,
	SmartMediaEditorProvider,
	toAmberSmartMediaFamily,
	useFabric,
} from '@faithlife/smart-media-editor';
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
				onLoadAssetForEditing={handleLoadSmartMediaModel}
				onLoadModelForSaving={handleLoadModelForSaving}
				ExternalEditorComponent={SmartMediaEditorComponent}
				onCancel={handleCancel}
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

function handleLoadSmartMediaModel(asset) {
	const selectedFileBackground = asset && asset.file && asset.file.linkUri;
	const smartMediaMetadata = getOrInitSmartMediaMetadata(asset);

	if (!asset || !selectedFileBackground || !smartMediaMetadata) {
		return undefined;
	}

	const model = loadSmartMediaModelForAmberSmartMediaFamily(
		smartMediaMetadata.data,
		asset.file,
		selectedFileBackground,
		'anonymous'
	);

	return model;
}

function getOrInitSmartMediaMetadata(asset) {
	return (
		(asset && asset.families && asset.families.find(x => x.name === 'smartMedia')) || {
			data: { styles: [{ version: 1, data: { textFields: [] } }] },
		}
	);
}

const SmartMediaEditorComponent = React.forwardRef(function SmartMediaEditorComponent(
	{ model, onChange },
	ref
) {
	const fabric = useFabric();
	const undesiredFeatures = ['assetPicker', 'background', 'bold', 'italic'];
	const toolbarFeatures = smartMediaToolbarFeatures.filter(
		feature => !undesiredFeatures.includes(feature)
	);

	return (
		<SmartMediaEditorProvider
			fetchFontFamilies={fetchFontFamilies}
			localizedResources={localizedResources}
		>
			<SmartMediaEditor
				ref={ref}
				fabric={fabric}
				model={model}
				onChange={onChange}
				toolbarFeatures={toolbarFeatures}
				getForegroundItems={getForegroundImages}
				getElements={getElements}
				preferArtboard
			/>
		</SmartMediaEditorProvider>
	);
});

async function getElements(searchText, options) {
	const query = searchText
		? `${searchText} tags.text:"smartMediaElement"`
		: 'tags.text:"smartMediaElement"';

	return await getAmberResults(query, options, ({ asset }) => {
		const { value: metadataValue } =
			(asset &&
				asset.metadata &&
				asset.metadata &&
				asset.metadata.other &&
				asset.metadata.other.find(x => x.name === 'smartMediaElement')) ||
			{};

		try {
			return metadataValue && JSON.parse(metadataValue);
		} catch (e) {
			if (e instanceof SyntaxError) {
				// ignore malformed metadata from Amber
				return;
			}

			throw e;
		}
	});
}

async function getForegroundImages(searchText, options) {
	const query = searchText ? `${searchText} kind:=image` : 'kind:=image';

	return await getAmberResults(query, options);
}

async function getAmberResults(
	query,
	{ offset, limit = 50, ...options } = {},
	getHitExtraData = () => null
) {
	const formattedUri = formatUri('/proxy/files/v1/assets/search', {
		bucket: 'LogosInternal',
		q: query,
		offset,
		limit,
		sort: 'uploaded:desc',
		explain: true,
	});

	const firstResponse = await fetch(formattedUri, options);

	const response = await firstResponse.json();

	return {
		hitTotal: response.hitTotal,
		hits: response.hits
			.map(hit => {
				const amberFileURL = hit.asset.file && hit.asset.file.link && hit.asset.file.link.uri;
				const proxiedAmberFileUrl = proxyUrl(amberFileURL);

				return {
					preview: getPreviewInfo(hit),
					url: proxiedAmberFileUrl,
					id: hit.asset.id,
					...getHitExtraData(hit),
				};
			})
			.filter(x => x.url),
	};
}

function getPreviewInfo(hit) {
	const amberPreviewFormat =
		hit.asset.formats &&
		(hit.asset.formats.find(x => x.name === 'Amber Preview 256') || hit.asset.formats[0]);

	const previewFile = amberPreviewFormat && amberPreviewFormat.file;

	const preview = { url: null, width: null, height: null };

	if (previewFile) {
		const linkUri = previewFile.link && previewFile.link.uri;
		if (linkUri) {
			preview.url = proxyUrl(linkUri);
		}

		({ width: preview.width, height: preview.height } = previewFile.metadata.image);
	}

	return preview;
}

function proxyUrl(originalUrl) {
	if (originalUrl) {
		const url = new URL(originalUrl);
		return `/proxy/files${url.pathname}${url.search}`;
	}

	return null;
}

async function handleLoadModelForSaving(editorRef, model) {
	const blob = await editorRef.current.getImageData();
	const metadata = {
		styles: [toAmberSmartMediaFamily(model)],
	};
	return { blob, metadata };
}
