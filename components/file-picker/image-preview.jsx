import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { LoadingSpinner } from '../loading-spinner';
import { CloseButtonSvg } from './svgs';
import * as Styled from './styled';

export function ImagePreview({ imageSource, onRemoveFile }) {
	const [isLoaded, setIsLoaded] = useState(false);

	const handleLoad = useCallback(() => {
		setIsLoaded(true);
	}, []);

	return (
		<Styled.BorderBox>
			<Styled.Image src={imageSource} onLoad={handleLoad} />
			<Styled.CloseButton onClick={onRemoveFile}>
				<img alt={'close button'} src={CloseButtonSvg} />
			</Styled.CloseButton>

			{!isLoaded && <LoadingSpinner large />}
		</Styled.BorderBox>
	);
}
ImagePreview.propTypes = {
	imageSource: PropTypes.string,
	onRemoveFile: PropTypes.func.isRequired,
};
