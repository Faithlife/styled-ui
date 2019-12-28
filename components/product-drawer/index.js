import { deprecateComponent } from '../utils';
import { ProductDrawer as ProductDrawerComponent } from './component';

export const ProductDrawer = deprecateComponent(
	ProductDrawerComponent,
	'The ProductDrawer component is leaving Styled-UI and is now available from the @faithlife/product-drawer package.\nPlease see the FaithlifeEquipment repo for more details: https://git.faithlife.dev/Logos/FaithlifeEquipment',
);
