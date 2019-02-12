import React from 'react';
import PropTypes from 'prop-types';
import { FaithlifeSvg, ConnectSvg, LogosSvg, FaithlifeTvSvg, MobileEdSvg, EbooksSvg } from './svgs';

import * as Styled from './styled';

const FaithlifeConnectAnimatedImage = ({ isVisible }) => (
	<Styled.AnimatedImage animatedImageVisible={isVisible}>
		<div>
			<Styled.AnimatedImageTextFirst src={FaithlifeSvg} role="presentation" />
			<Styled.AnimatedImageTextSecond src={ConnectSvg} role="presentation" />
		</div>
		<Styled.AnimatedImageIcon src={LogosSvg} role="presentation" />
		<Styled.AnimatedImageIcon src={FaithlifeTvSvg} role="presentation" />
		<Styled.AnimatedImageIcon src={MobileEdSvg} role="presentation" />
		<Styled.AnimatedImageIcon src={EbooksSvg} role="presentation" />
	</Styled.AnimatedImage>
);

FaithlifeConnectAnimatedImage.propTypes = {
	isVisible: PropTypes.bool.isRequired,
};

export default FaithlifeConnectAnimatedImage;
