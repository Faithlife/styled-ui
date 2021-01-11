import { Menu } from '../menu';

export { Listbox as LegacyListbox, ListboxToggle, ListboxMenu, ListItem } from './legacy-listbox';

import { Listbox } from './listbox';
import { ListboxToggle } from './listbox-toggle';
import { ListboxDropdown } from './listbox-dropdown';
import { ListboxItem } from './listbox-children';

Listbox.Toggle = ListboxToggle;
Listbox.Dropdown = ListboxDropdown;
Listbox.Option = ListboxItem;
Listbox.Separator = Menu.Separator;
Listbox.ActionButton = Menu.ActionButton;
Listbox.ItemIcon = Menu.ItemIcon;
Listbox.ItemPrimaryText = Menu.ItemPrimaryText;
Listbox.ItemSecondaryText = Menu.ItemSecondaryText;
Listbox.Title = Menu.Title;

export { Listbox };
