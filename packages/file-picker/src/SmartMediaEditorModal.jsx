import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	SmartMediaEditor,
	smartMediaToolbarFeatures,
	fetchFontFamilies,
	SmartMediaEditorProvider,
	toAmberSmartMediaFamily,
	useFabric,
} from '@faithlife/smart-media-editor';
import { Box, LoadingSpinner } from '@faithlife/styled-ui';
import { Button, Modal } from '@faithlife/styled-ui/v6';
import formatUri from '@faithlife/format-uri';
import { useFilePickerContext } from './FilePickerContext';

const undesiredFeatures = ['assetPicker', 'background', 'bold', 'italic'];

export const SmartMediaEditorModal = ({
	isOpen,
	title,
	model: modelProp,
	onCancel,
	onDone,
	onSave,
}) => {
	const editorRef = useRef();
	const fabric = useFabric();
	const [model, setModel] = useState(modelProp);
	const [isModified, setIsModified] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const { localizedResources } = useFilePickerContext();

	useEffect(() => {
		setIsModified(false);
		setModel(modelProp);
	}, [modelProp]);

	const handleChange = useCallback(
		model => {
			if (!isModified) {
				setIsModified(true);
			}
			setModel(model);
		},
		[isModified]
	);

	const handleSave = useCallback(async () => {
		if (!editorRef.current) {
			return;
		}
		setIsSaving(true);
		const blob = await editorRef.current.getImageData();
		const metadata = {
			styles: [toAmberSmartMediaFamily(model)],
		};
		onSave(blob, metadata)
			.then(() => {
				setIsSaving(false);
			})
			.catch(error => {
				// TODO: add error handling/messaging
				console.error(error);
				setIsSaving(false);
			});
	}, [onSave, model]);

	const toolbarFeatures = smartMediaToolbarFeatures.filter(
		feature => !undesiredFeatures.includes(feature)
	);

	return (
		<Modal isOpen={isOpen} onClose={onCancel} container="body" fullscreen>
			<Modal.Header
				textStyle="h.24"
				paddingBottom={5}
				title={title}
				actions={
					<Box
						display="grid"
						alignItems="center"
						gridAutoFlow="column"
						gridAutoColumns="min-content"
						gridGap={[3, 5]}
					>
						{isSaving && <LoadingSpinner small />}
						<Button variant="secondary" size={['medium', 'small']} minWidth={78} onClick={onCancel}>
							{'Cancel'}
						</Button>
						{isModified ? (
							<Button
								variant="primary"
								size={['medium', 'small']}
								minWidth={78}
								onClick={handleSave}
								disabled={isSaving}
							>
								{'Save'}
							</Button>
						) : (
							<Button variant="primary" size={['medium', 'small']} minWidth={78} onClick={onDone}>
								{'Done'}
							</Button>
						)}
					</Box>
				}
			/>
			<Modal.Content padding={0} borderTop={`1px solid`} borderColor="gray8">
				<SmartMediaEditorProvider
					fetchFontFamilies={fetchFontFamilies}
					localizedResources={localizedResources}
				>
					<SmartMediaEditor
						ref={editorRef}
						fabric={model && fabric}
						model={model}
						onChange={handleChange}
						toolbarFeatures={toolbarFeatures}
						getForegroundItems={getForegroundImages}
						getElements={getElements}
						preferArtboard
					/>
				</SmartMediaEditorProvider>
			</Modal.Content>
		</Modal>
	);
};

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
