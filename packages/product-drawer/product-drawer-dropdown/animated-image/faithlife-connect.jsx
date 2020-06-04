import React from 'react';
import PropTypes from 'prop-types';
import { FaithlifeSvg, ConnectSvg, LogosSvg, FaithlifeTvSvg, MobileEdSvg, EbooksSvg } from './svgs';
import * as Styled from './styled';

export const FaithlifeConnectAnimatedImage = ({ isVisible }) => (
	<Styled.AnimatedImage animatedImageVisible={isVisible}>
		<div>
			<Styled.AnimatedImageTextFirst role="presentation">
				<FaithlifeSvg />
			</Styled.AnimatedImageTextFirst>
			<Styled.AnimatedImageTextSecond role="presentation">
				<ConnectSvg />
			</Styled.AnimatedImageTextSecond>
		</div>
		<Styled.AnimatedImageIcon role="presentation" fadeRight>
			<LogosSvg />
		</Styled.AnimatedImageIcon>
		<Styled.AnimatedImageIcon role="presentation">
			<FaithlifeTvSvg />
		</Styled.AnimatedImageIcon>
		<Styled.AnimatedImageIcon role="presentation">
			<MobileEdSvg />
		</Styled.AnimatedImageIcon>
		<Styled.AnimatedImageIcon role="presentation" fadeLeft>
			<EbooksSvg />
		</Styled.AnimatedImageIcon>
	</Styled.AnimatedImage>
);

FaithlifeConnectAnimatedImage.propTypes = {
	isVisible: PropTypes.bool.isRequired,
};
