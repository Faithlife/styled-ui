import React from 'react';
import PropTypes from 'prop-types';
import { theme as globalTheme } from '../../theme';
import { Close, Exclamation, CircleCheck, Info } from '../icons';
import { Box } from '../Box';
import { Button } from '../button';
import * as Styled from './styled';

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
	return (
		<Box
			stacked={stacked}
			backgroundColor={
				success
					? globalTheme.colors.green1
					: danger
					? globalTheme.colors.red1
					: warning
					? globalTheme.colors.yellow1
					: minor
					? globalTheme.colors.gray4
					: globalTheme.colors.blue1
			}
			border={`solid 1px ${
				success
					? globalTheme.colors.green2
					: danger
					? globalTheme.colors.red3
					: warning
					? globalTheme.colors.yellow3
					: minor
					? globalTheme.colors.gray14
					: globalTheme.colors.blue3
			}`}
			borderLeft={`solid 4px ${
				success
					? globalTheme.colors.green2
					: danger
					? globalTheme.colors.red3
					: warning
					? globalTheme.colors.yellow3
					: minor
					? globalTheme.colors.gray14
					: globalTheme.colors.blue3
			}`}
			color={globalTheme.colors.flGray}
			position="relative"
			display="flex"
			borderRadius={globalTheme.radii[1]}
			{...helpBoxProps}
		>
			{(showLightBulb && <Styled.BulbIcon />) ||
				(!hideIcon && (
					<Styled.Icon
						success={success}
						danger={danger}
						warning={warning}
						minor={minor}
						margin={`15px -4px 0px ${globalTheme.space[5]}px`}
					>
						{danger ? <Exclamation /> : success ? <CircleCheck /> : minor ? null : <Info />}
					</Styled.Icon>
				))}
			<Styled.HelpBoxContent
				stacked={stacked}
				display="flex"
				flex="1"
				height={large ? '230px' : ''}
				padding={`14px ${globalTheme.space[5]}px 14px ${globalTheme.space[4]}px`}
				flexDirection={stacked ? 'column' : ['column', 'row']}
			>
				{children}
			</Styled.HelpBoxContent>
			{(handleClose && (
				<Styled.CloseIcon
					success={success}
					danger={danger}
					warning={warning}
					minor={minor}
					margin={
						large
							? `15px ${globalTheme.space[5]}px ${globalTheme.space[0]}px ${globalTheme.space[5]}px`
							: `15px ${globalTheme.space[5]}px ${globalTheme.space[0]}px ${globalTheme.space[4]}px`
					}
					marginLeft={!stacked ? '-4px' : ''}
				>
					<Button
						icon={<Close />}
						onClick={handleClose}
						styleOverrides={{
							fontSize: globalTheme.fontSizes[4],
							padding: `${globalTheme.space[0]}px`,
						}}
					/>
				</Styled.CloseIcon>
			)) ||
				(showRightIcon && (
					<Styled.Icon
						success={success}
						danger={danger}
						warning={warning}
						minor={minor}
						margin={
							large
								? `15px ${globalTheme.space[5]}px ${globalTheme.space[0]}px 
									${globalTheme.space[5]}px`
								: `15px ${globalTheme.space[5]}px ${globalTheme.space[0]}px 
									${globalTheme.space[4]}px`
						}
						marginLeft={!stacked ? '-4px' : ''}
					>
						{danger ? <Exclamation /> : success ? <CircleCheck /> : minor ? null : <Info />}
					</Styled.Icon>
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

HelpBox.Body = Styled.HelpBoxBody;

HelpBox.Footer = Styled.HelpBoxFooter;
