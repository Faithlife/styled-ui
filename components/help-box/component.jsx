import React from 'react';
import PropTypes from 'prop-types';
import { theme as globalTheme } from '../../theme';
import { Close, Exclamation, CircleCheck, Info, LightBulbH } from '../icons';
import { Box } from '../Box';
import { Button } from '../button';

function getVariation(variation, obj) {
	if (variation) {
		return variation;
	}
	return [...Object.entries(obj)].find(entry => entry[1])[0];
}

function getFill(theme, color) {
	return `path {
				fill: ${new Map(Object.entries(theme.colors)).get(color)};
			}`;
}

const variations = {
	success: {
		bg: 'green1',
		borderColor: 'green2',
		iconColor: 'green2',
		icon: <CircleCheck />,
		closeIconColor: 'green5',
		bulbColor: 'green2',
	},
	danger: {
		bg: 'red1',
		borderColor: 'red3',
		iconColor: 'red3',
		icon: <Exclamation />,
		closeIconColor: 'red5',
		bulbColor: 'red3',
	},
	warning: {
		bg: 'yellow1',
		borderColor: 'yellow3',
		iconColor: 'yellow3',
		icon: <Info />,
		closeIconColor: 'yellow5',
		bulbColor: 'yellow3',
	},
	minor: {
		bg: 'gray4',
		borderColor: 'gray14',
		iconColor: 'gray14',
		icon: null,
		closeIconColor: 'gray34',
		bulbColor: 'gray14',
	},
	original: {
		bg: 'blue1',
		borderColor: 'blue3',
		iconColor: 'blue3',
		icon: <Info />,
		closeIconColor: 'blue5',
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
	variation,
	success,
	danger,
	warning,
	minor,
	large,
	...helpBoxProps
}) {
	const chosenVariation =
		variations[getVariation(variation, { success, danger, warning, minor, original: true })];
	const childrenWithProps =
		typeof children === 'string'
			? children
			: React.Children.map(children, child => React.cloneElement(child, { stacked: stacked }));

	return (
		<Box
			stacked={stacked}
			backgroundColor={chosenVariation.bg}
			border={1}
			borderColor={chosenVariation.borderColor}
			css="border-left-width: 4px"
			color="flGray"
			position="relative"
			display="flex"
			borderRadius={1}
			{...helpBoxProps}
		>
			{(showLightBulb && (
				<Box
					as={LightBulbH}
					flex="none"
					height={large ? '42px' : '24px'}
					width={large ? '42px' : '24px'}
					marginTop="14px"
					marginRight={0}
					marginBottom={0}
					marginLeft={5}
					css={getFill(theme, chosenVariation.bulbColor)}
				/>
			)) ||
				(!hideIcon && (
					<Box
						height="18px"
						margin="17px"
						marginRight={-2}
						marginLeft={4}
						css={getFill(theme, chosenVariation.iconColor)}
					>
						{chosenVariation.icon}
					</Box>
				))}
			<Box
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
				{childrenWithProps}
			</Box>
			{(handleClose && (
				<Box
					height="18px"
					margin="17px"
					marginRight={5}
					marginLeft={!stacked ? -2 : large ? 4 : 5}
					css={getFill(theme, chosenVariation.closeIconColor)}
				>
					<Button
						icon={<Close />}
						onClick={handleClose}
						styleOverrides={{
							fontSize: '18px',
							padding: '0px',
						}}
					/>
				</Box>
			)) ||
				(showRightIcon && (
					<Box
						height="18px"
						margin="17px"
						marginRight={5}
						marginLeft={!stacked ? -2 : large ? 4 : 5}
						css={getFill(theme, chosenVariation.iconColor)}
					>
						{chosenVariation.icon}
					</Box>
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
	/** Enum with values: 'success', 'danger', 'warning', and 'minor' */
	variation: PropTypes.oneOf(['success', 'danger', 'warning', 'minor']),
	/** Green theme (depricated in favor of the variation prop) */
	success: PropTypes.bool,
	/** Red theme (depricated in favor of the variation prop) */
	danger: PropTypes.bool,
	/** Yellow theme (depricated in favor of the variation prop) */
	warning: PropTypes.bool,
	/** Gray theme (depricated in favor of the variation prop) */
	minor: PropTypes.bool,
	large: PropTypes.bool,
	/** If not handled, there will be no close icon. */
	handleClose: PropTypes.func,
};

HelpBox.defaultProps = {
	theme: globalTheme,
};

HelpBox.Body = ({ children }) => (
	<Box display="flex" flex="1" order="2">
		{children}
	</Box>
);

HelpBox.Footer = ({ children, stacked }) => (
	<Box
		display="flex"
		order="2"
		alignItems="center"
		marginTop={[4, stacked ? 4 : '-6px']}
		marginRight={[0, stacked ? 5 : 0]}
		marginBottom={[0, stacked ? 0 : '-6px']}
		marginLeft={[0, stacked ? 0 : 5]}
	>
		{children}
	</Box>
);
