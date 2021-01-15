import React from 'react';
import PropTypes from 'prop-types';
import systemPropTypes from '@styled-system/prop-types';
import { WellContainer, WellButton } from './image-well-base';
import { WellPreview } from './image-well-preview';
import { RemoveIcon, CameraIcon, SelectCamera } from './image-well-icons';
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
	const handleIconClick = (event, callback) => {
		event.stopPropagation();
		callback();
	};

	if (previewUrl) {
		const customPreviewContent = React.Children.toArray(children).filter(
			child => child.type === ImageWell.PreviewContent,
		);

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
					{customPreviewContent.length ? (
						customPreviewContent
					) : onRemoveImage ? (
						<RemoveIcon onClick={event => handleIconClick(event, onRemoveImage)} />
					) : (
						<CameraIcon onClick={event => handleIconClick(event, onSelectImage)} />
					)}
				</WellPreview>
			</ImageWellBase>
		);
	}

	const customSelectContent = React.Children.toArray(children).filter(
		child => child.type === ImageWell.SelectContent,
	);

	return (
		<ImageWellBase onClick={onSelectImage} previewUrl={previewUrl} {...props}>
			{customSelectContent.length ? (
				customSelectContent
			) : (
				<>
					<SelectCamera />
					{localizedResources.selectText}
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

ImageWell.SelectContent = ({ children }) => children;
ImageWell.PreviewContent = ({ children }) => children;

ImageWell.propTypes = {
	previewUrl: PropTypes.string,
	fitPreviewToSquare: PropTypes.bool,
	onSelectImage: PropTypes.func.isRequired,
	onRemoveImage: PropTypes.func,
	localizedResources: PropTypes.shape({
		selectText: PropTypes.string,
	}),
	...systemPropTypes.border,
	...systemPropTypes.color,
	...systemPropTypes.typography,
};

ImageWell.defaultProps = {
	localizedResources: {
		selectText: '+ Add Image',
	},
};

export { ImageWell };
