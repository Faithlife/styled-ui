import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import { ImagePreview } from './image-preview';
import * as Styled from './styled';
import { LightboxDropZone } from './lightbox-drop-zone';

export function UploadPage({ allowMultiSelect, onFilesSelected, localizedResources, onCancel }) {
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
			<React.Fragment>
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
			</React.Fragment>
		);
	}
	return (
		<React.Fragment>
			<div>
				<LightboxDropZone
					addFile={addFile}
					allowMultiSelect={allowMultiSelect}
					showDetails
					localizedResources={localizedResources}
				/>
			</div>
			<ButtonSection
				selectedFiles={selectedFiles}
				onFilesSelected={onFilesSelected}
				localizedResources={localizedResources}
				onCancel={onCancel}
			/>
		</React.Fragment>
	);
}
UploadPage.propTypes = {
	allowMultiSelect: PropTypes.bool,
	onFilesSelected: PropTypes.func.isRequired,
	localizedResources: PropTypes.shape({
		addText: PropTypes.string,
		cancelText: PropTypes.string,
		reccomendedMinSize: PropTypes.string,
	}),
	onCancel: PropTypes.func.isRequired,
};

function ButtonSection({ selectedFiles, onFilesSelected, localizedResources, onCancel }) {
	const onSelect = useCallback(() => {
		onFilesSelected(selectedFiles);
	}, [onFilesSelected, selectedFiles]);

	return (
		<Styled.ButtonSection>
			<Styled.ButtonContainer>
				<Button
					primary
					small
					disabled={!selectedFiles.length}
					onClick={onSelect}
					styleOverrides={{ width: '76px', fontSize: '14px' }}
				>
					{localizedResources.addText}
				</Button>
			</Styled.ButtonContainer>
			<Styled.ButtonContainer>
				<Button
					primaryOutline
					small
					onClick={onCancel}
					styleOverrides={{ width: '76px', fontSize: '14px' }}
				>
					{localizedResources.cancelText}
				</Button>
			</Styled.ButtonContainer>
		</Styled.ButtonSection>
	);
}
ButtonSection.propTypes = {
	selectedFiles: PropTypes.object,
	onFilesSelected: PropTypes.func,
	localizedResources: PropTypes.shape({
		addText: PropTypes.string,
		cancelText: PropTypes.string,
		reccomendedMinSize: PropTypes.string,
	}),
	onCancel: PropTypes.func.isRequired,
};
