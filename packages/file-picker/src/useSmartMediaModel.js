import { useEffect, useState } from 'react';
import { loadSmartMediaModelForAmberSmartMediaFamily } from '@faithlife/smart-media-editor';

export const useSmartMediaModel = (asset, isEditing) => {
	const [model, setModel] = useState(null);
	const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

	useEffect(() => {
		if (!isEditing) {
			return;
		}

		const selectedFileBackground = asset && asset.file && asset.file.linkUri;
		const smartMediaMetadata = getOrInitSmartMediaMetadata(asset);

		if (!asset || !selectedFileBackground || !smartMediaMetadata) {
			return;
		}

		async function getModel() {
			const model = await loadSmartMediaModelForAmberSmartMediaFamily(
				smartMediaMetadata.data,
				asset.file,
				selectedFileBackground,
				'anonymous'
			);
			setDimensions(getDimensions(asset));
			setModel(model);
		}
		getModel();
	}, [asset, isEditing]);

	return {
		model,
		dimensions,
		setModel,
	};
};

function getOrInitSmartMediaMetadata(asset) {
	return (
		(asset && asset.families && asset.families.find(x => x.name === 'smartMedia')) || {
			data: { styles: [{ version: 1, data: { textFields: [] } }] },
		}
	);
}

function getDimensions(asset) {
	const metadata = getOrInitSmartMediaMetadata(asset);
	const metadataDimensions = getDimensionsFromSmartMediaMetadata(metadata);
	if (metadataDimensions) {
		return metadataDimensions;
	}

	const sourceDimensions = getDimensionsFromAssetFile(asset.source);
	if (sourceDimensions) {
		return sourceDimensions;
	}

	const fileDimensions = getDimensionsFromAssetFile(asset.file);
	if (fileDimensions) {
		return fileDimensions;
	}

	return { width: 1920, height: 1080 };
}

function getDimensionsFromAssetFile(assetFile) {
	const image = assetFile?.metadata?.image;

	if (!image || !image.width || !image.height) {
		return null;
	}

	return { width: image.width, height: image.height };
}

function getDimensionsFromSmartMediaMetadata(metadata) {
	if (metadata) {
		const backgroundImage = metadata?.data?.styles[0]?.model?.data?.backgroundImage ?? {};
		if (backgroundImage.width && backgroundImage.height) {
			return { width: backgroundImage.width, height: backgroundImage.height };
		}
	}

	return null;
}
