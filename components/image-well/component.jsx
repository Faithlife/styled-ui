import React from 'react';
import PropTypes from 'prop-types';
import systemPropTypes from '@styled-system/prop-types';
import { WellContainer, WellButton } from './image-well-base';
import { WellPreview } from './image-well-preview';
import {
	RemoveIconContainer,
	CameraIconContainer,
	Camera,
	EditCamera,
	X,
} from './image-well-icons';
import { DefaultThemeProvider } from '../DefaultThemeProvider';

const ImageWell = ({
	children,
	previewUrl,
	fitPreviewToSquare,
	onSelectImage,
	onRemoveImage,
	localizedResources,
	...props
}) => {
	const handleIconClick = (e, cb) => {
		e.stopPropagation();
		cb();
	};

	if (previewUrl) {
		return (
			<ImageWellBase onClick={onSelectImage} previewUrl={previewUrl} {...props}>
				<WellPreview
					style={{
						backgroundImage: `url(${previewUrl})`,
						backgroundSize: fitPreviewToSquare ? 'cover' : 'contain',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
					}}
				>
					{onRemoveImage ? (
						<RemoveIconContainer onClick={e => handleIconClick(e, onRemoveImage)}>
							<X />
						</RemoveIconContainer>
					) : (
						<CameraIconContainer onClick={e => handleIconClick(e, onSelectImage)}>
							<EditCamera />
						</CameraIconContainer>
					)}
				</WellPreview>
			</ImageWellBase>
		);
	}

	return (
		<ImageWellBase onClick={onSelectImage} previewUrl={previewUrl} {...props}>
			{children ? (
				children
			) : (
				<>
					<Camera />
					{localizedResources.addText}
				</>
			)}
		</ImageWellBase>
	);
};

const ImageWellBase = props => (
	<DefaultThemeProvider>
		<WellContainer>
			<WellButton {...props} />
		</WellContainer>
	</DefaultThemeProvider>
);

ImageWell.propTypes = {
	previewUrl: PropTypes.string,
	fitPreviewToSquare: PropTypes.bool,
	onSelectImage: PropTypes.function,
	onRemoveImage: PropTypes.function,
	localizedResources: PropTypes.shape({
		addText: PropTypes.string,
	}),
	...systemPropTypes.border,
	...systemPropTypes.color,
	...systemPropTypes.typography,
};

ImageWell.defaultProps = {
	localizedResources: {
		addText: '+ Add Image',
	},
};

export { ImageWell };
