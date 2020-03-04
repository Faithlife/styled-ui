import React from 'react';
import PropTypes from 'prop-types';
import {
	X as Close,
	ErrorCircle as Exclamation,
	CorrectCircle as CircleCheck,
	WarningCircle as Info,
} from '../icons/12px';
import { applyVariations } from '../utils';
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
	...helpBoxProps
}) {
	const { component: HelpBoxVariation, filteredProps } = applyVariations(
		Styled.HelpBox,
		Styled.variationMap,
		helpBoxProps,
	);

	return (
		<HelpBoxVariation
			className={className}
			theme={theme}
			success={helpBoxProps.success}
			danger={helpBoxProps.danger}
			warning={helpBoxProps.warning}
			minor={helpBoxProps.minor}
			stacked={stacked}
			{...filteredProps}
		>
			{(showLightBulb && <Styled.BulbIcon />) ||
				(!hideIcon && (
					<Styled.IconDiv>
						{helpBoxProps.danger ? (
							<Exclamation />
						) : helpBoxProps.success ? (
							<CircleCheck />
						) : helpBoxProps.minor ? null : (
							<Info />
						)}
					</Styled.IconDiv>
				))}
			<Styled.HelpBoxContent>{children}</Styled.HelpBoxContent>
			{(handleClose && (
				<Styled.CloseButton onClick={handleClose}>
					<Close />
				</Styled.CloseButton>
			)) ||
				(showRightIcon && (
					<Styled.RightIconDiv>
						{helpBoxProps.danger ? (
							<Exclamation />
						) : helpBoxProps.success ? (
							<CircleCheck />
						) : helpBoxProps.minor ? null : (
							<Info />
						)}
					</Styled.RightIconDiv>
				))}
		</HelpBoxVariation>
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
