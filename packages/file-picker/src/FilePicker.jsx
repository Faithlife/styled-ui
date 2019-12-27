import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { SmartMediaEditorModal } from './SmartMediaEditorModal';
import { FilePickerModal } from './FilePickerModal';
import { FilePickerProvider } from './FilePickerContext';
import { defaultLocalizedResources } from './defaultLocalizedResources';
import { useAmberClient } from './useAmberClient';
import { useSmartMediaModel } from './useSmartMediaModel';

export const FilePicker = ({
	children,
	accountId,
	title,
	isOpen,
	onFilesSelected,
	onCancel,
	allowMultiSelect,
	localizedResources,
}) => {
	const [asset, setAsset] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const { model, dimensions, setModel } = useSmartMediaModel(asset, isEditing);

	const handleFilesSelected = useCallback(
		data => {
			const firstAsset = data.assets[0];
			setAsset(firstAsset);
			if (data.openInExternalEditor) {
				setIsEditing(true);
			} else {
				onFilesSelected({ assets: [firstAsset] });
			}
		},
		[onFilesSelected]
	);

	const handleCancel = useCallback(() => {
		setAsset(null);
		setModel(null);
		setIsEditing(false);
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
		setIsEditing(false);
		onFilesSelected({ assets: [asset] });
	}, [asset, onFilesSelected, setModel]);

	const handleSmartMediaCancel = useCallback(() => {
		setModel(null);
		setIsEditing(false);
	}, [setModel]);

	const context = useMemo(
		() => ({
			accountId,
			onFilesSelected: handleFilesSelected,
			onCancel: handleCancel,
			allowMultiSelect,
			localizedResources: { ...defaultLocalizedResources, ...localizedResources },
		}),
		[accountId, handleFilesSelected, handleCancel, allowMultiSelect, localizedResources]
	);

	return (
		<FilePickerProvider value={context}>
			<FilePickerModal isOpen={isOpen} onClose={handleCancel} title={title}>
				{children}
			</FilePickerModal>
			<SmartMediaEditorModal
				isOpen={isOpen && !!model}
				model={model}
				dimensions={dimensions}
				onCancel={handleSmartMediaCancel}
				onDone={handleSmartMediaDone}
				onSave={handleSmartMediaSave}
				title={title}
			/>
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
	/** Controls whether the File Picker can select multiple files. */
	allowMultiSelect: PropTypes.bool,
	/** Localized text for the File Picker and for the Smart Media Editor. */
	localizedResources: PropTypes.shape({
		uploadTab: {
			addText: PropTypes.string,
			cancelText: PropTypes.string,
			recommendedMinSize: PropTypes.string,
			uploadFile: PropTypes.string,
			uploadFiles: PropTypes.string,
			dragDropText: PropTypes.string,
			browseText: PropTypes.string,
		},
	}),
};
