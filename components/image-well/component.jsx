import React from 'react';
import PropTypes from 'prop-types';
import { Camera } from '../icons/18px';
import * as Styled from './styled';

const ImageWell = ({ children, previewUrl, fitPreviewToSquare, onClick, localizedResources }) => {
	if (previewUrl) {
		return (
			<ImageWellBase onClick={onClick}>
				<Styled.WellPreview
					style={{
						backgroundImage: `url(${previewUrl})`,
						backgroundSize: fitPreviewToSquare ? 'contain' : 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
					}}
				>
					<Styled.EditIconContainer>
						<Camera className="image-well_edit-icon" />
					</Styled.EditIconContainer>
				</Styled.WellPreview>
			</ImageWellBase>
		);
	}

	return (
		<ImageWellBase onClick={onClick}>
			{children ? (
				children
			) : (
				<>
					<Camera className="image-well_selector-icon" />
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
	onClick: PropTypes.function,
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
