import styled from 'styled-components';
import { LightBulbH } from '../icons';
import { mediaSizes } from '../shared-styles';
import { Box } from '../Box';

export const HelpBoxBody = styled(Box)``;

export const HelpBoxFooter = styled(Box)``;

export const HelpBoxContent = styled(Box)`
	line-height: 1.25;
	font-size: ${props => props.theme.fontSizes[3]};

	${HelpBoxBody} {
		display: flex;
		flex: 1;
		order: 2;
	}

	${HelpBoxFooter} {
		display: flex;
		order: 2;
		align-items: center;
		margin: ${props =>
			props.stacked
				? `${props.theme.space[4]}px ${props.theme.space[5]}px ${props.theme.space[0]}px 
					${props.theme.space[0]}px`
				: `-6px ${props.theme.space[0]}px -6px ${props.theme.space[5]}px`};

		@media (max-width: ${mediaSizes.phone}) {
			margin: ${props => `${props.theme.space[4]}px ${props.theme.space[0]}px 
				${props.theme.space[0]}px ${props.theme.space[0]}px`};
		}
	}
`;

export const Icon = styled(Box)`
	path {
		fill: ${props =>
			getColor(
				props,
				props.theme.colors.green2,
				props.theme.colors.red3,
				props.theme.colors.yellow3,
				props.theme.colors.gray14,
				props.theme.colors.blue3,
			)};
	}
`;

export const CloseIcon = styled(Box)`
	path {
		fill: ${props =>
			getColor(
				props,
				props.theme.colors.green5,
				props.theme.colors.red5,
				props.theme.colors.yellow5,
				props.theme.colors.gray34,
				props.theme.colors.blue5,
			)};
	}
`;

export const BulbIcon = styled(LightBulbH)`
	flex: none;
	width: ${props => (props.large ? '42px' : '24px')};
	height: ${props => (props.large ? '42px' : '24px')};
	margin: ${props => `${props.theme.space[4]}px ${props.theme.space[0]}px ${props.theme.space[0]}px
				${props.theme.space[5]}px`};

	path {
		fill: ${props =>
			getColor(
				props,
				props.theme.colors.green2,
				props.theme.colors.red3,
				props.theme.colors.yellow3,
				props.theme.colors.gray14,
				props.theme.colors.blue3,
			)};
	}
`;

function getColor(props, successColor, dangerColor, warningColor, minorColor, defaultColor) {
	return props.success
		? successColor
		: props.danger
		? dangerColor
		: props.warning
		? warningColor
		: props.minor
		? minorColor
		: defaultColor;
}
