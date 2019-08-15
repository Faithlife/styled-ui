import React from 'react';
import PropTypes from 'prop-types';
import { DropdownCore } from './dropdown-core';

export function Dropdown({ isOpen, onToggleMenu, children }) {
	return (
		<DropdownCore isOpen={isOpen} onToggleMenu={onToggleMenu}>
			{children}
		</DropdownCore>
	);
}

Dropdown.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onToggleMenu: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};
