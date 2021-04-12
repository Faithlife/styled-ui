import { Menu } from './menu';
import { MenuToggle, MenuActionButton } from './menu-toggle';
import { MenuDropdown } from './menu-dropdown';
import {
	MenuItem,
	MenuItemCheckbox,
	MenuItemLink,
	MenuItemSeparator,
	MenuItemIcon,
	MenuItemPrimaryText,
	MenuItemSecondaryText,
	MenuItemTitle,
	MenuItemTextContainer,
} from './menu-children';

Menu.Toggle = MenuToggle;
Menu.Dropdown = MenuDropdown;
Menu.Item = MenuItem;
Menu.CheckboxItem = MenuItemCheckbox;
Menu.LinkItem = MenuItemLink;
Menu.Separator = MenuItemSeparator;
Menu.ActionButton = MenuActionButton;
Menu.ItemIcon = MenuItemIcon;
Menu.ItemPrimaryText = MenuItemPrimaryText;
Menu.ItemSecondaryText = MenuItemSecondaryText;
Menu.Title = MenuItemTitle;
Menu.ItemTextContainer = MenuItemTextContainer;

export { Menu };
