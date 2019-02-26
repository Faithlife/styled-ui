import React from 'react';
import PropTypes from 'prop-types';
import { thickness } from '../../shared-styles';
import { Popover, popoverThemeProps } from '../../popover';
import { DropdownContext } from './dropdown-context';
import { dropdownItemTheme } from './dropdown-item';

const { isOpen, theme: _theme, ...dropdownMenuProps } = Popover.propTypes;

/**
 * Must be placed inside of a `Dropdown` component
 */
export function DropdownMenu({
	placement,
	modifiers,
	children,
	container,
	hideArrow,
	delay,
	styleOverrides,
	theme,
}) {
	return (
		<DropdownContext.Consumer>
			{({ isDropdownOpen }) => (
				<Popover
					isOpen={isDropdownOpen}
					placement={placement}
					hideArrow={hideArrow !== false}
					modifiers={modifiers}
					container={container}
					delay={delay}
					theme={theme}
					styleOverrides={{ padding: `${thickness.four} 0`, ...styleOverrides }}
				>
					{children}
				</Popover>
			)}
		</DropdownContext.Consumer>
	);
}

DropdownMenu.propTypes = {
	...dropdownMenuProps,
	/** `childrenTheme applies the styles to every `DropdownItem`. This has the same shape as `DropdownItem's` `localTheme` */
	theme: PropTypes.shape({
		...popoverThemeProps,
		childrenTheme: PropTypes.shape(dropdownItemTheme),
	}),
};

DropdownMenu.defaultProps = {
	placement: 'bottom-start',
};
