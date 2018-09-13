import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { applyVariations } from '../utils';
import * as Styled from './styled.jsx';

export const SharedButtonPropTypes = {
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
	}),
	/** Primary button variation */
	primary: PropTypes.bool,
	/** Primary outline variation */
	primaryOutline: PropTypes.bool,
	/** Medium variation */
	medium: PropTypes.bool,
	/** Small variation */
	small: PropTypes.bool,
	/** Large variation */
	large: PropTypes.bool,
	/** Extra large variation */
	extraLarge: PropTypes.bool,
	/** Transparent with primary text variation */
	primaryTransparent: PropTypes.bool,
	/** Transparent with minor text variation */
	minorTransparent: PropTypes.bool,
	/** Enables rendering a display: flex span, needed for rendering SVG icons */
	renderIcon: PropTypes.node,
};

export class BaseButton extends PureComponent {
	static propTypes = {
		...SharedButtonPropTypes,
		/** This is only used by BaseButton not AnchorButton or Button */
		baseComponent: PropTypes.func.isRequired,
	};

	static defaultProps = {
		styleOverrides: {},
	};

	render() {
		const { children, theme, baseComponent, ...buttonProps } = this.props;

		const { component: MappedStyledComponent, filteredProps } = applyVariations(
			baseComponent,
			Styled.variationMap,
			buttonProps,
		);

		return (
			<MappedStyledComponent theme={theme} {...filteredProps || {}}>
				{this.props.renderIcon == null ? (
					children
				) : (
					<Styled.ButtonContents>
						{this.props.renderIcon}
						{children != null && <span>{children}</span>}
					</Styled.ButtonContents>
				)}
			</MappedStyledComponent>
		);
	}
}
