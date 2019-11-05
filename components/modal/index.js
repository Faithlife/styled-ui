import { deprecate } from '../utils';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';
import { LegacyModal } from './legacy-modal';

const v6ImportHelpText = `You can opt into this new API by importing { modal } from @faithlife/styled-ui/v6
Learn more at https://faithlife.github.io/styled-ui/#/modal/v6`;

const LegacyModalContent = deprecate(
	ModalContent,
	`ModalContent will be moving to Modal.Content in Styled-UI version 6.\n${v6ImportHelpText}`,
);

const LegacyModalFooter = deprecate(
	ModalFooter,
	`ModalFooter will be moving to Modal.Footer in Styled-UI version 6.\n${v6ImportHelpText}`,
);

export {
	// These legacy exports will be removed when v6 is released
	LegacyModal,
	LegacyModalContent,
	LegacyModalFooter,
};
