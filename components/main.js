// This file intentionally does *not* import large dependencies such bootstrap.
// We could use tree-shaking in the future to prune out unused exports,
// but not all projects are able to use that right now.

import * as _TextInput from './text-input';

export { default as Checkbox } from './check-box/component.jsx';
export { default as Button } from './demo-button/component.jsx';
export { Modal } from './modal';
export { ModalFooter } from './modal';

export const TextInput = _TextInput;
