import { deprecateComponent } from '../../utils';

import { Dropdown as DropdownComponent } from './component';
import { DropdownMenu as DropdownMenuComponent } from './dropdown-menu';
import { DropdownToggle as DropdownToggleComponent } from './dropdown-toggle';
import {
	MenuItem as MenuItemComponent,
	MenuSeparator as MenuSeparatorComponent,
	MenuCheckbox as MenuCheckboxComponent,
} from './dropdown-children';

const v6ImportHelpText = `You can opt into this new API by importing { Menu } from @faithlife/styled-ui/v6
Learn more at https://faithlife.github.io/styled-ui/#/dropdown/variations/v6`;

const depWarning = (name, newName) =>
	`${name} will be moving to ${newName} in Styled-UI version 6.\n${v6ImportHelpText}`;

const Dropdown = deprecateComponent(
	DropdownComponent,
	`Prefer the Styled-UI version 6 Menu.\n${v6ImportHelpText}`,
);
const DropdownMenu = deprecateComponent(
	DropdownMenuComponent,
	depWarning('DropdownMenu', 'Menu.Dropdown'),
);
const DropdownToggle = deprecateComponent(
	DropdownToggleComponent,
	depWarning('DropdownToggle', 'Menu.Toggle'),
);
const MenuItem = deprecateComponent(MenuItemComponent, depWarning('MenuItem', 'Menu.Item'));
const MenuSeparator = deprecateComponent(
	MenuSeparatorComponent,
	depWarning('MenuSeparator', 'Menu.Separator'),
);
const MenuCheckbox = deprecateComponent(
	MenuCheckboxComponent,
	depWarning('MenuCheckbox', 'Menu.CheckboxItem'),
);

MenuItem.isFocusableMenuChild = true;
MenuCheckbox.isFocusableMenuChild = true;

export { Dropdown, DropdownMenu, DropdownToggle, MenuItem, MenuSeparator, MenuCheckbox };
export { useDropdownContext } from './dropdown-utils';
export { DropdownCore } from './dropdown-core';
export { DropdownToggleCore } from './dropdown-toggle-core';
export { DropdownMenuCore } from './dropdown-menu-core';
