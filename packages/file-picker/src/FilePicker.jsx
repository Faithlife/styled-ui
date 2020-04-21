import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { ExternalEditorModal } from './ExternalEditorModal';
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
	onLoadAssetForEditing,
	onLoadModelForSaving,
	allowMultiSelect,
	ExternalEditorComponent,
}) => {
	const [asset, setAsset] = useState(null);
	const [model, setModel] = useState();
	const [isCreatingNewAsset, setIsCreatingNewAsset] = useState(false);

	const handleFilesSelected = useCallback(
		data => {
			const firstAsset = data.assets[0];
			setAsset(firstAsset);
			if (data.openInExternalEditor) {
				if (!firstAsset) {
					setIsCreatingNewAsset(true);
				}
				setModel(onLoadAssetForEditing(firstAsset));
			} else {
				onFilesSelected({ assets: [firstAsset] });
			}
		},
		[onFilesSelected, onLoadAssetForEditing]
	);

	const handleCancel = useCallback(() => {
		setAsset(null);
		setModel(undefined);
		setIsCreatingNewAsset(false);
		onCancel();
	}, [onCancel, setModel]);

	const { createSmartMediaAsset } = useAmberClient(accountId);
	const handleExternalEditorSave = useCallback(
		async (blob, metadata) => {
			const newAsset = await createSmartMediaAsset(asset, blob, metadata);
			onFilesSelected({ assets: [newAsset] });
			setModel(undefined);
			setIsCreatingNewAsset(false);
		},
		[asset, createSmartMediaAsset, onFilesSelected, setModel]
	);

	const handleExternalEditorDone = useCallback(() => {
		setModel(undefined);
		setIsCreatingNewAsset(false);
		onFilesSelected({ assets: [asset] });
	}, [asset, onFilesSelected, setModel]);

	const handleExternalEditorCancel = useCallback(() => {
		setModel(undefined);
		setIsCreatingNewAsset(false);
	}, [setModel]);

	const context = useMemo(
		() => ({
			accountId,
			onFilesSelected: handleFilesSelected,
			onCancel: handleCancel,
			allowMultiSelect,
			ExternalEditorComponent,
		}),
		[accountId, handleFilesSelected, handleCancel, allowMultiSelect, ExternalEditorComponent]
	);

	return (
		<FilePickerProvider value={context}>
			<FilePickerModal isOpen={isOpen} onClose={handleCancel} title={title}>
				{children}
			</FilePickerModal>
			{ExternalEditorComponent && (
				<ExternalEditorModal
					ExternalEditorComponent={ExternalEditorComponent}
					accountId={accountId}
					isOpen={isOpen && (model || isCreatingNewAsset)}
					isCreatingNewAsset={isCreatingNewAsset}
					model={model}
					onCancel={handleExternalEditorCancel}
					onDone={handleExternalEditorDone}
					onLoadModelForSaving={onLoadModelForSaving}
					onSave={handleExternalEditorSave}
					title={title}
				/>
			)}
		</FilePickerProvider>
	);
};

FilePicker.defaultProps = {
	title: 'File Picker',
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
	/** Called when an asset is chosen for editing in the ExternalEditorComponent. The result of this callback will be passed to the ExternalEditorComponent in the model prop. */
	onLoadAssetForEditing: PropTypes.func,
	/** Called with a ref to the ExternalEditorComponent. Should return an object with {blob, metadata} with binary image data and SmartMedia metadata to be saved on a new Amber asset. */
	onLoadModelForSaving: PropTypes.func,
	/** For external editors such as the Smart Media Editor. */
	ExternalEditorComponent: PropTypes.elementType,
	/** Controls whether the File Picker can select multiple files. */
	allowMultiSelect: PropTypes.bool,
};
