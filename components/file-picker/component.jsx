import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FilePickerContextProvider } from './file-picker-helpers';
import * as Styled from './styled';

const defaultLocalizedResources = {
	recommendedMinSize: 'recommended minimum image size: 800 x 400',
	uploadFile: 'Upload File',
	uploadFiles: 'Upload Files',
	addText: 'Insert',
	cancelText: 'Cancel',
	dragDropText: 'Drag and drop to upload image',
	browseText: 'or browse files',
};

export function FilePicker({
	onFilesSelected,
	allowMultiSelect,
	onCancel,
	localizedResources,
	children,
}) {
	const context = useMemo(
		() => ({
			onFilesSelected,
			allowMultiSelect,
			onCancel,
			localizedResources: { ...defaultLocalizedResources, ...localizedResources },
		}),
		[onFilesSelected, allowMultiSelect, onCancel, localizedResources],
	);

	return (
		<FilePickerContextProvider value={context}>
			<Styled.Container>{children}</Styled.Container>
		</FilePickerContextProvider>
	);
}

FilePicker.propTypes = {
	/** This function handles your files once selected */
	onFilesSelected: PropTypes.func.isRequired,
	/** Is selecting multiple files allowed */
	allowMultiSelect: PropTypes.bool,
	/** Customized text */
	localizedResources: PropTypes.shape({
		addText: PropTypes.string,
		cancelText: PropTypes.string,
		recommendedMinSize: PropTypes.string,
		uploadFile: PropTypes.string,
		uploadFiles: PropTypes.string,
		dragDropText: PropTypes.string,
		browseText: PropTypes.string,
	}),
	/** This function handles exiting the file picker */
	onCancel: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};
