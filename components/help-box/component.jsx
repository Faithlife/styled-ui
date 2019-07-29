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
				success ? 'green1' : danger ? 'red1' : warning ? 'yellow1' : minor ? 'gray4' : 'blue1'
			}
			border={1}
			borderColor={
				success ? 'green2' : danger ? 'red3' : warning ? 'yellow3' : minor ? 'gray14' : 'blue3'
			}
			css="border-left-width: 4px"
			color="flGray"
			position="relative"
			display="flex"
			borderRadius={1}
			{...helpBoxProps}
		>
			{(showLightBulb && <Styled.BulbIcon theme={theme} />) ||
				(!hideIcon && (
					<Styled.Icon
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
					</Styled.Icon>
				))}
			<Styled.HelpBoxContent
				stacked={stacked}
				theme={theme}
				display="flex"
				flex="1"
				alignItems={stacked || large || 'flex-start'}
				height={large ? '230px' : ''}
				padding={5}
				paddingLeft={4}
				flexDirection={stacked ? 'column' : ['column', 'row']}
			>
				{children}
			</Styled.HelpBoxContent>
			{(handleClose && (
				<Styled.CloseIcon
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
				</Styled.CloseIcon>
			)) ||
				(showRightIcon && (
					<Styled.Icon
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

HelpBox.defaultProps = {
	theme: globalTheme,
};

HelpBox.Body = Styled.HelpBoxBody;

HelpBox.Footer = Styled.HelpBoxFooter;
