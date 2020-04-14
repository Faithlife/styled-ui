import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxContent } from '../../check-box';
import { useDropdownContext } from '../dropdown-utils';
import * as Styled from '../styled';
import { MenuItem } from './menu-item';

export const MenuSeparator = Styled.MenuSeparator;
MenuSeparator.propTypes = {};

export function MenuCheckbox(props) {
	// Proptypes is linting so index does not show up in consumer proptypes
	// eslint-disable-next-line react/prop-types
	const { onClick, disabled, index, isChecked, ...checkboxProps } = props;

	const { theme } = useDropdownContext();

	return (
		<MenuItem
			shouldKeepOpenOnClick
			onClick={onClick}
			disabled={disabled}
			index={index}
			role="menuitemcheckbox"
			aria-checked={isChecked}
		>
			<CheckboxContent
				theme={{ primary: theme.checkboxPrimary, border: theme.checkboxBorder }}
				isChecked={isChecked}
				{...checkboxProps}
			/>
		</MenuItem>
	);
}

MenuCheckbox.propTypes = {
	isChecked: PropTypes.bool.isRequired,
};

MenuCheckbox.isFocusableMenuChild = true;
