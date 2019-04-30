import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import { PopoverReference } from '../popover';
import { useDropdownContext, useKeyboardActivate } from './dropdown-utils';

/** Accepts all props a Button component would as well. */
export function DropdownToggle(props) {
	// DropdownToggle will pass all props that a Button component will want if it is not using render props
	const { children, ...buttonProps } = props;
	const {
		isOpen,
		menuId,
		setFocusedMenuItem,
		dropdownToggleRef,
		onToggleMenu,
	} = useDropdownContext();
	const handleKeyPress = useKeyboardActivate(onToggleMenu, setFocusedMenuItem);

	const toggleAriaProps = {
		role: 'button',
		'aria-haspopup': true,
		'aria-controls': `dropdown:${menuId}`,
		'aria-label': `dropdown:${menuId}`,
		// do not specify aria-expanded unless it is expanded
		...(isOpen ? { 'aria-expanded': true } : {}),
	};

	const handleToggleMenu = useCallback(
		event => {
			setFocusedMenuItem(-1);
			onToggleMenu(event);
		},
		[setFocusedMenuItem, onToggleMenu],
	);

	const childProps = useMemo(
		() => ({
			ref: dropdownToggleRef,
			onKeyDown: handleKeyPress,
			onClick: handleToggleMenu,
			ariaProps: toggleAriaProps,
		}),
		[dropdownToggleRef, handleKeyPress, handleToggleMenu, toggleAriaProps],
	);

	return (
		<PopoverReference>
			{typeof children === 'function' ? (
				children(childProps)
			) : (
				<Button
					ref={dropdownToggleRef}
					onKeyDown={handleKeyPress}
					onClick={handleToggleMenu}
					{...toggleAriaProps}
					{...buttonProps}
				>
					{children}
				</Button>
			)}
		</PopoverReference>
	);
}

DropdownToggle.propTypes = {
	/** The content of the toggle button, usually a span */
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};
