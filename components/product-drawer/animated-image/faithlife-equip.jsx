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
} from './svgs';

import * as Styled from './styled';

const FaithlifeEquipAnimatedImage = ({ isVisible }) => (
	<Styled.AnimatedImageEquip animatedImageVisible={isVisible}>
		<div>
			<Styled.AnimatedImageTextFirst src={FaithlifeSvg} role="presentation" />
			<Styled.AnimatedImageTextSecond src={EquipSvg} role="presentation" />
		</div>
		<Styled.AnimatedImageIcon src={ProclaimSvg} role="presentation" />
		<Styled.AnimatedImageIcon src={SermonsSvg} role="presentation" />
		<Styled.AnimatedImageIcon src={GivingSvg} role="presentation" />
		<Styled.AnimatedImageIcon src={FaithlifeTvSvg} role="presentation" />
		<Styled.AnimatedImageIcon src={MobileEdSvg} role="presentation" />
		<Styled.AnimatedImageIcon src={BibleScreenSvg} role="presentation" />
	</Styled.AnimatedImageEquip>
);

FaithlifeEquipAnimatedImage.propTypes = {
	isVisible: PropTypes.bool.isRequired,
};

export default FaithlifeEquipAnimatedImage;
