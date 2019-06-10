import React, { Component } from 'react';
import { colors } from '../shared-styles';
import { UnstyledPopover } from './unstyled-popover';

/** Pre-styled popover that uses unstyled popovers internally. */
export class Popover extends Component {
	static propTypes = {
		...UnstyledPopover.propTypes,
	};

	static defaultProps = {
		placement: 'top',
		theme: {
			backgroundColor: colors.white,
		},
		styleOverrides: {
			borderRadius: '3px',
			padding: '12px',
			maxWidth: '300px',
		},
	};

	render() {
		const { children, placement, theme, styleOverrides, ...otherProps } = this.props;
		const { ...otherStyles } = styleOverrides;
		const newStyle = {
			...otherStyles,
			borderRadius: '3px',
			padding: '12px',
			maxWidth: '300px',
		};
		return (
			<UnstyledPopover
				{...otherProps}
				placement={placement}
				theme={theme}
				styleOverrides={newStyle}
			>
				{children}
			</UnstyledPopover>
		);
	}
}
