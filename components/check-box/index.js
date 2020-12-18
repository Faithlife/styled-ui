/** @todo Remove legacy exports upon v6 release. */
export { Checkbox as LegacyCheckbox } from './legacy-component';
export { CheckboxContent as LegacyCheckboxContent } from './legacy-checkbox-content';

import { Checkbox } from './component';
import { CheckboxContent, CheckboxLabel, CheckboxBox } from './checkbox-content';
Checkbox.Content = CheckboxContent;
Checkbox.Box = CheckboxBox;
Checkbox.Label = CheckboxLabel;
export { Checkbox };
