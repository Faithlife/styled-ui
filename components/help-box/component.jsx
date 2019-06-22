import React from 'react';
import PropTypes from 'prop-types';
import { Close, Exclamation, OKCircle, Caret } from '../icons';
import { applyVariations } from '../utils';
import * as Styled from './styled';

/** Rectangular box containing tips on how to use our products */
export function HelpBox({
	children,
	showLightBulb,
	hideIcon,
	className,
	theme,
	handleClose,
	stacked,
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
							<OKCircle />
						) : helpBoxProps.minor ? null : (
							<Caret />
						)}
					</Styled.IconDiv>
				))}
			{children}
			{handleClose && (
				<Styled.CloseButton onClick={handleClose}>
					<Close />
				</Styled.CloseButton>
			)}
		</HelpBoxVariation>
	);
}

HelpBox.propTypes = {
	/** See the docs for how to override styles properly.  */
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	/** The light bulb will override the other icon. */
	showLightBulb: PropTypes.bool,
	hideIcon: PropTypes.bool,
	/** Stacking will happen automatically on small viewports. */
	stacked: PropTypes.bool,
	/** Blue theme is the default. */
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
	large: PropTypes.bool,
	/** If not handled, there will be no close icon. */
	handleClose: PropTypes.func,
};

HelpBox.Content = Styled.HelpBoxContent;

HelpBox.Body = Styled.HelpBoxBody;

HelpBox.Footer = Styled.HelpBoxFooter;
