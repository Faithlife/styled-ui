/** @todo Remove legacy exports upon v6 release. */
import { ParameterSentence as LegacyParameterSentence } from './parameter-sentence';
import { ParameterSelect as LegacyParameterSelect } from './legacy-parameter-select';
import { ParameterInputBox as LegacyParameterInputBox } from './legacy-parameter-input';
// Separating import from export so LegacyParameterSelect doesn't use child component API defined below
export { LegacyParameterSentence, LegacyParameterSelect, LegacyParameterInputBox };

import { ParameterSentence } from './parameter-sentence';
import { ParameterSelect } from './parameter-select';
import { ParameterInputBox } from './parameter-input';

ParameterSentence.Select = ParameterSelect;
ParameterSentence.Input = ParameterInputBox;
export { ParameterSentence };
