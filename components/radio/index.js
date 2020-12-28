/** @todo Remove legacy export upon v6 release. */
export { Radio as LegacyRadio } from './legacy-component';

import { Radio, RadioIcon } from './component';
import { RadioLabel } from './styled';
Radio.Icon = RadioIcon;
Radio.Label = RadioLabel;
export { Radio };
