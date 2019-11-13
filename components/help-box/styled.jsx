import styled from 'styled-components';
import { fonts, colors, thickness } from '../../components/shared-styles';
import { LightBulbH } from '../icons';
import { resetStyles } from '../utils';
import { mediaSizes } from '../shared-styles';

export const HelpBoxContent = styled.div``;

export const HelpBoxBody = styled.div``;

export const HelpBoxFooter = styled.div``;

export const BulbIcon = styled(LightBulbH)``;

export const CloseButton = styled.button``;

export const IconDiv = styled.div``;

export const RightIconDiv = styled.div``;

export const HelpBox = variantCreator(
	colors.blueTint,
	colors.blueLight,
	colors.blueDark,
)(styled.div`
	position: relative;
	display: flex;
	border-radius: 3px;
	word-break: break-word;

	${IconDiv} {
		margin: 15px -4px 0px 16px;

		svg {
			height: 18px;
			width: 18px;
		}
	}

	${BulbIcon} {
		flex: none;

		width: ${props => (props.large ? '42px' : '24px')};
		height: ${props => (props.large ? '42px' : '24px')};
		margin: 12px 0px 0px 16px;
	}

	${HelpBoxContent} {
		${fonts.c16};
		display: flex;
		flex: 1;
		text-align: left;
		line-height: 1.25;
		font-size: 16px;
		color: ${colors.flGray};

		height: ${props => (props.large ? '230px' : '')};
		padding: 14px 16px 14px 12px;

		flex-direction: ${props => (props.stacked ? 'column' : 'row')};
		@media (max-width: ${mediaSizes.phone}) {
			flex-direction: column;
		}

		${HelpBoxBody} {
			${fonts.c16};
			display: flex;
			flex: 1;
			order: 2;
		}

		${HelpBoxFooter} {
			${fonts.c16};
			display: flex;
			order: 2;
			align-items: center;

			margin: ${props => (props.stacked ? '12px 16px 0px 0px' : '-7px 0px -7px 16px')};
			@media (max-width: ${mediaSizes.phone}) {
				margin: 12px 0px 0px 0px;
			}
		}
	}

	${CloseButton} {
		cursor: pointer;
		margin: ${props => (props.large ? '15px 16px 0px 16px' : '15px 16px 0px 12px')};
		margin-left: ${props => (!props.stacked ? '-4px' : '')};
		height: 18px;
		background: transparent;
		padding: 0;
		border: none;

		&::-moz-focus-inner {
			border: 0;
			padding: 0;
		}
	}

	${RightIconDiv} {
		margin: ${props => (props.large ? '15px 16px 0px 16px' : '15px 16px 0px 12px')};
		margin-left: ${props => (!props.stacked ? '-4px' : '')};
		height: 18px;
		background: transparent;
		padding: 0;
		border: none;

		&::-moz-focus-inner {
			border: 0;
			padding: 0;
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

		${IconDiv} {
			path {
				fill: ${props => props.theme.foregroundColor || foregroundColor};
			}
		}

		button {
			path {
				fill: ${props => props.theme.closeIconColor || closeIconColor};
			}
		}
	`;
}
