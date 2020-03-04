import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { LoadingSpinner } from '../loading-spinner';
import { CloseButtonSvg } from './svgs';
import * as Styled from './styled';
import { useFilePickerContext } from './file-picker-helpers';

export function ImagePreview({ imageSource, onRemoveFile }) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [loadError, setLoadError] = useState(false);

	const onImageLoadError = useFilePickerContext();

	const handleLoad = useCallback(() => {
		setIsLoaded(true);
	}, []);

	const handleError = useCallback(() => {
		console.error('image failed to load');
		setLoadError(true);
		onImageLoadError(imageSource);
	}, [imageSource, onImageLoadError]);

	return loadError ? null : (
		<Styled.BorderBox>
			<Styled.Image src={imageSource} onLoad={handleLoad} onError={handleError} />
			<Styled.CloseButton onClick={onRemoveFile} aria-label="Close">
				<CloseButtonSvg />
			</Styled.CloseButton>

			{!isLoaded && <LoadingSpinner large />}
		</Styled.BorderBox>
	);
}
ImagePreview.propTypes = {
	imageSource: PropTypes.string,
	onRemoveFile: PropTypes.func.isRequired,
};
