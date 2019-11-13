import { Modal } from './modal';
import { ModalHeader } from './modal-header';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';
import { ModalFooterButtons } from './modal-footer-buttons';
export { SimpleModal } from './simple-modal';
export { CloseButton } from './close-button';
// These legacy exports will be removed when v6 is released
export { LegacyModal } from './legacy-modal';
export { LegacyModalContent, LegacyModalFooter } from './legacy-utils';

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;
Modal.FooterButtons = ModalFooterButtons;

export { Modal };
