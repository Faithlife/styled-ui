import styled from 'styled-components';
import { fonts, colors, thickness } from '../../components/shared-styles';
import { LightBulbH, Exclamation } from '../icons';
import { resetStyles } from '../utils';
import { mediaSizes } from '../shared-styles';

export const HelpBoxContent = styled.div`
	${fonts.c16};
	display: flex;
	flex: 1;
	padding: 14px 0px 14px 12px;
	text-align: left;
	line-height: 1.25;
	font-size: 16px;
	color: ${colors.flGray};
`;

export const HelpBoxBody = styled.div`
	${fonts.c16};
	display: flex;
	flex: 1;
	order: 2;
`;

export const HelpBoxFooter = styled.div`
	${fonts.c16};
	display: flex;
	order: 2;
`;

export const BulbIcon = styled(LightBulbH)`
	width: 42px;
	height: 42px;
	margin: ${thickness.sixteen};
	margin-right: 0;
	flex: none;
`;

export const SmallBulbIcon = styled(LightBulbH)`
	width: 24px;
	height: 24px;
	margin: ${thickness.sixteen};
	margin-right: 0;
	flex: none;
`;

export const LeftIcon = styled.div`
	margin: 15px -4px 0px 16px;
`;

export const RightIcon = styled.div`
	margin: 15px 16px 0px 24px;
`;

export const CloseButton = styled.button`
	cursor: pointer;
	margin: 17px 14px 0px 12px;
	height: 18px;
	background: transparent;
	padding: 0;
	border: none;

	&::-moz-focus-inner {
		border: 0;
		padding: 0;
	}
`;

export const Icon = styled(Exclamation)`
	margin: 15px -4px 0px 16px;
`;

export const HelpBox = variantCreator(
	colors.blueTint,
	colors.blueLight,
	colors.blueDark,
)(styled.div`
	position: relative;
	display: flex;
	border-radius: 3px;
	word-break: break-word;

	${HelpBoxContent} {
		flex-direction: ${props => (props.stacked ? 'column' : 'row')};
		@media (max-width: ${mediaSizes.phone}) {
			flex-direction: column;
		}

		${HelpBoxFooter} {
			margin: ${props => (props.stacked ? '12px 0px 0px 0px' : '-3px 0px')};
			@media (max-width: ${mediaSizes.phone}) {
				margin: 12px 0px 0px 0px;
			}
		}
	}
`);

export const variationMap = {
	success: variantCreator(colors.greenTint, colors.greenLight, colors.greenDark),
	danger: variantCreator(colors.redTint, colors.redLight, colors.redDark),
	warning: variantCreator(colors.yellowTint, colors.yellowLight, colors.yellowDark),
	minor: variantCreator(colors.gray4, colors.gray14, colors.gray34),
};

function variantCreator(backgroundColor, foregroundColor, closeIconColor) {
	return component => styled(component)`
		${resetStyles};

		background-color: ${props => props.theme.backgroundColor || backgroundColor};
		border: solid 1px ${props => props.theme.foregroundColor || foregroundColor};
		border-left: solid ${thickness.four} ${props => props.theme.foregroundColor || foregroundColor};

		path {
			fill: ${props => props.theme.closeIconColor || closeIconColor};
		}
	`;
}
