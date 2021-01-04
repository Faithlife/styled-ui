import styled from 'styled-components';
import { variant } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { LightBulbH } from '../icons';
import { resetStyles } from '../utils';

export const HelpBoxContent = styled.div``;

export const HelpBoxBody = styled.div``;

export const HelpBoxFooter = styled.div``;

export const BulbIcon = styled(LightBulbH)``;

export const CloseButton = styled.button``;

export const IconDiv = styled.div``;

export const RightIconDiv = styled.div``;

export const HelpBox = styled.div`
	position: relative;
	display: flex;
	border-radius: 3px;
	word-break: break-word;

	${IconDiv} {
		margin: ${({ hasIcon }) => (hasIcon ? '15px -4px 0px 16px' : '15px 4px 0px 0px')};

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
		font-weight: ${themeGet('fontWeights.regular')};
		display: flex;
		flex: 1;
		text-align: left;
		line-height: 1.25;
		font-size: 16px;
		color: ${themeGet('colors.flGray')};

		height: ${props => (props.large ? '230px' : '')};
		padding: 14px 16px 14px 12px;

		flex-direction: ${props => (props.stacked ? 'column' : 'row')};
		@media (max-width: ${themeGet('breakpoints.phone')}) {
			flex-direction: column;
		}

		${HelpBoxBody} {
			font-size: ${themeGet('fontSizes.3')};
			font-weight: ${themeGet('fontWeights.regular')};
			line-height: ${themeGet('lineHeights.3')};
			display: flex;
			flex: 1;
			order: 2;
		}

		${HelpBoxFooter} {
			font-size: ${themeGet('fontSizes.3')};
			font-weight: ${themeGet('fontWeights.regular')};
			line-height: ${themeGet('lineHeights.3')};
			display: flex;
			order: 2;
			align-items: center;

			margin: ${props => (props.stacked ? '12px 16px 0px 0px' : '-7px 0px -7px 16px')};
			@media (max-width: ${themeGet('breakpoints.phone')}) {
				margin: 12px 0px 0px 0px;
			}
		}
	}

	${CloseButton} {
		cursor: pointer;
		margin: ${props => (props.large ? '15px 16px 0px 16px' : '15px 16px 0px 12px')};
		margin-left: ${props => !props.stacked && '-4px'};
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
		margin-left: ${props => !props.stacked && '-4px'};
		height: 18px;
		background: transparent;
		padding: 0;
		border: none;

		&::-moz-focus-inner {
			border: 0;
			padding: 0;
		}
	}

	${resetStyles}

	${props =>
		variant({
			variants: {
				primary: createColorVariant('primary', props),
				success: createColorVariant('success', props),
				danger: createColorVariant('danger', props),
				warning: createColorVariant('warning', props),
				minor: createColorVariant('minor', props),
			},
		})}
`;

HelpBox.defaultProps = {
	variant: 'primary',
};

/**
 * Generates the styles for a given color variant.
 *
 * @param {'primary'|'success'|'danger'|'warning'|'minor'} name - The name of the color variant.
 * @param {object} props - `HelpBox`'s `props` object.
 * @returns {object} That variant's style object.
 */
function createColorVariant(name, props) {
	return {
		backgroundColor: `helpBox.${name}Background`,
		borderLeft: `solid ${themeGet('space.2')(props)} ${themeGet(`colors.helpBox.${name}Foreground`)(
			props,
		)}`,
		[IconDiv]: {
			path: {
				fill: themeGet(`colors.helpBox.${name}Foreground`)(props),
			},
		},
		[CloseButton]: {
			path: {
				fill: themeGet(`colors.helpBox.${name}Icon`)(props),
			},
		},
	};
}
