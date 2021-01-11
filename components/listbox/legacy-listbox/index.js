import { deprecateComponent } from '../../utils';

import { Listbox as ListboxComponent } from './component';
import { ListboxToggle as ListboxToggleComponent } from './listbox-toggle';
import { ListboxMenu as ListboxMenuComponent } from './listbox-menu';
import { ListItem as ListItemComponent } from './list-item';

const v6ImportHelpText = `You can opt into this new API by importing { Listbox } from @faithlife/styled-ui/v6
Learn more at https://faithlife.github.io/styled-ui/#/Listbox/variations-v6`;

const depWarning = (name, newName) =>
	`${name} will be moving to ${newName} in Styled-UI version 6.\n${v6ImportHelpText}`;

const Listbox = deprecateComponent(
	ListboxComponent,
	`Prefer the Styled-UI version 6 Listbox.\n${v6ImportHelpText}`,
);
const ListboxToggle = deprecateComponent(
	ListboxToggleComponent,
	depWarning('ListboxToggle', 'Listbox.Toggle'),
);
const ListboxMenu = deprecateComponent(
	ListboxMenuComponent,
	depWarning('ListboxMenu', 'Listbox.Dropdown'),
);
const ListItem = deprecateComponent(ListItemComponent, depWarning('ListItem', 'Listbox.Option'));

ListItem.isFocusableMenuChild = true;

export { Listbox, ListboxToggle, ListboxMenu, ListItem };
