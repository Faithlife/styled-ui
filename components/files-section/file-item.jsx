import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { system } from 'styled-system';
import { Box } from '../Box';
import { Text } from '../Text';
import { Paragraph } from '../Paragraph';
import { Button } from '../button';
import { addSeparator } from '../utils';
import {
	convertBytesToFriendlyString,
	mapMediaTypeToLabel,
	mapMediaTypeToIcon,
} from '../utils/file-utils';

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
			<Box alignSelf="center" minWidth="24px">
				{isProcessing && renderLoadingSpinner ? renderLoadingSpinner() : <Icon />}
			</Box>
		);

		const fileInformation = (
			<Text
				textStyle="ui.14"
				paddingY="6px"
				overflow="hidden"
				css={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
			>
				{name}
			</Text>
		);

		return (
			<FileItemBox display="flex" padding={3}>
				{onFileClicked ? (
					<Button onClick={this.handleFileClick} primaryTransparent>
						{fileIcon}
					</Button>
				) : (
					fileIcon
				)}
				<Box paddingLeft={4} flexShrink="1" css={{ overflow: 'hidden' }}>
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
					<Paragraph
						textStyle="c.13"
						color="gray34"
						paddingBottom={2}
						overflow="hidden"
						css={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
					>
						{addSeparator([
							mediaTypeLabel.toLowerCase().trim() !== (name || '').toLowerCase().trim()
								? mediaTypeLabel
								: null,
							convertBytesToFriendlyString(byteCount),
						])}
					</Paragraph>
				</Box>
				{renderFileActions ? (
					<Box display="flex" alignItems="flex-start" marginLeft="auto">
						{renderFileActions(file)}
					</Box>
				) : null}
			</FileItemBox>
		);
	}
}

const FileItemBox = styled(Box)`
	* {
		${system({ childFlexShrink: { property: 'flex-shrink' } })};
	}
`;
