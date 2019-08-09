import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { system } from 'styled-system';
import { Close, Exclamation, CircleCheck, Info, LightBulbH } from '../icons';
import { Box } from '../Box';
import { Button } from '../button';

function getVariation(variant, obj) {
	if (variant) {
		return variant;
	}
	return [...Object.entries(obj)].find(entry => entry[1])[0];
}

const variations = {
	success: {
		bg: 'green1',
		fg: 'green2',
		icon: <CircleCheck />,
		closeIconColor: 'green5',
	},
	danger: {
		bg: 'red1',
		fg: 'red3',
		icon: <Exclamation />,
		closeIconColor: 'red5',
	},
	warning: {
		bg: 'yellow1',
		fg: 'yellow3',
		icon: <Info />,
		closeIconColor: 'yellow5',
	},
	minor: {
		bg: 'gray4',
		fg: 'gray14',
		icon: null,
		closeIconColor: 'gray34',
	},
	original: {
		bg: 'blue1',
		fg: 'blue3',
		icon: <Info />,
		closeIconColor: 'blue5',
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
	handleClose,
	variant,
	success,
	danger,
	warning,
	minor,
	large,
	...helpBoxProps
}) {
	const chosenVariation =
		variations[getVariation(variant, { success, danger, warning, minor, original: true })];
	const childrenWithProps =
		typeof children === 'string'
			? children
			: React.Children.map(children, child => React.cloneElement(child, { stacked }));

	return (
		<Box
			stacked={stacked}
			backgroundColor={chosenVariation.bg}
			border={1}
			borderColor={chosenVariation.fg}
			css={{ borderLeftWidth: '4px' }}
			color="flGray"
			position="relative"
			display="flex"
			borderRadius={1}
			{...helpBoxProps}
		>
			{(showLightBulb && (
				<IconBox
					as={LightBulbH}
					flex="none"
					height={large ? '42px' : '24px'}
					width={large ? '42px' : '24px'}
					marginTop="14px"
					marginRight={0}
					marginBottom={0}
					marginLeft={5}
					fill={chosenVariation.fg}
				/>
			)) ||
				(!hideIcon && (
					<IconBox
						height="18px"
						margin="17px"
						marginRight={-2}
						marginLeft={4}
						fill={chosenVariation.fg}
					>
						{chosenVariation.icon}
					</IconBox>
				))}
			<Box
				stacked={stacked}
				display="flex"
				flex="1"
				alignItems={stacked || large || 'flex-start'}
				height={large ? '230px' : ''}
				padding={5}
				paddingLeft={4}
				flexDirection={stacked ? 'column' : ['column', 'row']}
				css={{ fontSize: '16px', lineHeight: '1.25' }}
			>
				{childrenWithProps}
			</Box>
			{(handleClose && (
				<IconBox
					height="18px"
					margin="17px"
					marginRight={5}
					marginLeft={!stacked ? -2 : large ? 4 : 5}
					fill={chosenVariation.closeIconColor}
				>
					<Button
						icon={<Close />}
						onClick={handleClose}
						styleOverrides={{
							fontSize: '18px',
							padding: '0px',
						}}
					/>
				</IconBox>
			)) ||
				(showRightIcon && (
					<IconBox
						height="18px"
						margin="17px"
						marginRight={5}
						marginLeft={!stacked ? -2 : large ? 4 : 5}
						fill={chosenVariation.fg}
					>
						{chosenVariation.icon}
					</IconBox>
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
	variant: PropTypes.oneOf(['success', 'danger', 'warning', 'minor']),
	/** Green theme (deprecated in favor of the variation prop) */
	success: PropTypes.bool,
	/** Red theme (deprecated in favor of the variation prop) */
	danger: PropTypes.bool,
	/** Yellow theme (deprecated in favor of the variation prop) */
	warning: PropTypes.bool,
	/** Gray theme (deprecated in favor of the variation prop) */
	minor: PropTypes.bool,
	large: PropTypes.bool,
	/** If not handled, there will be no close icon. */
	handleClose: PropTypes.func,
};

HelpBox.Body = ({ children, ...props }) => (
	<Box display="flex" flex="1" order="2" {...props}>
		{children}
	</Box>
);

HelpBox.Footer = ({ children, stacked, ...props }) => (
	<Box
		display="flex"
		order="2"
		alignItems="center"
		marginTop={[4, stacked ? 4 : '-6px']}
		marginRight={[0, stacked ? 5 : 0]}
		marginBottom={[0, stacked ? 0 : '-6px']}
		marginLeft={[0, stacked ? 0 : 5]}
		{...props}
	>
		{children}
	</Box>
);

const IconBox = styled(Box)`
	path {
		${system({ fill: { property: 'fill', scale: 'colors' } })};
	}
`;
