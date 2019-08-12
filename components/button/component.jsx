import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

function getVariation(variant, obj) {
	if (variant) {
		return variant;
	}
	return [...Object.entries(obj)].find(entry => entry[1])[0];
}

const Button = React.forwardRef(function Button(props, ref) {
	// To make sure that Button and the AnchorButton components get the right props we export an object with the expected props for the Button
	// The AnchorButton should get all props that are not explicity required by the child
	// eslint-disable-next-line react/prop-types
	const {
		children,
		theme,
		styleOverrides,
		icon,
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
			theme={theme}
			styleOverrides={styleOverrides}
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
	/** An optional theme */
	theme: PropTypes.shape({
		defaultColor: PropTypes.string,
		hoverColor: PropTypes.string,
		activeColor: PropTypes.string,
		disabledColor: PropTypes.string,
	}),
	/** Style overrides */
	styleOverrides: PropTypes.shape({
		width: PropTypes.string,
		fontSize: PropTypes.string,
		padding: PropTypes.string,
		justifyContent: PropTypes.string,
	}),
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
	/** Primary button variation */
	primary: PropTypes.bool,
	/** Primary outline variation */
	primaryOutline: PropTypes.bool,
	/** Small variation */
	small: PropTypes.bool,
	/** Medium variation */
	medium: PropTypes.bool,
	/** Large variation */
	large: PropTypes.bool,
	/** Transparent with primary text variation */
	primaryTransparent: PropTypes.bool,
	/** Minor button variation */
	minor: PropTypes.bool,
	/** Transparent with minor text variation */
	minorTransparent: PropTypes.bool,
	/** Enables rendering a display: flex span, needed for rendering SVG icons */
	icon: PropTypes.node,
	/** This should only be used as a last resort if Theme and StyleOverrides will not do what you need */
	className: PropTypes.string,
};

Button.defaultProps = {
	styleOverrides: {},
};

export { Button };
