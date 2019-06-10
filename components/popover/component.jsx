import React from 'react';
import { colors } from '../shared-styles';
import { PopoverBase } from './popover-base';

/** Pre-styled popover that uses unstyled popovers internally. */
export function Popover(props) {
	const { children, placement, theme, styleOverrides, ...otherProps } = props;
	const newStyle = { ...Popover.defaultProps.styleOverrides, ...styleOverrides };
	return (
		<PopoverBase
			{...otherProps}
			placement={placement || 'top'}
			theme={theme || { ...Popover.defaultProps.theme }}
			styleOverrides={newStyle || {}}
		>
			{children}
		</PopoverBase>
	);
}

Popover.propTypes = { ...PopoverBase.propTypes };

Popover.defaultProps = {
	placement: 'top',
	theme: { backgroundColor: colors.white },
	styleOverrides: { borderRadius: '3px', padding: '12px', maxWidth: '300px' },
};
