import React from 'react';
import PropTypes from 'prop-types';
import {
	FaithlifeSvg,
	EquipSvg,
	ProclaimSvg,
	SermonsSvg,
	GivingSvg,
	FaithlifeTvSvg,
	MobileEdSvg,
	BibleScreenSvg,
	FaithlifeLiveStreamSvg,
} from './svgs';
import * as Styled from './styled';

export const FaithlifeEquipAnimatedImage = ({ isVisible }) => (
	<Styled.AnimatedImage animatedImageVisible={isVisible}>
		<div>
			<Styled.AnimatedImageTextFirst role="presentation">
				<FaithlifeSvg />
			</Styled.AnimatedImageTextFirst>
			<Styled.AnimatedImageTextSecond role="presentation">
				<EquipSvg />
			</Styled.AnimatedImageTextSecond>
		</div>
		<Styled.AnimatedImageIcon role="presentation" fadeRight>
			<ProclaimSvg />
		</Styled.AnimatedImageIcon>
		<Styled.AnimatedImageIcon role="presentation" fadeRight>
			<SermonsSvg />
		</Styled.AnimatedImageIcon>
		<Styled.AnimatedImageIcon role="presentation">
			<GivingSvg />
		</Styled.AnimatedImageIcon>
		<Styled.AnimatedImageIcon role="presentation">
			<FaithlifeTvSvg />
		</Styled.AnimatedImageIcon>
		<Styled.AnimatedImageIcon role="presentation">
			<MobileEdSvg />
		</Styled.AnimatedImageIcon>
		<Styled.AnimatedImageIcon role="presentation" fadeLeft>
			<BibleScreenSvg />
		</Styled.AnimatedImageIcon>
		<Styled.AnimatedImageIcon role="presentation" fadeLeft>
			<FaithlifeLiveStreamSvg />
		</Styled.AnimatedImageIcon>
	</Styled.AnimatedImage>
);

FaithlifeEquipAnimatedImage.propTypes = {
	isVisible: PropTypes.bool.isRequired,
};
