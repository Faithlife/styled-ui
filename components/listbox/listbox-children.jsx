import React from 'react';
import { Menu } from '../menu';
import { useListboxContext } from './utils';

// https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox

export const ListboxItem = React.forwardRef(function ListboxItem(
	{ children, id, keyboardFocused, ...props },
	ref,
) {
	const { selectedId, onItemSelect } = useListboxContext();

	const isSelected = selectedId === id;
	return (
		<Menu.Item
			ref={ref}
			id={id}
			role="option"
			aria-selected={isSelected}
			onClick={() => {
				onItemSelect(id);
			}}
			keyboardFocused={keyboardFocused}
			{...(isSelected && !keyboardFocused
				? { backgroundColor: 'dropdown.backgroundSelected' }
				: {})}
			{...props}
		>
			{children}
		</Menu.Item>
	);
});

ListboxItem.isFocusableChild = true;
