import React from 'react';
import PropTypes from 'prop-types';
import { applyVariations } from '../utils';
import * as Styled from './styled';

const Button = React.forwardRef(function Button(props, ref) {
	// To make sure that Button and the AnchorButton components get the right props we export an object with the expected props for the Button
	// The AnchorButton should get all props that are not explicity required by the child
	// eslint-disable-next-line react/prop-types
	const { children, theme, styleOverrides, icon, as, ...buttonProps } = props;

	const { component: MappedStyledComponent, filteredProps } = applyVariations(
		Styled.Button,
		Styled.variationMap,
		buttonProps,
	);

	return (
		<MappedStyledComponent
			ref={ref}
			as={as}
			theme={theme}
			{...filteredProps || {}}
			styleOverrides={styleOverrides}
		>
			<Styled.ButtonContentWrapper styleOverrides={styleOverrides}>
				{icon}
				{children}
			</Styled.ButtonContentWrapper>
		</MappedStyledComponent>
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
};

Button.defaultProps = {
	styleOverrides: {},
};

export { Button };
