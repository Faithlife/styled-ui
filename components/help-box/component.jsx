import React from 'react';
import PropTypes from 'prop-types';
import { Close } from '../icons';
import { applyVariations } from '../utils';
import * as Styled from './styled';

/** Rectangular box containing tips on how to use our products */
export function HelpBox({
	children,
	showLightBulb,
	icon,
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
		<HelpBoxVariation className={className} theme={theme} {...filteredProps}>
			{(showLightBulb && <Styled.BulbIcon />) ||
				(icon && <Styled.LeftIcon>{icon}</Styled.LeftIcon>)}
			<Styled.HelpBoxContent>{children}</Styled.HelpBoxContent>
			{handleClose && (
				<Styled.CloseButton onClick={handleClose}>
					<Close />
				</Styled.CloseButton>
			)) ||
				(icon && <Styled.RightIcon>{icon}</Styled.RightIcon>)}
		</HelpBoxVariation>
	);
}

HelpBox.propTypes = {
	/** See the docs for how to override styles properly  */
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	showLightBulb: PropTypes.bool,
	icon: PropTypes.node,
	theme: PropTypes.shape({
		foregroundColor: PropTypes.string,
		backgroundColor: PropTypes.string,
		closeIconColor: PropTypes.string,
	}),
	success: PropTypes.bool,
	danger: PropTypes.bool,
	warning: PropTypes.bool,
	minor: PropTypes.bool,
	handleClose: PropTypes.func,
};
