import React from 'react';
import PropTypes from 'prop-types';
import { X } from '../icons/12px';
import { Camera } from '../icons/18px';
import * as Styled from './styled';

const ImageWell = ({
	children,
	previewUrl,
	fitPreviewToSquare,
	onSelectImage,
	onRemoveImage,
	localizedResources,
}) => {
	if (previewUrl) {
		return (
			<ImageWellBase previewUrl={previewUrl}>
				<Styled.WellPreview
					style={{
						backgroundImage: `url(${previewUrl})`,
						backgroundSize: fitPreviewToSquare ? 'cover' : 'contain',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
					}}
				>
					<Styled.RemoveIconContainer onClick={() => onRemoveImage?.()}>
						<X className="image-well_remove-icon" />
					</Styled.RemoveIconContainer>
				</Styled.WellPreview>
			</ImageWellBase>
		);
	}

	return (
		<ImageWellBase onClick={onSelectImage} previewUrl={previewUrl}>
			{children ? (
				children
			) : (
				<>
					<Camera className="image-well_select-icon" />
					{localizedResources.addText}
				</>
			)}
		</ImageWellBase>
	);
};

const ImageWellBase = props => (
	<Styled.WellContainer>
		<Styled.WellButton {...props} />
	</Styled.WellContainer>
);

ImageWell.propTypes = {
	previewUrl: PropTypes.string,
	fitPreviewToSquare: PropTypes.bool,
	onSelectImage: PropTypes.function,
	onRemoveImage: PropTypes.function,
	localizedResources: PropTypes.shape({
		addText: PropTypes.string,
	}),
};

ImageWell.defaultProps = {
	localizedResources: {
		addText: '+ Add Image',
	},
};

export { ImageWell };
