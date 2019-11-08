import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LegacyButton as Button } from '../button';
import { addSeparator } from '../utils';
import {
	convertBytesToFriendlyString,
	mapMediaTypeToLabel,
	mapMediaTypeToIcon,
} from '../utils/file-utils';
import * as Styled from './styled';

const fileLabelButtonWidthOverride = {
	width: '100%',
	justifyContent: 'left',
};

export class FileItem extends PureComponent {
	static propTypes = {
		file: PropTypes.shape({
			id: PropTypes.string.isRequired,
			mediaType: PropTypes.string,
			name: PropTypes.string,
			byteCount: PropTypes.number,
			isProcessing: PropTypes.bool,
		}).isRequired,
		mediaTypeLabels: PropTypes.shape({
			default: PropTypes.string.isRequired,
			video: PropTypes.string,
			audio: PropTypes.string,
			image: PropTypes.string,
			text: PropTypes.string,
			word: PropTypes.string,
			powerpoint: PropTypes.string,
			pdf: PropTypes.string,
		}).isRequired,
		onFileClicked: PropTypes.func,
		renderFileActions: PropTypes.func,
		renderLoadingSpinner: PropTypes.func,
	};

	handleFileClick = e => {
		e.preventDefault();

		const { file, onFileClicked } = this.props;
		if (onFileClicked) {
			onFileClicked(file);
		}
	};

	render() {
		const {
			file,
			renderFileActions,
			renderLoadingSpinner,
			onFileClicked,
			mediaTypeLabels,
		} = this.props;

		const { name, mediaType, byteCount, isProcessing } = file;
		const mediaTypeLabel = mapMediaTypeToLabel(mediaType, mediaTypeLabels);
		const Icon = mapMediaTypeToIcon(mediaType);

		const fileIcon = (
			<Styled.CenteredIconContainer>
				{isProcessing && renderLoadingSpinner ? renderLoadingSpinner() : <Icon />}
			</Styled.CenteredIconContainer>
		);

		const fileInformation = <Styled.FileLabel>{name}</Styled.FileLabel>;

		return (
			<Styled.FileItem>
				{onFileClicked ? (
					<Button onClick={this.handleFileClick} variant="primaryTransparent">
						{fileIcon}
					</Button>
				) : (
					fileIcon
				)}
				<Styled.FileInformation>
					{onFileClicked ? (
						<Button
							styleOverrides={fileLabelButtonWidthOverride}
							onClick={this.handleFileClick}
							primaryTransparent
						>
							{fileInformation}
						</Button>
					) : (
						fileInformation
					)}
					<Styled.Metadata>
						{addSeparator([
							mediaTypeLabel.toLowerCase().trim() !== (name || '').toLowerCase().trim()
								? mediaTypeLabel
								: null,
							convertBytesToFriendlyString(byteCount),
						])}
					</Styled.Metadata>
				</Styled.FileInformation>
				{renderFileActions ? (
					<Styled.FileActionsContainer>{renderFileActions(file)}</Styled.FileActionsContainer>
				) : null}
			</Styled.FileItem>
		);
	}
}
