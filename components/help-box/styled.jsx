import styled from 'styled-components';
import { fonts, colors, thickness } from '../../components/shared-styles';
import { LightBulbH } from '../icons';
import { resetStyles, shadeColor } from '../utils';

export const HelpBoxContent = styled.div`
	${fonts.ui16};

	flex: 1;
	padding: ${thickness.sixteen};
	text-align: left;
	color: ${colors.flGray};
`;

export const BulbIcon = styled(LightBulbH)`
	width: 40px;
	height: 40px;
	margin: ${thickness.sixteen};
	margin-right: 0;
	flex: none;
`;

export const CloseButton = styled.button`
	margin: 10px 14px 0 0;
	height: 18px;
	background: transparent;
	padding: 0;
	border: none;

	path {
		fill: ${props =>
			props.theme.backgroundColor
				? shadeColor(props.theme.backgroundColor, -20)
				: shadeColor(colors.blueLight, -20)};
	}

	&::-moz-focus-inner {
		border: 0;
		padding: 0;
	}
`;

export const HelpBox = variantCreator(colors.blueTint, colors.blueLight)(styled.div`
	position: relative;
	display: flex;
	border-radius: 3px;
	word-break: break-word;
`);

export const variationMap = {
	success: variantCreator(colors.greenTint, colors.greenLight),
	danger: variantCreator(colors.redTint, colors.redLight),
	warning: variantCreator(colors.yellowTint, colors.yellowLight),
};

function variantCreator(backgroundColor, foregroundColor) {
	return component => component.extend`
		${resetStyles};

		background-color: ${props => props.theme.backgroundColor || backgroundColor};
		border: solid 1px ${props => props.theme.foregroundColor || foregroundColor};
		border-left: solid ${thickness.eight} ${props => props.theme.foregroundColor || foregroundColor};
	`;
}
