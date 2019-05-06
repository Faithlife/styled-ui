import React from 'react';
import PropTypes from 'prop-types';
import { applyVariations } from '../utils';
import * as Styled from './styled';

export const baseButtonProps = Object.freeze({
	children: 'children',
	className: 'className',
	condensed: 'condensed',
	theme: 'theme',
	styleOverrides: 'styleOverrides',
	primary: 'primary',
	primaryOutline: 'primaryOutline',
	small: 'small',
	medium: 'medium',
	large: 'large',
	primaryTransparent: 'primaryTransparent',
	minorTransparent: 'minorTransparent',
	icon: 'icon',
	minor: 'minor',
});

export function BaseButton(props) {
	// To make sure that BaseButton and the Button/AnchorButton components get the right props we export an object with the expected props for the BaseButton
	// The Button/AnchorButtons should get all props that are not explicity required by the child
	// eslint-disable-next-line react/prop-types
	const { children, theme, styleOverrides, icon, ...buttonProps } = props;

	const { component: MappedStyledComponent, filteredProps } = applyVariations(
		Styled.ButtonContentWrapper,
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
	[baseButtonProps.children]: PropTypes.node,
	/** See the docs for how to override styles properly */
	[baseButtonProps.className]: PropTypes.string,
	/** Condensed button padding. Uses same padding for horizontal and vertical. */
	[baseButtonProps.condensed]: PropTypes.bool,
	/** An optional theme */
	[baseButtonProps.theme]: PropTypes.shape({
		defaultColor: PropTypes.string,
		hoverColor: PropTypes.string,
		activeColor: PropTypes.string,
		disabledColor: PropTypes.string,
	}),
	/** Style overrides */
	[baseButtonProps.styleOverrides]: PropTypes.shape({
		width: PropTypes.string,
		fontSize: PropTypes.string,
		padding: PropTypes.string,
		justifyContent: PropTypes.string,
	}),
	/** Primary button variation */
	[baseButtonProps.primary]: PropTypes.bool,
	/** Primary outline variation */
	[baseButtonProps.primaryOutline]: PropTypes.bool,
	/** Small variation */
	[baseButtonProps.small]: PropTypes.bool,
	/** Medium variation */
	[baseButtonProps.medium]: PropTypes.bool,
	/** Large variation */
	[baseButtonProps.large]: PropTypes.bool,
	/** Transparent with primary text variation */
	[baseButtonProps.primaryTransparent]: PropTypes.bool,
	/** Minor button variation */
	[baseButtonProps.primary]: PropTypes.bool,
	/** Transparent with minor text variation */
	[baseButtonProps.minorTransparent]: PropTypes.bool,
	/** Enables rendering a display: flex span, needed for rendering SVG icons */
	[baseButtonProps.icon]: PropTypes.node,
};

BaseButton.defaultProps = {
	[baseButtonProps.styleOverrides]: {},
};
