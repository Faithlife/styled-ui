import React from 'react';
import PropTypes from 'prop-types';
import {
	X as Close,
	ErrorCircle as Exclamation,
	CorrectCircle as CircleCheck,
	WarningCircle as Info,
} from '../icons/12px';
import * as Styled from './styled';
import { getVariation } from '../utils';
import { DefaultThemeProvider } from '../DefaultThemeProvider';

/** Rectangular box containing tips on how to use our products */
export function HelpBox({
	children,
	showLightBulb,
	hideIcon,
	showRightIcon,
	stacked,
	handleClose,
	variant,
	primary,
	success,
	danger,
	warning,
	minor,
	...helpBoxProps
}) {
	const selectedVariant =
		getVariation(variant, { primary, success, danger, warning, minor }) ?? undefined;

	return (
		<DefaultThemeProvider>
			<Styled.HelpBox
				variant={selectedVariant}
				stacked={stacked}
				hasIcon={(!hideIcon && !(selectedVariant === 'minor')) || showLightBulb}
				{...helpBoxProps}
			>
				{(showLightBulb && <Styled.BulbIcon />) ||
					(!hideIcon && (
						<Styled.IconDiv>
							{selectedVariant === 'danger' ? (
								<Exclamation />
							) : selectedVariant === 'success' ? (
								<CircleCheck />
							) : selectedVariant === 'minor' ? null : (
								<Info />
							)}
						</Styled.IconDiv>
					))}
				<Styled.HelpBoxContent>{children}</Styled.HelpBoxContent>
				{(handleClose && (
					<Styled.CloseButton aria-label="Close" onClick={handleClose}>
						<Close />
					</Styled.CloseButton>
				)) ||
					(showRightIcon && (
						<Styled.RightIconDiv>
							{selectedVariant === 'danger' ? (
								<Exclamation />
							) : selectedVariant === 'success' ? (
								<CircleCheck />
							) : selectedVariant === 'minor' ? null : (
								<Info />
							)}
						</Styled.RightIconDiv>
					))}
			</Styled.HelpBox>
		</DefaultThemeProvider>
	);
}

HelpBox.propTypes = {
	children: PropTypes.node.isRequired,
	/** The light bulb will override the other icon. */
	showLightBulb: PropTypes.bool,
	/** Hides the left icon. */
	hideIcon: PropTypes.bool,
	/** This icon will not show if closing is handled. */
	showRightIcon: PropTypes.bool,
	/** Stacking will happen automatically on small viewports. */
	stacked: PropTypes.bool,
	/** Specifies the color variant (defaults to `primary`). */
	variant: PropTypes.oneOf(['primary', 'success', 'danger', 'warning', 'minor']),
	/** Shortcut for setting `variant` to `primary` (the blue theme). */
	primary: PropTypes.bool,
	/** Shortcut for setting `variant` to `success` (the green theme). */
	success: PropTypes.bool,
	/** Shortcut for setting `variant` to `danger` (the red theme). */
	danger: PropTypes.bool,
	/** Shortcut for setting `variant` to `warning` (the yellow theme). */
	warning: PropTypes.bool,
	/** Shortcut for setting `variant` to `minor` (the gray theme). */
	minor: PropTypes.bool,
	/** Sets height to `230px`. */
	large: PropTypes.bool,
	/** If not handled, there will be no close icon. */
	handleClose: PropTypes.func,
};

HelpBox.Body = Styled.HelpBoxBody;

HelpBox.Footer = Styled.HelpBoxFooter;
