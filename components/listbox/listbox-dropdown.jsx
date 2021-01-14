import React from 'react';
import { Menu } from '../menu';
import { useListboxContext } from './utils';

// https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox

export function ListboxDropdown({ children, ...props }) {
	const { labelledBy } = useListboxContext();

	return (
		<Menu.Dropdown role="listbox" aria-labelledby={labelledBy} {...props}>
			{children}
		</Menu.Dropdown>
	);
}
