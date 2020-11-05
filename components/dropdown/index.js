export {
	Dropdown as LegacyDropdown,
	MenuItem,
	MenuSeparator,
	MenuCheckbox,
	DropdownMenu,
	DropdownToggle,
	useDropdownContext,
	DropdownCore,
	DropdownToggleCore,
	DropdownMenuCore,
} from './legacy-dropdown';

import { Dropdown } from './dropdown';
import { DropdownToggle, DropdownActionButton } from './dropdown-toggle';
import { DropdownMenu } from './dropdown-menu';
import {
	MenuItem,
	MenuItemCheckbox,
	MenuItemLink,
	MenuItemSeparator,
	MenuItemIcon,
	MenuItemPrimaryText,
	MenuItemSecondaryText,
	MenuItemTitle,
} from './dropdown-children';

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = MenuItem;
Dropdown.CheckboxItem = MenuItemCheckbox;
Dropdown.LinkItem = MenuItemLink;
Dropdown.Separator = MenuItemSeparator;
Dropdown.ActionButton = DropdownActionButton;
Dropdown.ItemIcon = MenuItemIcon;
Dropdown.ItemPrimaryText = MenuItemPrimaryText;
Dropdown.ItemSecondaryText = MenuItemSecondaryText;
Dropdown.Title = MenuItemTitle;

export { Dropdown };
