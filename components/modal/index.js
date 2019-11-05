import { deprecate } from '../utils';
import { Modal } from './modal';
import { ModalHeader } from './modal-header';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';
import { ModalFooterButtons } from './modal-footer-buttons';
import { LegacyModal } from './legacy-modal';

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;
Modal.FooterButtons = ModalFooterButtons;

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
	// This is the new v6 modal
	Modal,
	// These legacy exports will be removed when v6 is released
	LegacyModal,
	LegacyModalContent,
	LegacyModalFooter,
};
