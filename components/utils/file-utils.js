import { FileIcon, AudioIcon, VideoFileIcon } from '../icons';

const mediaTypeLabelSelectors = {
	video: mediaTypeLabels => mediaTypeLabels.video,
	audio: mediaTypeLabels => mediaTypeLabels.audio,
	image: mediaTypeLabels => mediaTypeLabels.image,
	text: mediaTypeLabels => mediaTypeLabels.text,
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': mediaTypeLabels =>
		mediaTypeLabels.word,
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': mediaTypeLabels =>
		mediaTypeLabels.powerpoint,
	'application/pdf': mediaTypeLabels => mediaTypeLabels.pdf,
};

const supportedMediaTypesRegex = new RegExp(
	`^${Object.keys(mediaTypeLabelSelectors).join('|')}`,
	'g',
);

const storageUnits = ['B', 'KB', 'MB', 'GB'];

export const convertBytesToFriendlyString = bytes => {
	if (bytes == null || isNaN(bytes) || bytes < 0) {
		return null;
	}
	if (bytes === 0) {
		return '0 B';
	}

	const roundedExponent = Math.min(Math.floor(log1024(bytes)), storageUnits.length - 1);
	const convertedBytes = Math.round(bytes / Math.pow(1024, roundedExponent));

	return `${convertedBytes} ${storageUnits[roundedExponent]}`;
};

export const mapMediaTypeToLabel = (mediaType, mediaTypeLabels) => {
	const [recognizedMediaType] = mediaType.match(supportedMediaTypesRegex) || [];
	const labelSelector = mediaTypeLabelSelectors[recognizedMediaType];

	return (labelSelector && labelSelector(mediaTypeLabels)) || mediaTypeLabels.default;
};

export const mapMediaTypeToIcon = mediaType => {
	const [recognizedMediaType] = mediaType.match(supportedMediaTypesRegex) || [];

	let assetIcon = FileIcon;
	if (recognizedMediaType === 'audio') {
		assetIcon = AudioIcon;
	} else if (recognizedMediaType === 'video') {
		assetIcon = VideoFileIcon;
	}

	return assetIcon;
};

function log1024(x) {
	return Math.log(x) / Math.log(1024);
}
