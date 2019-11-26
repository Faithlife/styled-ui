import React, { useCallback, useEffect, useState } from 'react';
import {
	FilePicker as FilePickerProvider,
	TabManager,
	Tab,
	TabList,
	TabPanels,
	TabPanel,
} from '@faithlife/styled-ui';
import { Modal } from '@faithlife/styled-ui/v6';
import { loadSmartMediaModelForAmberSmartMediaFamily } from '@faithlife/smart-media-editor';
import { SmartMediaEditorModal } from './SmartMediaEditorModal';

export const FilePicker = ({ children, title, isOpen, onClose, onFilesSelected, onCancel }) => {
	const [asset, setAsset] = useState(null);
	const [model, setModel] = useState(null);

	const handleFilesSelected = useCallback(
		selectedAssets => {
			const firstAsset = selectedAssets.assets[0];
			if (getSmartMediaMetadata(firstAsset)) {
				setAsset(firstAsset);
			} else {
				onFilesSelected(selectedAssets);
			}
		},
		[onFilesSelected]
	);

	const handleSmartMediaSaved = useCallback(
		url => {
			onFilesSelected({ assets: [{ file: { url } }] });
		},
		[onFilesSelected]
	);

	const handleCancel = useCallback(() => {
		setAsset(null);
		setModel(null);
		onCancel();
	}, [onCancel]);

	const handleCancelEdit = useCallback(() => {
		setModel(null);
	}, []);

	useEffect(() => {
		const selectedFileBackground = asset && asset.file && asset.file.url;
		const smartMediaMetadata = getSmartMediaMetadata(asset);

		if (!asset || !selectedFileBackground || !smartMediaMetadata) {
			return;
		}

		async function getModel() {
			const model = await loadSmartMediaModelForAmberSmartMediaFamily(
				smartMediaMetadata.data,
				asset.file,
				selectedFileBackground
			);
			setModel(model);
		}
		getModel();
	}, [asset]);

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} container="body" fullscreen>
				<Modal.Header title={title} textStyle="h.24" />
				<Modal.Content>
					<FilePickerProvider onFilesSelected={handleFilesSelected} onCancel={handleCancel}>
						<TabManager>
							<TabList>
								{React.Children.map(children, tab => (
									<Tab paddingX={4}>{tab.props.title}</Tab>
								))}
							</TabList>
							<TabPanels display="grid">
								{React.Children.map(children, tab => (
									<TabPanel display="grid" padding={tab.props.padding || 0}>
										{React.cloneElement(tab, { title: null, padding: null })}
									</TabPanel>
								))}
							</TabPanels>
						</TabManager>
					</FilePickerProvider>
				</Modal.Content>
			</Modal>
			<SmartMediaEditorModal
				isOpen={isOpen && !!model}
				model={model}
				onCancel={handleCancelEdit}
				onSaved={handleSmartMediaSaved}
				title={title}
			/>
		</>
	);
};

function getSmartMediaMetadata(asset) {
	return asset && asset.families && asset.families.find(x => x.name === 'smartMedia');
}
