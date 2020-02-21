import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { loadSmartMediaModelForAmberSmartMediaFamily } from '@faithlife/smart-media-editor';
import { SmartMediaEditorModal } from './SmartMediaEditorModal';
import { FilePickerModal } from './FilePickerModal';
import { FilePickerProvider } from './FilePickerContext';
import { useAmberClient } from './useAmberClient';

export const FilePicker = ({
	children,
	accountId,
	title,
	isOpen,
	onFilesSelected,
	onCancel,
	allowMultiSelect,
	disableEditor,
	localizedResources,
}) => {
	const [asset, setAsset] = useState(null);
	const [model, setModel] = useState();

	const handleFilesSelected = useCallback(
		data => {
			const firstAsset = data.assets[0];
			setAsset(firstAsset);
			if (data.openInExternalEditor) {
				setModel(loadSmartMediaModel(firstAsset));
			} else {
				onFilesSelected({ assets: [firstAsset] });
			}
		},
		[onFilesSelected]
	);

	const handleCancel = useCallback(() => {
		setAsset(null);
		setModel(null);
		onCancel();
	}, [onCancel, setModel]);

	const { createSmartMediaAsset } = useAmberClient(accountId);
	const handleSmartMediaSave = useCallback(
		async (blob, metadata) => {
			const newAsset = await createSmartMediaAsset(asset, blob, metadata);
			onFilesSelected({ assets: [newAsset] });
			setModel(null);
		},
		[asset, createSmartMediaAsset, onFilesSelected, setModel]
	);

	const handleSmartMediaDone = useCallback(() => {
		setModel(null);
		onFilesSelected({ assets: [asset] });
	}, [asset, onFilesSelected, setModel]);

	const handleSmartMediaCancel = useCallback(() => {
		setModel(null);
	}, [setModel]);

	const context = useMemo(
		() => ({
			accountId,
			onFilesSelected: handleFilesSelected,
			onCancel: handleCancel,
			allowMultiSelect,
			disableEditor,
			localizedResources,
		}),
		[
			accountId,
			handleFilesSelected,
			handleCancel,
			allowMultiSelect,
			disableEditor,
			localizedResources,
		]
	);

	return (
		<FilePickerProvider value={context}>
			<FilePickerModal isOpen={isOpen} onClose={handleCancel} title={title}>
				{children}
			</FilePickerModal>
			{!disableEditor && (
				<SmartMediaEditorModal
					isOpen={isOpen && !!model}
					model={model}
					onCancel={handleSmartMediaCancel}
					onDone={handleSmartMediaDone}
					onSave={handleSmartMediaSave}
					title={title}
				/>
			)}
		</FilePickerProvider>
	);
};

FilePicker.defaultProps = {
	title: 'File Picker',
	disableEditor: false,
};

FilePicker.propTypes = {
	/** The FilePicker expects that its children are iterable, and that they have `title` props to be displayed in the Tab List. */
	children: PropTypes.node.isRequired,
	/** The group or user ID associated with the vault to use for saving assets edited by the Smart Media Editor. */
	accountId: PropTypes.number.isRequired,
	/** Title for the modal. Defaults to 'File Picker'. */
	title: PropTypes.string,
	/** Controls whether the File Picker is open. */
	isOpen: PropTypes.bool.isRequired,
	/** Called when a file or files are selected, should close the File Picker. */
	onFilesSelected: PropTypes.func.isRequired,
	/** Should close the File Picker. */
	onCancel: PropTypes.func.isRequired,
	/** Controls whether the File Picker can select multiple files. */
	allowMultiSelect: PropTypes.bool,
	/** Disables the Smart Media Editor. Defaults to false. */
	disableEditor: PropTypes.bool,
	/** Localized text for the Smart Media Editor. */
	localizedResources: PropTypes.object,
};

const loadSmartMediaModel = asset => {
	const selectedFileBackground = asset && asset.file && asset.file.linkUri;
	const smartMediaMetadata = getOrInitSmartMediaMetadata(asset);

	if (!asset || !selectedFileBackground || !smartMediaMetadata) {
		return;
	}

	const model = loadSmartMediaModelForAmberSmartMediaFamily(
		smartMediaMetadata.data,
		asset.file,
		selectedFileBackground,
		'anonymous'
	);

	return model;
};

function getOrInitSmartMediaMetadata(asset) {
	return (
		(asset && asset.families && asset.families.find(x => x.name === 'smartMedia')) || {
			data: { styles: [{ version: 1, data: { textFields: [] } }] },
		}
	);
}
