import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import { PopoverReference } from '../popover';
import { useDropdownContext } from './dropdown-utils';

/** Accepts all props a Button component would as well. */
export function DropdownToggleCore({ children, buttonProps, onKeyPress, onToggleMenu, ariaProps }) {
	const { dropdownToggleRef } = useDropdownContext();

	const childProps = useMemo(
		() => ({
			ref: dropdownToggleRef,
			onKeyDown: onKeyPress,
			onClick: onToggleMenu,
			ariaProps,
		}),
		[dropdownToggleRef, onKeyPress, onToggleMenu, ariaProps],
	);

	return (
		<PopoverReference>
			{typeof children === 'function' ? (
				children(childProps)
			) : (
				<Button
					ref={dropdownToggleRef}
					onKeyDown={onKeyPress}
					onClick={onToggleMenu}
					{...ariaProps}
					{...buttonProps}
				>
					{children}
				</Button>
			)}
		</PopoverReference>
	);
}

DropdownToggleCore.propTypes = {
	/** The content of the toggle button, usually a span */
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
	buttonProps: PropTypes.object,
	onKeyPress: PropTypes.func.isRequired,
	onToggleMenu: PropTypes.func.isRequired,
	ariaProps: PropTypes.object.isRequired,
};
