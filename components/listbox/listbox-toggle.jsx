import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../shared-hooks';
import { useDropdownContext, DropdownToggleCore } from '../menu';
import { useKeyboardActivate } from './listbox-utils';

/** Accepts all props a Button component would as well. */
export function ListboxToggle(props) {
	// DropdownToggle will pass all props that a Button component will want if it is not using render props
	const { children, ...buttonProps } = props;
	const {
		isOpen,
		focusedMenuItem,
		setFocusedMenuItem,
		onToggleMenu,
		labelledBy,
	} = useDropdownContext();
	const handleKeyPress = useKeyboardActivate(onToggleMenu, focusedMenuItem, setFocusedMenuItem);

	const id = useId();

	const toggleAriaProps = {
		id: `listbox:${id}`,
		role: 'button',
		'aria-haspopup': 'listbox',
		'aria-labelledby': `${labelledBy || ''} listbox:${id}`,
		'aria-expanded': isOpen,
	};

	const handleToggleMenu = useCallback(
		event => {
			setFocusedMenuItem(null);
			onToggleMenu(event);
		},
		[setFocusedMenuItem, onToggleMenu],
	);

	return (
		<DropdownToggleCore
			buttonProps={buttonProps}
			onKeyPress={handleKeyPress}
			onToggleMenu={handleToggleMenu}
			ariaProps={toggleAriaProps}
		>
			{children}
		</DropdownToggleCore>
	);
}

ListboxToggle.propTypes = {
	/** The content of the toggle button, usually a span */
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};
