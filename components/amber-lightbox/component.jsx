/* eslint-disable react/no-unused-prop-types */
import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import { DropZone } from '../drop-zone';
import { Tab } from './tab';
import { CameraSvg } from './svgs';
import * as Styled from './styled';

// TODO implement filetypes/ check on mime types
// TODO standardize localization
// TODO implement multiple selection feature

export function AmberLightbox({
	tabs,
	// fileTypes,
	onFileSelected,
	// allowMultiSelect,
	localizationProps,
}) {
	const fileInputRef = useRef();

	const handleBrowseFilesClick = useCallback(() => {
		fileInputRef.current.click();
	}, []);

	const handleUploadWithFileInput = useCallback(
		event => {
			event.stopPropagation();
			event.preventDefault();

			const files =
				(event.dataTransfer && event.dataTransfer.files) || (event.target && event.target.files);

			onFileSelected(files[0]);

			// reset the input's value so selecting the same file twice works
			fileInputRef.current.value = '';
		},
		[onFileSelected],
	);

	const addText = localizationProps.addText || 'Add';
	const cancelText = localizationProps.cancelText || 'Cancel';

	return (
		<Styled.Container>
			<Styled.Title>Add File</Styled.Title>
			<Styled.NativeContainer>
				<DropZone
					onDrop={dropEvent => {
						dropEvent.preventDefault();
						dropEvent.stopPropagation();
						console.log(dropEvent.dataTransfer.files[0]);
						onFileSelected(dropEvent.dataTransfer.files[0]);
					}}
				>
					<Styled.DragDropContainer>
						<Styled.SvgContainer>
							<img role="presentation" src={CameraSvg} />
						</Styled.SvgContainer>
						<Styled.DragDropText>Drag and drop to upload image</Styled.DragDropText>
						<Button primaryTransparent onClick={handleBrowseFilesClick}>
							or browse files
						</Button>
						<br />
						<Styled.FileInputLabel>
							<input
								ref={fileInputRef}
								onChange={handleUploadWithFileInput}
								type="file"
								name="file"
							/>
						</Styled.FileInputLabel>
						<Styled.MinSizeLabel>minimum image size: 800 x 400</Styled.MinSizeLabel>
					</Styled.DragDropContainer>
				</DropZone>
			</Styled.NativeContainer>
			<Styled.ButtonSection>
				<Styled.ButtonContainer>
					<Button primary small>
						{addText}
					</Button>
				</Styled.ButtonContainer>
				<Styled.ButtonContainer>
					<Button primaryOutline small>
						{cancelText}
					</Button>
				</Styled.ButtonContainer>
			</Styled.ButtonSection>
			{tabs.length &&
				tabs.map((t, index) => (
					<Tab key={index} title={t.title} vaultId={t.vaultId} onFileSelected={onFileSelected} />
				))}
		</Styled.Container>
	);
}

AmberLightbox.propTypes = {
	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			vaultId: PropTypes.number.isRequired,
			filter: PropTypes.string,
			viewStyle: PropTypes.string,
		}),
	),
	// fileTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
	onFileSelected: PropTypes.func.isRequired,
	allowMultiSelect: PropTypes.bool,
	localizationProps: PropTypes.shape({
		addText: PropTypes.string,
		cancelText: PropTypes.string,
	}),
};

AmberLightbox.defaultProps = {
	localizationProps: {},
};
