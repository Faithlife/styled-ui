import React from 'react';
import PropTypes from 'prop-types';
import { applyVariations } from '../utils';
import * as Styled from './styled';

export function BaseButton(props) {
	const { children, theme, styleOverrides, icon, ...buttonProps } = props;

	const { component: MappedStyledComponent, filteredProps } = applyVariations(
		Styled.ButtonContentWrapper, // this is required but we don't want it in the generated docs so don't include it above
		Styled.variationMap,
		buttonProps,
	);

	return (
		<MappedStyledComponent theme={theme} {...filteredProps || {}} styleOverrides={styleOverrides}>
			{icon}
			{children && <Styled.ButtonContents>{children}</Styled.ButtonContents>}
		</MappedStyledComponent>
	);
}

BaseButton.propTypes = {
	/** The contents of the button (can be text, svg, or other element) */
	children: PropTypes.node,
	/** See the docs for how to override styles properly  */
	className: PropTypes.string,
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
	/** Transparent with minor text variation */
	minorTransparent: PropTypes.bool,
	/** Enables rendering a display: flex span, needed for rendering SVG icons */
	icon: PropTypes.node,
};

BaseButton.defaultProps = {
	styleOverrides: {},
	disableAutoBlur: false,
};
