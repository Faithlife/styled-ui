import React from 'react';
import PropTypes from 'prop-types';
import { DropdownMenuCore } from './dropdown-menu-core';

const ariaProps = {
	role: 'menu',
};

export function DropdownMenu(props) {
	const { children, ...popoverProps } = props;

	return (
		<DropdownMenuCore ariaProps={ariaProps} popoverProps={popoverProps}>
			{children}
		</DropdownMenuCore>
	);
}

DropdownMenu.propTypes = {
	children: PropTypes.node.isRequired,
};
