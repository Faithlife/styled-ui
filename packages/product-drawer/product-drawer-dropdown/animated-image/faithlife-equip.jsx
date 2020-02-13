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
	FaithlifeTvChurchSvg,
} from './svgs';
import * as Styled from './styled';

export const FaithlifeEquipAnimatedImage = ({ isVisible }) => (
	<Styled.AnimatedImageEquip animatedImageVisible={isVisible}>
		<div>
			<Styled.AnimatedImageTextFirst role="presentation">
				<FaithlifeSvg />
			</Styled.AnimatedImageTextFirst>
			<Styled.AnimatedImageTextSecond role="presentation">
				<EquipSvg />
			</Styled.AnimatedImageTextSecond>
		</div>
		<Styled.AnimatedImageIcon role="presentation">
			<ProclaimSvg />
		</Styled.AnimatedImageIcon>
		<Styled.AnimatedImageIcon role="presentation">
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
		<Styled.AnimatedImageIcon role="presentation">
			<FaithlifeTvChurchSvg />
		</Styled.AnimatedImageIcon>
	</Styled.AnimatedImageEquip>
);

FaithlifeEquipAnimatedImage.propTypes = {
	isVisible: PropTypes.bool.isRequired,
};
