import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { resetStyles } from '../utils';
import { Box } from '../Box';
import { Paragraph } from '../Paragraph';
import { Button } from '../button';
import { DropZone } from '../drop-zone';
import { FileItem } from './file-item';

/** List of files (with icons and drop zone) */
export class FilesSection extends PureComponent {
	static propTypes = {
		/** The files to render. */
		files: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				mediaType: PropTypes.string,
				name: PropTypes.string,
				byteCount: PropTypes.number,
				isProcessing: PropTypes.bool,
			}),
		),
		/** Override the section title. */
		title: PropTypes.string,
		/** Override the drop zone text. */
		dropZoneText: PropTypes.string,
		/** Override the "browse files" button text */
		browseFilesButtonText: PropTypes.string,
		/** Media type labels. */
		mediaTypeLabels: PropTypes.shape({
			default: PropTypes.string.isRequired,
			video: PropTypes.string,
			audio: PropTypes.string,
			image: PropTypes.string,
			text: PropTypes.string,
			word: PropTypes.string,
			powerpoint: PropTypes.string,
			pdf: PropTypes.string,
		}),
		/** An optional override of the title's font size. */
		titleFontSize: PropTypes.string,
		/**
		 * An optional click handler that will be invoked when the user clicks the file name or icon. If not provided, the file name won't be clickable.
		 * Signature: (file: File) => void;
		 */
		onFileClicked: PropTypes.func,
		/**
		 * An event handler that will be invoked when the user uploads files. The drop target will not be rendered if this is not provided.
		 * Signature: (e: React.SyntheticEvent) => void;
		 */
		onUploadFiles: PropTypes.func,
		/**
		 * Render action buttons for a given file. Action elements will be rendered into a flex container.
		 * Signature: (file: File) => JSX.Element | null;
		 */
		renderFileActions: PropTypes.func,
		/**
		 * An optional prop to override the default loading spinner used to indicate a processing file.
		 * Signature: () => JSX.Element | null;
		 */
		renderLoadingSpinner: PropTypes.func,
	};

	static defaultProps = {
		title: 'Files',
		dropZoneText: 'Drag & drop to upload files',
		browseFilesButtonText: 'or browse files',
		mediaTypeLabels: {
			video: 'Video',
			audio: 'Audio',
			image: 'Image',
			text: 'Text',
			word: 'Word',
			powerpoint: 'PowerPoint',
			pdf: 'PDF',
			default: 'Other',
		},
	};

	fileInputRef = React.createRef();

	handleBrowseFilesClick = () => {
		this.fileInputRef.current.click();
	};

	handleUploadWithFileInput = event => {
		const { onUploadFiles } = this.props;
		if (onUploadFiles) {
			onUploadFiles(event);
		}

		// reset the input's value so selecting the same file twice works
		this.fileInputRef.current.value = '';
	};

	render() {
		const {
			title,
			renderFileActions,
			onFileClicked,
			onUploadFiles,
			dropZoneText,
			browseFilesButtonText,
			renderLoadingSpinner,
			mediaTypeLabels,
			titleFontSize,
		} = this.props;
		const files = this.props.files || [];
		const lastFileIndex = files.length - 1;

		return (
			<Container>
				<Paragraph
					textStyle="ui.16"
					fontSize={titleFontSize && titleFontSize}
					lineHeight={titleFontSize && 1}
					marginBottom={3}
				>
					{title}
				</Paragraph>
				<Box borderBottom={1} borderColor="gray14" />
				<Box paddingBottom={3}>
					{files.map((file, index) => (
						<React.Fragment key={`${file.id}-${index}`}>
							<FileItem
								file={file}
								renderFileActions={renderFileActions}
								onFileClicked={onFileClicked}
								renderLoadingSpinner={renderLoadingSpinner}
								mediaTypeLabels={mediaTypeLabels}
							/>
							{index < lastFileIndex && <Box borderBottom={1} borderColor="gray14" />}
						</React.Fragment>
					))}
				</Box>
				{onUploadFiles ? (
					<DropZone onDrop={onUploadFiles}>
						{dropZoneText}
						<Button primaryTransparent onClick={this.handleBrowseFilesClick}>
							{browseFilesButtonText}
						</Button>
						<FileInputLabel>
							<input
								ref={this.fileInputRef}
								onChange={this.handleUploadWithFileInput}
								type="file"
								name="file"
								multiple
							/>
						</FileInputLabel>
					</DropZone>
				) : null}
			</Container>
		);
	}
}

const Container = styled.section`
	${resetStyles};
`;

const FileInputLabel = styled.label`
	input {
		display: none;
	}

	&& {
		margin-bottom: 0;
	}
`;
