import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variant } from 'styled-system';
import { getVariation } from '../utils';
import { Close, Exclamation, CircleCheck, Info, LightBulbH } from '../icons';
import { Box } from '../Box';
import { Button } from '../button';

const icons = {
	success: <CircleCheck />,
	danger: <Exclamation />,
	warning: <Info />,
	minor: null,
	original: <Info />,
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
	const iconVariant =
		icons[getVariation(variant, { success, danger, warning, minor, original: true })];
	const childrenWithProps =
		typeof children === 'string'
			? children
			: React.Children.map(children, child => React.cloneElement(child, { stacked }));

	return (
		<Container
			variant={variant ? variant : 'original'}
			stacked={stacked}
			border={1}
			css={{ borderLeftWidth: '4px' }}
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
				/>
			)) ||
				(!hideIcon && (
					<Box height="18px" margin="17px" marginRight={-2} marginLeft={4}>
						{iconVariant}
					</Box>
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
				<Box height="18px" margin="17px" marginRight={5} marginLeft={!stacked ? -2 : large ? 4 : 5}>
					<Button icon={<Close />} onClick={handleClose} textStyle="c.18" padding={0} />
				</Box>
			)) ||
				(showRightIcon && (
					<Box
						height="18px"
						margin="17px"
						marginRight={5}
						marginLeft={!stacked ? -2 : large ? 4 : 5}
					>
						{iconVariant}
					</Box>
				))}
		</Container>
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
	/** Enum with values: 'success', 'danger', 'warning', and 'minor' */
	variant: PropTypes.oneOf(['success', 'danger', 'warning', 'minor']),
	/** Green theme (deprecated in favor of the variant prop) */
	success: PropTypes.bool,
	/** Red theme (deprecated in favor of the variant prop) */
	danger: PropTypes.bool,
	/** Yellow theme (deprecated in favor of the variant prop) */
	warning: PropTypes.bool,
	/** Gray theme (deprecated in favor of the variant prop) */
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

const Container = styled(Box)`
	${variant({
		variants: {
			success: {
				backgroundColor: 'green1',
				borderColor: 'green2',
				'& > *:last-child': {
					path: {
						fill: 'green5',
					},
				},
				'& > *:not(:last-child)': {
					path: {
						fill: 'green2',
					},
				},
			},
			danger: {
				backgroundColor: 'red1',
				borderColor: 'red3',
				'& > *:last-child': {
					path: {
						fill: 'red5',
					},
				},
				'& > *:not(:last-child)': {
					path: {
						fill: 'red3',
					},
				},
			},
			warning: {
				backgroundColor: 'yellow1',
				borderColor: 'yellow3',
				'& > *:last-child': {
					path: {
						fill: 'yellow5',
					},
				},
				'& > *:not(:last-child)': {
					path: {
						fill: 'yellow3',
					},
				},
			},
			minor: {
				backgroundColor: 'gray4',
				borderColor: 'gray14',
				'& > *:last-child': {
					path: {
						fill: 'gray34',
					},
				},
				'& > *:not(:last-child)': {
					path: {
						fill: 'gray14',
					},
				},
			},
			original: {
				backgroundColor: 'blue1',
				borderColor: 'blue3',
				'& > *:last-child': {
					path: {
						fill: 'blue5',
					},
				},
				'& > *:not(:last-child)': {
					path: {
						fill: 'blue3',
					},
				},
			},
		},
	})}
`;
