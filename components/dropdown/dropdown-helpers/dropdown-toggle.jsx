import React from 'react';
import PropTypes from 'prop-types';
import { PopoverReference } from '../../popover';
import { DropdownContext } from './dropdown-context';

/**
 * Must be placed inside of a `Dropdown` component
 */
export function DropdownToggle({ children }) {
	return (
		<DropdownContext.Consumer>
			{({ handleToggleDropdown }) => (
				<PopoverReference>{children(handleToggleDropdown)}</PopoverReference>
			)}
		</DropdownContext.Consumer>
	);
}

DropdownToggle.propTypes = {
	children: PropTypes.func.isRequired,
};
