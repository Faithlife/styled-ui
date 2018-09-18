import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { applyVariations } from '../utils';
import { forwardClassRef } from '../utils/forwardref-wrapper.jsx';
import * as Styled from './styled.jsx';

export const BaseButton = forwardClassRef(
	class BaseButton extends PureComponent {
		static propTypes = {
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
			icon: PropTypes.node,
		};

		static defaultProps = {
			styleOverrides: {},
		};

		render() {
			const { children, theme, styleOverrides, ...otherProps } = this.props;

			// ignore implementation detail props that we do not want documented by docgen
			/* eslint-disable react/prop-types */
			const { forwardedRef, baseComponent, ...buttonProps } = otherProps;
			/* eslint-enable react/prop-types */

			const { component: MappedStyledComponent, filteredProps } = applyVariations(
				baseComponent, // this is required but we don't want it in the generated docs so don't include it above
				Styled.variationMap,
				buttonProps,
			);

			const { justifyContent, ...componentStyleOverrides } = styleOverrides;

			return (
				<MappedStyledComponent
					theme={theme}
					innerRef={forwardedRef}
					{...filteredProps || {}}
					styleOverrides={componentStyleOverrides}
				>
					<Styled.ButtonContents justifyContent={justifyContent}>
						{this.props.icon}
						{children}
					</Styled.ButtonContents>
				</MappedStyledComponent>
			);
		}
	},
);
