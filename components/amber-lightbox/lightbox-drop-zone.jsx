import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import { DropZone } from '../drop-zone';
import { CameraSvg } from './svgs';
import * as Styled from './styled';

export function LightboxDropZone({ addFile, allowMultiSelect, showDetails }) {
	const fileInputRef = useRef();

	const handleUploadWithFileInput = useCallback(event => {
		event.stopPropagation();
		event.preventDefault();

		const files =
			(event.dataTransfer && event.dataTransfer.files) || (event.target && event.target.files);
		addFile(Array.from(files));

		// reset the input's value so selecting the same file twice works
		fileInputRef.current.value = '';
	}, []);

	const handleBrowseFilesClick = useCallback(() => {
		fileInputRef.current.click();
	}, []);

	return (
		<DropZone onDrop={handleUploadWithFileInput}>
			<Styled.DragDropContainer height={showDetails ? '415px' : '156px'}>
				{showDetails && (
					<Styled.SvgContainer>
						<img role="presentation" src={CameraSvg} />
					</Styled.SvgContainer>
				)}
				<Styled.DragDropText>Drag and drop to upload image</Styled.DragDropText>
				<Button primaryTransparent onClick={handleBrowseFilesClick}>
					or browse files
				</Button>
				<br />
				<Styled.FileInputLabel>
					<input
						ref={fileInputRef}
						onChange={handleUploadWithFileInput}
						multiple={allowMultiSelect ? 'multiple' : ''}
						type="file"
						name="file"
					/>
				</Styled.FileInputLabel>
				{showDetails && <Styled.MinSizeLabel>minimum image size: 800 x 400</Styled.MinSizeLabel>}
			</Styled.DragDropContainer>
		</DropZone>
	);
}
LightboxDropZone.propTypes = {
	addFile: PropTypes.func.isRequired,
	allowMultiSelect: PropTypes.bool,
	showDetails: PropTypes.bool,
};
