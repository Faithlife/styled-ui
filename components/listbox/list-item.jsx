import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropdownContext, MenuItem } from '../dropdown';

export function ListItem(props) {
	// Proptypes is linting so index does not show up in consumer proptypes
	// eslint-disable-next-line react/prop-types
	const { id, disabled, children, isSelected, onFocusedMenuItemChange } = props;

	const { onItemSelect } = useDropdownContext();

	const handleItemSelect = useCallback(() => {
		onFocusedMenuItemChange();

		if (!disabled) {
			onItemSelect(id);
		}
	}, [onFocusedMenuItemChange, disabled, onItemSelect, id]);

	return (
		<MenuItem
			onClick={handleItemSelect}
			onFocus={handleItemSelect}
			disabled={disabled}
			isSelected={isSelected}
			role="option"
			aria-selected={isSelected}
		>
			{children}
		</MenuItem>
	);
}

ListItem.propTypes = {
	/** Passed to the onItemSelect function */
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

ListItem.isFocusableMenuChild = true;
