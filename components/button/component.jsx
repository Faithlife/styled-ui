import React from 'react';
import PropTypes from 'prop-types';
import systemPropTypes from '@styled-system/prop-types';
import { theme } from '../../theme';
import { common, typography } from '../../theme/system';
import { DefaultThemeProvider } from '../DefaultThemeProvider';
import { getVariation } from '../utils';
import * as Styled from './styled';

export const Button = React.forwardRef(function Button(props, ref) {
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
		theme: propTheme,
		styleOverrides,
		...buttonProps
	} = props;

	const isCoreTheme = propTheme === theme;

	const themedProps = { ...buttonProps, ...(isCoreTheme ? {} : propTheme) };

	return (
		<DefaultThemeProvider>
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
				textStyle={size === 'large' || large ? 'ui.24' : 'ui.16'}
				boxShadow="none"
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
				{...styleOverrides}
				{...themedProps}
			>
				{icon}
				{children}
			</Styled.Button>
		</DefaultThemeProvider>
	);
});

Button.propTypes = {
	/** The contents of the button (can be text, svg, or other element) */
	children: PropTypes.node,
	/** Condensed button padding. Uses same padding for horizontal and vertical. */
	condensed: PropTypes.bool,
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
	/** Disables the button. */
	disabled: PropTypes.bool,
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
