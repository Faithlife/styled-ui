import React from 'react';
import PropTypes from 'prop-types';
import { DropdownMenuCore, useDropdownContext } from '../menu';

export function ListboxMenu(props) {
	const { children, ...popoverProps } = props;
	const { labelledBy } = useDropdownContext();

	const ariaProps = {
		role: 'listbox',
		...(labelledBy ? { 'aria-labelledby': labelledBy } : {}),
	};

	return (
		<DropdownMenuCore ariaProps={ariaProps} popoverProps={popoverProps}>
			{children}
		</DropdownMenuCore>
	);
}

ListboxMenu.propTypes = {
	children: PropTypes.node.isRequired,
};
