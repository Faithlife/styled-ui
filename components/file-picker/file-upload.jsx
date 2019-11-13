import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { LegacyButton as Button } from '../button';
import { ImagePreview } from './image-preview';
import * as Styled from './styled';
import { LightboxDropZone } from './lightbox-drop-zone';
import { useFilePickerContext } from './file-picker-helpers';

export function FileUpload() {
	const {
		allowMultiSelect,
		onFilesSelected,
		localizedResources,
		onCancel,
	} = useFilePickerContext();

	const [selectedFiles, setSelectedFiles] = useState([]);

	const handleRemoveFile = useCallback(
		index => () => {
			setSelectedFiles(currentSelectedFiles => currentSelectedFiles.filter((_, i) => i !== index));
		},
		[],
	);

	const addFile = useCallback(files => {
		setSelectedFiles(currentSelectedFiles => [
			...currentSelectedFiles,
			...files.map(file => ({ file, dataUrl: URL.createObjectURL(file) })),
		]);
	}, []);

	if (selectedFiles.length) {
		return (
			<Box display="grid" gridTemplateRows="auto min-content" gridGap={6}>
				{allowMultiSelect ? (
					<Styled.MultiSelectContainer>
						<Styled.ImageBox>
							<LightboxDropZone
								addFile={addFile}
								allowMultiSelect={allowMultiSelect}
								localizedResources={localizedResources}
							/>
						</Styled.ImageBox>
						{selectedFiles.map((file, index) => (
							<Styled.ImageBox key={file.dataUrl}>
								<ImagePreview imageSource={file.dataUrl} onRemoveFile={handleRemoveFile(index)} />
							</Styled.ImageBox>
						))}
					</Styled.MultiSelectContainer>
				) : (
					<Styled.SingleSelectContainer>
						<ImagePreview
							imageSource={selectedFiles[0].dataUrl}
							onRemoveFile={handleRemoveFile(0)}
						/>
					</Styled.SingleSelectContainer>
				)}
				<ButtonSection
					selectedFiles={selectedFiles}
					onFilesSelected={onFilesSelected}
					localizedResources={localizedResources}
					onCancel={onCancel}
				/>
			</Box>
		);
	}
	return (
		<Box display="grid" gridTemplateRows="auto min-content" gridGap={6}>
			<LightboxDropZone
				addFile={addFile}
				allowMultiSelect={allowMultiSelect}
				showDetails
				localizedResources={localizedResources}
			/>
			<ButtonSection
				selectedFiles={selectedFiles}
				onFilesSelected={onFilesSelected}
				localizedResources={localizedResources}
				onCancel={onCancel}
			/>
		</Box>
	);
}

function ButtonSection({ selectedFiles }) {
	const { onFilesSelected, localizedResources, onCancel } = useFilePickerContext();

	const onSelect = useCallback(() => {
		onFilesSelected({
			files: selectedFiles,
			kind: 'files',
		});
	}, [onFilesSelected, selectedFiles]);

	return (
		<Box
			display="grid"
			gridAutoFlow="column"
			gridAutoColumns="min-content"
			justifyContent="end"
			gridGap="5"
		>
			<Button
				primaryOutline
				small
				onClick={onCancel}
				styleOverrides={{ width: '76px', fontSize: '14px' }}
			>
				{localizedResources.cancelText}
			</Button>
			<Button
				primary
				small
				disabled={!selectedFiles.length}
				onClick={onSelect}
				styleOverrides={{ width: '76px', fontSize: '14px' }}
			>
				{localizedResources.addText}
			</Button>
		</Box>
	);
}
ButtonSection.propTypes = {
	selectedFiles: PropTypes.array,
};
