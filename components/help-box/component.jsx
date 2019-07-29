import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme as globalTheme } from '../../theme';
import { mediaSizes } from '../shared-styles';
import { Close, Exclamation, CircleCheck, Info, LightBulbH } from '../icons';
import { Box } from '../Box';
import { Button } from '../button';

/** Rectangular box containing tips on how to use our products */
export function HelpBox({
	children,
	showLightBulb,
	hideIcon,
	showRightIcon,
	stacked,
	className,
	theme,
	handleClose,
	success,
	danger,
	warning,
	minor,
	large,
	...helpBoxProps
}) {
	const variations = { success, danger, warning, minor };

	return (
		<Box
			stacked={stacked}
			backgroundColor={getColor(variations, 'green1', 'red1', 'yellow1', 'gray4', 'blue1')}
			border={1}
			borderColor={getColor(variations, 'green2', 'red3', 'yellow3', 'gray14', 'blue3')}
			css="border-left-width: 4px"
			color="flGray"
			position="relative"
			display="flex"
			borderRadius={1}
			{...helpBoxProps}
		>
			{(showLightBulb && <BulbIcon theme={theme} />) ||
				(!hideIcon && (
					<Icon
						theme={theme}
						success={success}
						danger={danger}
						warning={warning}
						minor={minor}
						height="18px"
						margin="17px"
						marginRight={-2}
						marginLeft={4}
					>
						{danger ? <Exclamation /> : success ? <CircleCheck /> : minor ? null : <Info />}
					</Icon>
				))}
			<HelpBoxContent
				stacked={stacked}
				theme={theme}
				display="flex"
				flex="1"
				alignItems={stacked || large || 'flex-start'}
				height={large ? '230px' : ''}
				padding={5}
				paddingLeft={4}
				flexDirection={stacked ? 'column' : ['column', 'row']}
				css="font-size: 16px; line-height: 1.25"
			>
				{children}
			</HelpBoxContent>
			{(handleClose && (
				<CloseIcon
					theme={theme}
					success={success}
					danger={danger}
					warning={warning}
					minor={minor}
					height="18px"
					margin="17px"
					marginRight={5}
					marginLeft={!stacked ? -2 : large ? 4 : 5}
				>
					<Button
						icon={<Close />}
						onClick={handleClose}
						styleOverrides={{
							fontSize: '18px',
							padding: '0px',
						}}
					/>
				</CloseIcon>
			)) ||
				(showRightIcon && (
					<Icon
						theme={theme}
						success={success}
						danger={danger}
						warning={warning}
						minor={minor}
						height="18px"
						margin="17px"
						marginRight={5}
						marginLeft={!stacked ? -2 : large ? 4 : 5}
					>
						{danger ? <Exclamation /> : success ? <CircleCheck /> : minor ? null : <Info />}
					</Icon>
				))}
		</Box>
	);
}

HelpBox.propTypes = {
	/** See the docs for how to override styles properly.  */
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	/** The light bulb will override the other icon. */
	showLightBulb: PropTypes.bool,
	/** Hides the left icon. */
	hideIcon: PropTypes.bool,
	/** This icon will not show if closing is handled. */
	showRightIcon: PropTypes.bool,
	/** Stacking will happen automatically on small viewports. */
	stacked: PropTypes.bool,
	/** Blue theme is the default.
	 * The icons are colored by foregroundColor. */
	theme: PropTypes.shape({
		foregroundColor: PropTypes.string,
		backgroundColor: PropTypes.string,
		closeIconColor: PropTypes.string,
	}),
	/** Green theme */
	success: PropTypes.bool,
	/** Red theme */
	danger: PropTypes.bool,
	/** Yellow theme */
	warning: PropTypes.bool,
	/** Gray theme */
	minor: PropTypes.bool,
	/** Height will be 230px */
	large: PropTypes.bool,
	/** If not handled, there will be no close icon. */
	handleClose: PropTypes.func,
};

HelpBox.defaultProps = {
	theme: globalTheme,
};

HelpBox.Body = styled(Box)``;

HelpBox.Footer = styled(Box)``;

const HelpBoxContent = styled(Box)`
	${HelpBox.Body} {
		display: flex;
		flex: 1;
		order: 2;
	}

	${HelpBox.Footer} {
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

const Icon = styled(Box)`
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

const CloseIcon = styled(Box)`
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

const BulbIcon = styled(LightBulbH)`
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
