import React from 'react';
import PropTypes from 'prop-types';
import systemPropTypes from '@styled-system/prop-types';
import { theme } from '../../theme';
import { common, typography } from '../../theme/system';
import * as Styled from './styled';

function getVariation(variant, obj) {
	if (variant) {
		return variant;
	}
	return [...Object.entries(obj)].find(entry => entry[1])[0];
}

export const Button = React.forwardRef(function Button(props, ref) {
	// To make sure that Button and the AnchorButton components get the right props we export an object with the expected props for the Button
	// The AnchorButton should get all props that are not explicity required by the child
	// eslint-disable-next-line react/prop-types
	const {
		children,
		icon,
		disabled,
		variant,
		size,
		primary,
		primaryOutline,
		primaryTransparent,
		minor,
		minorTransparent,
		small,
		medium,
		large,
		as,
		...buttonProps
	} = props;

	return (
		<Styled.Button
			ref={ref}
			as={as}
			disabled={disabled}
			hasChildren={!!children}
			variant={getVariation(variant, {
				primary,
				primaryOutline,
				primaryTransparent,
				minor,
				minorTransparent,
				none: true,
			})}
			size={getVariation(size, { small, medium, large, none: true })}
			display="inline-flex"
			justifyContent="center"
			alignItems="center"
			textStyle={size === 'large' || large || 'c.16'}
			fontSize={(size === 'large' || large) && '24px'}
			boxShadow="none"
			borderRadius={1}
			backgroundColor="transparent"
			border="none"
			whiteSpace="nowrap"
			defaultColor={
				variant !== 'minor' || minor
					? variant === 'minorTransparent' || minorTransparent
						? 'flgray'
						: '#278ed4'
					: ''
			}
			disabledColor={
				variant !== 'minor' || minor
					? variant === 'minorTransparent' || minorTransparent
						? 'gray22'
						: '#bedcf2'
					: ''
			}
			hoverColor={
				variant === 'minor' || minor
					? 'gray14'
					: variant === 'minorTransparent' || minorTransparent
					? 'blue4'
					: '#6db3e2'
			}
			activeColor={
				variant === 'minor' || minor
					? 'gray22'
					: variant === 'minorTransparent' || minorTransparent
					? 'blue3'
					: '#1d6ca1'
			}
			minorBorderColor={disabled ? 'gray8' : 'gray14'}
			minorBackgroundColor={disabled ? 'white' : 'gray4'}
			{...buttonProps}
		>
			{icon}
			{children}
		</Styled.Button>
	);
});

Button.propTypes = {
	/** The contents of the button (can be text, svg, or other element) */
	children: PropTypes.node,
	/** Condensed button padding. Uses same padding for horizontal and vertical. */
	condensed: PropTypes.bool,
	/** Enum with values: 'primary', 'primaryOutline', 'primaryTransparent', 'minor', and 'minorTransparent' */
	variant: PropTypes.oneOf([
		'primary',
		'primaryOutline',
		'primaryTransparent',
		'minor',
		'minorTransparent',
	]),
	/** Enum with values: 'small', 'medium', and 'large' */
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	/** Primary button variation (deprecated in favor of the variant prop) */
	primary: PropTypes.bool,
	/** Primary outline variation (deprecated in favor of the variant prop) */
	primaryOutline: PropTypes.bool,
	/** Small variation (deprecated in favor of the size prop) */
	small: PropTypes.bool,
	/** Medium variation (deprecated in favor of the size prop) */
	medium: PropTypes.bool,
	/** Large variation (deprecated in favor of the size prop) */
	large: PropTypes.bool,
	/** Transparent with primary text variation (deprecated in favor of the variant prop) */
	primaryTransparent: PropTypes.bool,
	/** Minor button variation (deprecated in favor of the variant prop) */
	minor: PropTypes.bool,
	/** Transparent with minor text variation (deprecated in favor of the variant prop) */
	minorTransparent: PropTypes.bool,
	/** Enables rendering a display: flex span, needed for rendering SVG icons */
	icon: PropTypes.node,
	/** This should only be used as a last resort if current available styling options will not do what you need */
	className: PropTypes.string,
	...common.propTypes,
	...typography.propTypes,
	...systemPropTypes.layout,
	...systemPropTypes.flexbox,
	...systemPropTypes.position,
	...systemPropTypes.border,
	...systemPropTypes.background,
	textStyle: PropTypes.string,
};

Button.defaultProps = {
	theme: theme,
};
