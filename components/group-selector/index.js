import { deprecateComponent } from '../utils';
import { GroupSelector as GroupSelectorComponent } from './component';
import { LargeGroupSelector as LargeGroupSelectorComponent } from './large/component';

export const GroupSelector = deprecateComponent(
	GroupSelectorComponent,
	'The GroupSelector component is leaving Styled-UI and is now available from the @faithlife/group-selector package.\nPlease see the FaithlifeEquipment repo for more details: https://git.faithlife.dev/Logos/FaithlifeEquipment',
);

const LargeGroupSelector = deprecateComponent(
	LargeGroupSelectorComponent,
	'The GroupSelector component is leaving Styled-UI and is now available from the @faithlife/group-selector package.\nPlease see the FaithlifeEquipment repo for more details: https://git.faithlife.dev/Logos/FaithlifeEquipment',
);

export {
	LargeGroupSelector,
	LargeGroupSelector as GroupSelectorModal, // Legacy deprecated component name
};
