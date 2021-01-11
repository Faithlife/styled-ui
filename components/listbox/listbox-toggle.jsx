import React from 'react';
import { Menu } from '../../index-v6';
import { useId } from '../shared-hooks';
import { useListboxContext } from './utils';

// https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox

export function ListboxToggle({ children, ...props }) {
	const uniqueId = useId();
	const id = `listbox-toggle-${uniqueId}`;
	const { labelledBy } = useListboxContext();

	return (
		<Menu.Toggle
			id={id}
			aria-labelledby={`${labelledBy ?? ''} ${id}`}
			aria-haspopup="listbox"
			aria-controls={null}
			{...props}
		>
			{children}
		</Menu.Toggle>
	);
}
