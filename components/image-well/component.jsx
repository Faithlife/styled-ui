import React from 'react';
import PropTypes from 'prop-types';
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
					{onRemoveImage && (
						<Styled.RemoveIconContainer onClick={onRemoveImage}>
							<Styled.X />
						</Styled.RemoveIconContainer>
					)}
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
					<Styled.Camera />
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
