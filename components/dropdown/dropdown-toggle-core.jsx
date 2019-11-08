import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { LegacyButton as Button } from '../button';
import { PopoverReference } from '../popover';
import { useDropdownContext } from './dropdown-utils';

/** If not using render props will pass all unrecognized props to children. */
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
