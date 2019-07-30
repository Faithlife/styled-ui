import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme as globalTheme } from '../../theme';
import { mediaSizes } from '../shared-styles';
import { Close, Exclamation, CircleCheck, Info, LightBulbH } from '../icons';
import { Box } from '../Box';
import { Button } from '../button';

function getVariation(obj) {
	return [...Object.entries(obj)].find(entry => entry[1])[0];
}

const variations = {
	success: {
		bg: 'green1',
		borderColor: 'green2',
		iconColor: 'green2',
		icon: <CircleCheck />,
		close: 'green5',
		bulbColor: 'green2',
	},
	danger: {
		bg: 'red1',
		borderColor: 'red3',
		iconColor: 'red3',
		icon: <Exclamation />,
		close: 'red5',
		bulbColor: 'red3',
	},
	warning: {
		bg: 'yellow1',
		borderColor: 'yellow3',
		iconColor: 'yellow3',
		icon: <Info />,
		close: 'yellow5',
		bulbColor: 'yellow3',
	},
	minor: {
		bg: 'gray4',
		borderColor: 'gray14',
		iconColor: 'gray14',
		icon: null,
		close: 'gray34',
		bulbColor: 'gray14',
	},
	original: {
		bg: 'blue1',
		borderColor: 'blue3',
		iconColor: 'blue3',
		icon: <Info />,
		close: 'blue5',
		bulbColor: 'blue3',
	},
};

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
			backgroundColor={variation.bg}
			border={1}
			borderColor={variation.borderColor}
			css="border-left-width: 4px"
			color="flGray"
			position="relative"
			display="flex"
			borderRadius={1}
			{...helpBoxProps}
		>
			{(showLightBulb && (
					<Icon
					as={LightBulbH}
					flex="none"
					height={large ? '42px' : '24px'}
					width={large ? '42px' : '24px'}
					marginTop="14px"
					marginRight={0}
					marginBottom={0}
					marginLeft={5}
						theme={theme}
					fillColor={variation.bulbColor}
				/>
			)) ||
				(!hideIcon && (
					<Icon
						height="18px"
						margin="17px"
						marginRight={-2}
						marginLeft={4}
						theme={theme}
						fillColor={variation.iconColor}
					>
						{variation.icon}
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
				<Icon
					height="18px"
					margin="17px"
					marginRight={5}
					marginLeft={!stacked ? -2 : large ? 4 : 5}
					theme={theme}
					fillColor={variation.closeIconColor}
				>
					<Button
						icon={<Close />}
						onClick={handleClose}
						styleOverrides={{
							fontSize: '18px',
							padding: '0px',
						}}
					/>
				</Icon>
			)) ||
				(showRightIcon && (
					<Icon
						height="18px"
						margin="17px"
						marginRight={5}
						marginLeft={!stacked ? -2 : large ? 4 : 5}
						theme={theme}
						fillColor={variation.iconColor}
					>
						{variation.icon}
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
		fill: ${({ theme, fillColor }) => new Map(Object.entries(theme.colors)).get(fillColor)};
	}
`;
