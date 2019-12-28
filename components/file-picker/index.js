import { deprecateComponent } from '../utils';
import { FilePicker as FilePickerComponent } from './component';
export { AmberContent } from './amber-content';
export { FileUpload } from './file-upload';

export const FilePicker = deprecateComponent(
	FilePickerComponent,
	'The FilePicker component is leaving Styled-UI and is now available from the @faithlife/file-picker package.\nPlease see the FaithlifeEquipment repo for more details: https://git.faithlife.dev/Logos/FaithlifeEquipment',
);
