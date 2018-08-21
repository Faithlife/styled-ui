import styled from 'styled-components';
import { fonts, colors, thickness } from '../../components/shared-styles';
import { LightBulbH } from '../icons';

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
		background-color: ${props => props.theme.backgroundColor || backgroundColor};
		border: solid 1px ${props => props.theme.foregroundColor || foregroundColor};
		border-left: solid ${thickness.eight} ${props => props.theme.foregroundColor || foregroundColor};
	`;
}
